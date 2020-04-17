import {ChildEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {Course} from "./course.model";
import {CourseAttendance} from "./course-attendance.model";

export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher'
}

@Entity()
@TableInheritance({ column: { type: 'enum', enum: UserRole, name: 'role' } })
export abstract class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true, nullable: false })
    email!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ nullable: false })
    firstName!: string;

    @Column({ nullable: false })
    lastName!: string;

    @Column({ enum: UserRole, type: 'enum', nullable: false })
    role!: UserRole;
}

@ChildEntity(UserRole.STUDENT)
export class Student extends User {
    @ManyToMany(() => Course, subject => subject.students)
    enrolled?: Course[];

    @ManyToMany(() => CourseAttendance, attendance => attendance.students)
    attendances?: CourseAttendance[];
}


@ChildEntity(UserRole.TEACHER)
export class Teacher extends User {
    @ManyToMany(() => Course, subject => subject.teachers)
    teaches?: Course[];
}


