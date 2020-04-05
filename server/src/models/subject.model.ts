import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Student, Teacher} from "./user.model";
import {SubjectSupport} from "./subject-support.model";
import {SubjectAttendance} from "./subject-attendance.model";
import {SubjectGrade} from "./subject-grade.model";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false })
    title!: string;

    @JoinTable()
    @ManyToMany(() => Student, student => student.enrolled)
    students?: Student[];

    @JoinTable()
    @ManyToMany(() => Teacher, teacher => teacher.teaches)
    teachers?: Teacher[];

    @OneToMany(() => SubjectSupport, support => support.subject)
    supportMaterials?: SubjectSupport[];

    @OneToMany(() => SubjectAttendance, attendance => attendance.subject)
    attendance?: SubjectAttendance[];

    @OneToMany(() => SubjectGrade, grade => grade.subject)
    grades?: SubjectGrade[];
}