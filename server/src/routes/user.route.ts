import {Request, Response, Router} from "express";
import {clearUserCookie, encryptPassword, passwordsMatch, restrict, setUserCookie} from "../services/auth.service";
import {CredentialsDto} from "../dto/credentials.dto";
import {sendBadRequest} from "../services/utils.service";
import {Student, Teacher, User, UserRole} from "../models/user.model";
import {getRepository} from "typeorm";
import UserInputDto from "../dto/user-input.dto";
import {validateUserInput} from "../services/user.service";
import {handleError} from "../errors/generic-error";

export const userRouter = Router();

userRouter.post('/login', restrict({ guestsOnly: true }),  async (req: Request, res: Response) => {
    const credentials: CredentialsDto = req.body;

    if (!credentials.email || !credentials.password) {
        return sendBadRequest(res, 'Email or password missing.');
    }

    let user: User;
    try {
        user = await getRepository(User).findOneOrFail({ email: credentials.email });
    } catch {
        return sendBadRequest(res, 'Could not find a user using given credentials.');
    }

    if (!(await passwordsMatch(credentials.password, user.password))) {
        return sendBadRequest(res, 'Could not find a user using given credentials.');
    }

    await setUserCookie(user, res);
    res.json({
        ...user,
        password: undefined
    });
});

userRouter.get('/profile', restrict({ usersOnly: true }), async (req: Request, res: Response) => {
   res.json({
       ...res.locals.user,
       password: undefined
   });
});

userRouter.post('/logout', restrict({ usersOnly: true }), async (req: Request, res: Response) => {
    clearUserCookie(res);
    res.sendStatus(200);
});

userRouter.post('/', restrict({ guestsOnly: true }), async (req: Request, res: Response) => {
    const body: UserInputDto = req.body;

    try {
        await validateUserInput(body);
    } catch (e) {
        return handleError(e, res);
    }

    const user: User = {
        email: body.email,
        lastName: body.lastName,
        firstName: body.firstName,
        role: body.role === UserRole.TEACHER ? UserRole.TEACHER : UserRole.STUDENT,
        password: await encryptPassword(body.password)
    };

    const clazz = body.role === UserRole.STUDENT ? Student : Teacher;

    await getRepository(clazz).save(user);
    res.sendStatus(201);
});