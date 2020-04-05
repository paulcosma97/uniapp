import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {User, UserRole} from "../models/user.model";
import {JwtPayloadDto} from "../dto/jwt-payload.dto";
import {jwtConfiguration} from "../configs/jwt.config";
import {NextFunction, Request, Response} from "express";
import {getRepository} from "typeorm";
import {RequestHandlerParams} from "express-serve-static-core";

export async function encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => err ? reject(err) : resolve(hash)));
}

export async function passwordsMatch(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
        bcrypt.compare(password, hash, (err, result) => err ? reject(false) : resolve(result)))
}


export async function jwtSign(user: User): Promise<string> {
    if (!user.id) {
        throw new Error('User ID is undefined.');
    }

    const payload: JwtPayloadDto = {
        id: user.id,
        role: user.role
    };

    return new Promise((resolve, reject) =>jwt.sign({
            data: payload,
            exp: Math.floor(Date.now() / 1000) + jwtConfiguration.expireTime
        }, jwtConfiguration.secretKey, ((err: Error, encoded: string) =>
            err ? reject(err) : resolve(encoded))))
}

export async function jwtVerify(token: string): Promise<JwtPayloadDto> {
    return new Promise((resolve, reject) =>
        jwt.verify(token, jwtConfiguration.secretKey, (err, decoded) =>
            err ? reject(err) : resolve((decoded as { data: JwtPayloadDto }).data)
        ));
}

export async function setUserCookie(user: User, response: Response) {
    response.cookie(jwtConfiguration.cookieName, await jwtSign(user), {
        maxAge: jwtConfiguration.expireTime * 1000, // to ms
        httpOnly: true
    });
}

export function clearUserCookie(response: Response): void {
    console.info('Clearing user cookie.');
    response.clearCookie(jwtConfiguration.cookieName);
}

export function sendUnauthorized(res: Response): void {
    res.status(401);
    res.json({
        code: 'Unauthorized'
    });
}

export function sendForbidden(res: Response): void {
    res.status(403);
    res.json({
        code: 'Forbidden'
    });
}

export type AllowedRoles = { studentsOnly: true } | { teachersOnly: true } | { guestsOnly: true } | { usersOnly: true }
export function restrict(allowedRoles: AllowedRoles): RequestHandlerParams {
    return async (req: Request, res: Response, next: NextFunction) => {
        if ('guestsOnly' in allowedRoles) {
            if (req.cookies && req.cookies[jwtConfiguration.cookieName]) {
                sendForbidden(res);
            } else {
                next();
            }

            return;
        }

        const cookie: string = req?.cookies[jwtConfiguration.cookieName];

        if (!cookie) {
            sendUnauthorized(res);
            return;
        }

        let payload: JwtPayloadDto;
        try {
            payload = (await jwtVerify(cookie));
        } catch {
            clearUserCookie(res);
            sendUnauthorized(res);
            return;
        }


        if (('teachersOnly' in allowedRoles && payload.role !== UserRole.TEACHER)
            || ('studentsOnly' in allowedRoles && payload.role !== UserRole.STUDENT)) {
            sendForbidden(res);
            return;
        }

        try {
            res.locals.user = await getRepository(User).findOneOrFail({
                id: payload.id
            });
        } catch {
            console.error(`Could not find user ${payload.id}.`);
            clearUserCookie(res);
            sendForbidden(res);
            return;
        }

        next();
    }
}

