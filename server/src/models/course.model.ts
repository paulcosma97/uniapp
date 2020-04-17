import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Student, Teacher} from "./user.model";
import {CourseAttendance} from "./course-attendance.model";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false })
    title!: string;

    @JoinTable()
    @ManyToMany(() => Student, student => student.enrolled)
    students?: Student[];

    @JoinTable()
    @ManyToMany(() => Teacher, teacher => teacher.teaches)
    teachers!: Teacher[];

    @OneToMany(() => CourseAttendance, attendance => attendance.course, { cascade: ['remove'] })
    attendances?: CourseAttendance[];

    @Column({ nullable: false, unique: true })
    code!: string;
}