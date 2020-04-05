import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Subject} from "./subject.model";
import {Student} from "./user.model";

@Entity()
export class SubjectGrade {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Subject, subject => subject.grades)
    subject!: Subject;

    @ManyToOne(() => Student, student => student.grades)
    student!: Student;

    @Column({ type: 'float', nullable: false })
    grade!: number;
}