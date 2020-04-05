import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Subject} from "./subject.model";

@Entity()
export class SubjectSupport {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ nullable: false })
    file!: string;

    @Column({ nullable: false })
    fileName!: string;

    @ManyToOne(() => Subject, subject => subject.supportMaterials)
    subject!: Subject;
}