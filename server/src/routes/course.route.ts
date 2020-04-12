import {Request, Response, Router} from "express";
import {restrict} from "../services/auth.service";
import {Student, Teacher} from "../models/user.model";
import {isStudent} from "../services/user.service";
import {getRepository} from "typeorm";

export const courseRouter = Router();

courseRouter.get('/', restrict({ usersOnly: true }), async (req: Request, res: Response) => {
    const user: Student | Teacher = res.locals.user;


    if (isStudent(user)) {
        res.json(
            await getRepository(Student)
                .find({ relations: ['enrolled'], where: { id: user.id } })
                .then(results => results.map(student => student.enrolled))
                .then(results => results.flat())
        )
    } else {
        res.json(
            await getRepository(Teacher)
                .find({ relations: ['teaches'], where: { id: user.id } })
                .then(results => results.map(teacher => teacher.teaches))
                .then(results => results.flat())
        )
    }
});