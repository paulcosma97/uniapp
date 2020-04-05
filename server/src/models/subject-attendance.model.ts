import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Subject} from "./subject.model";
import {Student} from "./user.model";

@Entity()
export class SubjectAttendance {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Subject, subject => subject.attendance)
    subject!: Subject;                       

    @ManyToOne(() => Student, student => student.attendance)
    student!: Student;
}