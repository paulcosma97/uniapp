import {ConnectionOptions} from "typeorm";
import {Course} from "../models/course.model";
import {CourseAttendance} from "../models/course-attendance.model";
import {Student, Teacher, User} from "../models/user.model";

export const databaseConfig: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3309,
    username: 'user',
    password: 'user',
    database: 'uniapp',
    entities: [
        Course,
        CourseAttendance,
        Teacher,
        Student,
        User
    ],
    logging: true,
    synchronize: true,
    extra: {
        charset: 'utf8'
    }
};

