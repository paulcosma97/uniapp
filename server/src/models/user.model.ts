import {ChildEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {Subject} from "./subject.model";
import {SubjectAttendance} from "./subject-attendance.model";
import {SubjectGrade} from "./subject-grade.model";

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

    @Column({ nullable: false })
    isAdmin!: boolean;
}

@ChildEntity(UserRole.STUDENT)
export class Student extends User {
    @ManyToMany(() => Subject, subject => subject.students)
    enrolled?: Subject[];

    @OneToMany(() => SubjectAttendance, attendance => attendance.student)
    attendance?: SubjectAttendance[];

    @OneToMany(() => SubjectGrade, grade => grade.student)
    grades?: SubjectGrade[];
}


@ChildEntity(UserRole.TEACHER)
export class Teacher extends User {
    @ManyToMany(() => Subject, subject => subject.teachers)
    teaches?: Subject[];
}


