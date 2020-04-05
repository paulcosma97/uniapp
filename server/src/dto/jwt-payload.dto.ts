import {UserRole} from "../models/user.model";

export interface JwtPayloadDto {
    id: number;
    role: UserRole;
}