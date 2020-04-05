import {ConnectionOptions} from "typeorm";
import {Subject} from "../models/subject.model";
import {SubjectAttendance} from "../models/subject-attendance.model";
import {SubjectGrade} from "../models/subject-grade.model";
import {SubjectSupport} from "../models/subject-support.model";
import {Student, Teacher, User} from "../models/user.model";

export const databaseConfig: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'user',
    database: 'uniapp',
    entities: [
        Subject,
        SubjectAttendance,
        SubjectGrade,
        SubjectSupport,
        Teacher,
        Student,
        User
    ],
    synchronize: true,
    logging: false
};

