import {Request, Response, Router} from "express";
import {restrict, sendForbidden} from "../services/auth.service";
import {Student, Teacher, User} from "../models/user.model";
import {canReadCourse, isStudent} from "../services/user.service";
import {getRepository} from "typeorm";
import {sendBadRequest, sendNotFound} from "../services/utils.service";
import {Course} from "../models/course.model";

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

courseRouter.get('/:id', restrict({ usersOnly: true }), async (req: Request, res: Response) => {
    const courseId: number = +req.params.id;
    const user: User = res.locals.user;

    if (isNaN(courseId)) {
        return sendBadRequest(res, 'Course ID must be a string.');
    }

    const course = await getRepository(Course).findOne(courseId, { relations: ['students', 'teachers', 'attendances'] });

    if (!course) {
        return sendNotFound(res, 'Could not find a course for the given ID.')
    }

    if (!(await canReadCourse(user, courseId))) {
        return sendForbidden(res);
    }

    [...course!.students, ...course.teachers].forEach(user => {
        delete user.password;
    });

    if (isStudent(user)) {
        const student = await getRepository(Student).findOneOrFail(user.id, { relations: ['attendances'] });
        course.attendances = course!.attendances!.map(attendance => ({
            ...attendance,
            didAttend: !!student!.attendances!.find(attended => attended.id === attendance.id)
        }));
    }

    res.json(course);
});