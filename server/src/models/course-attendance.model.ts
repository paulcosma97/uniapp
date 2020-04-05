import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "./course.model";
import {Student} from "./user.model";

@Entity()
export class CourseAttendance {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Course, course => course.attendance)
    course!: Course;

    @ManyToOne(() => Student, student => student.attendance)
    student!: Student;

    @Column({ nullable: false })
    open!: boolean;
}