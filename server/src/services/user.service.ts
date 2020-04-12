import UserInputDto from "../dto/user-input.dto";
import {sendBadRequest} from "./utils.service";
import {Student, User, UserRole} from "../models/user.model";
import {getRepository} from "typeorm";
import GenericError from "../errors/generic-error";

export async function validateUserInput(user: Partial<UserInputDto>): Promise<void> {

    if (!user.email || !user.lastName || !user.firstName || !user.role || !user.password) {
        throw new GenericError(res => sendBadRequest(res, 'Not all fields are filled.'));
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)) {
        throw new GenericError(res => sendBadRequest(res, 'Invalid email format.'));
    }

    if (user.firstName.length < 2) {
        throw new GenericError(res => sendBadRequest(res, 'First name is too short.'));
    }

    if (user.lastName.length < 2) {
        throw new GenericError(res => sendBadRequest(res, 'Last name is too short.'));
    }

    if (user.password.length < 6) {
        throw new GenericError(res => sendBadRequest(res, 'Password is too short.'));
    }

    if (!Object.values(UserRole).includes(user.role)) {
        throw new GenericError(res => sendBadRequest(res, 'Invalid role.'));
    }

    if (await getRepository(User).findOne({ email: user.email })) {
        throw new GenericError(res => sendBadRequest(res, 'Email already in use.'));
    }
}

export function isStudent(user: User): user is Student {
    return user.role === UserRole.STUDENT;
}