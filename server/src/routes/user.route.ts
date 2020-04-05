import {Request, Response, Router} from "express";
import {clearUserCookie, encryptPassword, passwordsMatch, restrict, setUserCookie} from "../services/auth.service";
import {CredentialsDto} from "../dto/credentials.dto";
import {sendBadRequest} from "../services/utils.service";
import {Student, Teacher, User, UserRole} from "../models/user.model";
import {getRepository} from "typeorm";

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
    const body: {
        firstName?: string;
        lastName?: string;
        email?: string;
        role?: UserRole;
        password?: string;
    } = req.body;

    if (!body.email || !body.lastName || !body.firstName || !body.role || !body.password) {
        return sendBadRequest(res, 'Not all fields are filled.');
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email)) {
        return sendBadRequest(res, 'Invalid email format.')
    }

    if (body.firstName.length < 2) {
        return sendBadRequest(res, 'First name is too short.')
    }

    if (body.lastName.length < 2) {
        return sendBadRequest(res, 'Last name is too short.')
    }

    if (body.password.length < 6) {
        return sendBadRequest(res, 'Password is too short.')
    }

    if (!Object.values(UserRole).includes(body.role)) {
        return sendBadRequest(res, 'Invalid role.');
    }

    if (await getRepository(User).findOne({ email: body.email })) {
        return sendBadRequest(res, 'Email already in use.');
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