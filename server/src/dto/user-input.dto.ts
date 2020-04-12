import {UserRole} from "../models/user.model";

export default interface UserInputDto {
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    password: string;
}