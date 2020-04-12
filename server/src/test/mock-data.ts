import {Student, Teacher, UserRole} from "../models/user.model";
import {getConnection, getRepository} from "typeorm";
import {Course} from "../models/course.model";
import {CourseAttendance} from "../models/course-attendance.model";
import {encryptPassword} from "../services/auth.service";

const students: Student[] = [{
    firstName: "Paul",
    lastName: "Cosma",
    email: "paul.cosma@email.com",
    role: UserRole.STUDENT,
    password: 'password',
}, {
    firstName: "Ramona",
    lastName: "Ott",
    email: "ramona.ott@email.com",
    role: UserRole.STUDENT,
    password: 'password',
}];

const teachers: Teacher[] = [
    {
        firstName: "James",
        lastName: "Everson",
        email: "jammerson@outlook.com",
        role: UserRole.TEACHER,
        password: 'password',
    },
    {
        firstName: "Poe",
        lastName: "Edgar",
        email: "edgar.poe@gmail.com",
        role: UserRole.TEACHER,
        password: 'password',
    }
];

const courses: Course[] = [
    {
        title: 'Istoria Artei',
        teachers: [],
        code: 'aaAAbbBBccCC'
    },
    {
        title: 'Algoritmica si Structuri de Date',
        teachers: [],
        code: 'qqWWeeRRttYY'
    }
];

export async function seed() {
    await Promise.all(
        [...students, ...teachers].map(async user => {
            user.password = await encryptPassword(user.password);
        })
    );

    const savedStudents = await getRepository(Student).save(students);
    const savedTeachers = await getRepository(Teacher).save(teachers);

    courses[0].teachers = [ savedTeachers[0] ];
    courses[1].teachers = [ ...savedTeachers ];

    courses[0].students = [ ...savedStudents ];
    courses[1].students = [ ...savedStudents ];

    const savedCourses = await getRepository(Course).save(courses);

    const attendances: CourseAttendance[] = [
        { course: savedCourses[0], open: false, student: savedStudents[0] },
        { course: savedCourses[0], open: false, student: savedStudents[0] },
        { course: savedCourses[0], open: false, student: savedStudents[1] },
        { course: savedCourses[1], open: false, student: savedStudents[1] },
        { course: savedCourses[1], open: false, student: savedStudents[0] },
    ];

    await getRepository(CourseAttendance).save(attendances);
}