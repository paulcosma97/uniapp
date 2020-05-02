import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "./course.model";
import {Student} from "./user.model";

@Entity()
export class CourseAttendance {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Course, course => course.attendances)
    course!: Course;

    @JoinTable()
    @ManyToMany(() => Student, student => student.attendances)
    students?: Student[];

    @Column({ nullable: false })
    open!: boolean;

    @Column({ nullable: false })
    available!: boolean;

    @Column({ nullable: false })
    title!: string;

    @Column({ nullable: true })
    url?: string;
}