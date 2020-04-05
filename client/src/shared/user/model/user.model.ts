export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher'
}

export interface UserCredentials {
    email: string;
    password: string;
}


export interface ShortUser {
    firstName: string;
    lastName: string;
    email: string;
}

export default interface User extends ShortUser {
    id: number;
    role: UserRole;
}