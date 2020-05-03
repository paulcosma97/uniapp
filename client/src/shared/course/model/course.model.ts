import User from "../../user/model/user.model";

export default interface Course {
    id: number;
    title: string;
    code: string;
}

export interface CourseAttendance {
    id: number;
    open: boolean;
    title: string;
    didAttend: boolean;
    available: boolean;
    attended: number;
    total: number;
    url?: string;
}

export interface CourseDetails {
    id: number;
    title: string;
    code: string;
    available: boolean;
    students: User[];
    teachers: User[];
    attendances: CourseAttendance[];
}

export interface CourseAttendanceInput {
    title: string;
}