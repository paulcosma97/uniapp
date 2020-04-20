import {Request, Response, Router} from "express";
import {restrict, sendForbidden} from "../services/auth.service";
import {Student, Teacher, User} from "../models/user.model";
import {canReadCourse, isStudent} from "../services/user.service";
import {getRepository} from "typeorm";
import {sendBadRequest, sendNotFound} from "../services/utils.service";
import {Course} from "../models/course.model";
import {CourseAttendance} from "../models/course-attendance.model";

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

courseRouter.put('/students', restrict({ studentsOnly: true }), async (req: Request, res: Response) => {
    const code: string = req.body.code;
    const student: User = res.locals.user;

    if (!code || typeof code !== 'string' || code.length < 4) {
        return sendBadRequest(res, 'Course code is not valid.');
    }

    const course = await getRepository(Course).findOne({ code }, { relations: ['students'] });
    if (!course) {
        return sendNotFound(res, 'Could not find a course.');
    }

    if (course.students!.find(other => other.id === student.id)) {
        return sendBadRequest(res, 'Student already joined this course.');
    }

    course.students!.push(res.locals.user);
    await getRepository(Course).save(course);

    res.json(course);
});

courseRouter.post('/', restrict({ teachersOnly: true }), async (req: Request, res: Response) => {
    const title: string = req.body.title;
    const teacher: User = res.locals.user;

    const generateCode = (): string => [ ...new Array(Math.floor(Math.random() * 3 + 8)) ].map(() => String.fromCharCode(Math.floor(Math.random() * 20) + 65)).join('');

    if (!title || typeof title !== 'string' || title.length < 4) {
        return sendBadRequest(res, 'Course code is not valid.');
    }

    const course: Course = {
        title,
        teachers: [teacher],
        code: generateCode()
    };

    await getRepository(Course).save(course);
    res.status(201);
    res.json(course);
});

courseRouter.delete('/:id', restrict({ teachersOnly: true }), async (req: Request, res: Response) => {
    const teacher: User = res.locals.user;
    const courseId = +req.params.id;

    const course = await getRepository(Course).findOne(courseId, { relations: ['teachers', 'attendances'] });
    if (!course) {
        return sendNotFound(res, 'Could not find a course.');
    }

    if (!course.teachers.find(other => other.id === teacher.id)) {
        return sendForbidden(res);
    }

    await getRepository(CourseAttendance).remove(course.attendances || []);

    await getRepository(Course).remove(course);
    res.status(200);
    res.send();
});

courseRouter.delete('/:id/students/:student', restrict({ usersOnly: true }), async (req: Request, res: Response) => {
    const courseId = +req.params.id;
    const studentId = +req.params.student;
    const user: User = res.locals.user;

    const course = await getRepository(Course).findOne(courseId, { relations: ['students', 'teachers'] });

    if (!course) {
        return sendNotFound(res, 'Could not find a course.');
    }

    if (isStudent(user) && user.id !== studentId) {
        return sendForbidden(res);
    }

    if (!isStudent(user) && !course.teachers!.find(teacher => teacher.id === user.id)) {
        return sendForbidden(res);
    }

    if (!course.students!.find(student => student.id === studentId)) {
        return sendBadRequest(res, 'User is not enrolled in this course.');
    }

    course.students = course.students!.filter(student => student.id !== studentId);
    await getRepository(Course).save(course);
    res.status(200);
    res.send();
});

