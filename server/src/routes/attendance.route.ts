import {Request, Response, Router} from "express";
import {restrict, sendForbidden} from "../services/auth.service";
import {getRepository} from "typeorm";
import {CourseAttendance} from "../models/course-attendance.model";
import {sendBadRequest, sendInternalServerError, sendNotFound} from "../services/utils.service";
import * as macStorage from "../services/unique-user-address-storage.service";
import {Student, User} from "../models/user.model";
import {promises, createWriteStream} from 'fs';
import * as archiver from 'archiver';
import {join} from 'path';

export const attendanceRouter = Router();

attendanceRouter.post('/:id/toggle', restrict({ teachersOnly: true }), async (req: Request, res: Response) => {
    const teacher: User = res.locals.user;
    const attendance = await getRepository(CourseAttendance).findOne(+req.params.id, { relations: ['course', 'course.teachers'] });

    if (!attendance) {
        return sendNotFound(res);
    }

    if (!attendance.course.teachers.find(other => other.id === teacher.id)) {
        return sendForbidden(res);
    }

    attendance.open = !attendance.open;
    attendance.available = !attendance.open;

    if (!attendance.open) {
        delete attendance.url;
    }

    await getRepository(CourseAttendance).save(attendance);
    res.json(attendance);
});

attendanceRouter.put('/:id/set-url', restrict({ teachersOnly: true }), async (req: Request, res: Response) => {
    const teacher: User = res.locals.user;
    const url = req.body.url;
    const attendance = await getRepository(CourseAttendance).findOne(+req.params.id, { relations: ['course', 'course.teachers'] });

    if (!attendance) {
        return sendNotFound(res);
    }

    if (!attendance.course.teachers.find(other => other.id === teacher.id)) {
        return sendForbidden(res);
    }

    attendance.url = url;

    await getRepository(CourseAttendance).save(attendance);
    res.json(attendance);
});

attendanceRouter.post('/:id/download-local-server', restrict({ teachersOnly: true }), async (req: Request, res: Response) => {
    const teacher: User = res.locals.user;
    const url = req.body.url;
    const attendance = await getRepository(CourseAttendance).findOne(+req.params.id, { relations: ['course', 'course.teachers'] });

    if (!attendance) {
        return sendNotFound(res);
    }

    if (!attendance.course.teachers.find(other => other.id === teacher.id)) {
        return sendForbidden(res);
    }

    await promises.writeFile(join(__dirname, '../../../attendance-server/configuration.json'), JSON.stringify({
        attendanceId: attendance.id,
        url,
        token: req.cookies['uniapp_user']
    }));

    const zipName = `attendance-server-${teacher.id}-${attendance.id}-${Date.now()}.zip`;
    const zipPath = join(__dirname, '../../binaries', zipName);
    const output = createWriteStream(zipPath);
    const archive = archiver('zip', {
       zlib: {
           level: 1,
       }
    });

    archive.pipe(output);

    output.on('error', () => sendInternalServerError(res));
    output.on('close', () => {
        res.sendFile(zipPath);
        setTimeout(() => {
            promises.unlink(zipPath);
        }, 10 * 1000);
    });
    archive.directory(join(__dirname, '../../../attendance-server'), `${attendance.course.title} - ${attendance.title}`);
    await archive.finalize();
});

attendanceRouter.post('/:id/attend', restrict({ teachersOnly: true }), async (req: Request, res: Response) => {
    const attendance = await getRepository(CourseAttendance).findOne(+req.params.id, { relations: ['students', 'course', 'course.teachers', 'course.students'] });

    const teacher: User = res.locals.user;
    const mac = req.body.mac;
    const userId = +req.body.userId;

    if (!attendance) {
        return sendNotFound(res);
    }

    if (!attendance.course.teachers.find(other => other.id === teacher.id)) {
        return sendForbidden(res);
    }

    if (await macStorage.macAddressAlreadyUsed(mac)) {
        return sendBadRequest(res, 'MAC address already used.');
    }

    const student = await getRepository(Student).findOne(userId, { relations: ['attendances'] });
    if (!student) {
        return sendNotFound(res);
    }

    if (!attendance.course.students!.find(other => other.id === student.id)) {
        return sendBadRequest(res, 'Student is not enrolled in this course.');
    }

    if (!attendance.open) {
        return sendBadRequest(res, 'Attendance is not open.');
    }

    if (student.attendances!.find(other => other.id === attendance.id)) {
        return sendBadRequest(res, 'Student already attended this course.');
    }

    student.attendances!.push(attendance);
    await getRepository(Student).save(student);
    await macStorage.setUserMACAddress(student.id!, attendance, mac);

    res.send();
});