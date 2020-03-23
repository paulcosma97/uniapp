import {Action, makeAction} from "../../state/utils";
import User, {ShortUser, UserCredentials} from "../model/user.model";

export enum UserActions {
    LOAD_USER = '[User] Load',
    LOAD_USER_SUCCESS = '[User] Load Success',
    LOAD_USER_FAIL = '[User] Load Fail',

    LOGIN_USER = '[User] Login',
    LOGIN_USER_SUCCESS = '[User] Login Success',
    LOGIN_USER_FAIL = '[User] Login Fail',

    REGISTER_USER = '[User] Register',
    REGISTER_USER_SUCCESS = '[User] Register Success',
    REGISTER_USER_FAIL = '[User] Register Fail',
}

export type LoadUserAction = Action<UserActions.LOAD_USER>;
export type LoadUserActionSuccess = Action<UserActions.LOAD_USER_SUCCESS, User>;
export type LoadUserActionFail = Action<UserActions.LOAD_USER_FAIL>;

export const loadUser = makeAction<LoadUserAction>(UserActions.LOAD_USER);
export const loadUserSuccess = makeAction<LoadUserActionSuccess>(UserActions.LOAD_USER_SUCCESS);
export const loadUserFail = makeAction<LoadUserActionFail>(UserActions.LOAD_USER_FAIL);

export type LoginUserAction = Action<UserActions.LOGIN_USER, UserCredentials>;
export type LoginUserActionSuccess = Action<UserActions.LOGIN_USER_SUCCESS, User>;
export type LoginUserActionFail = Action<UserActions.LOGIN_USER_FAIL>;

export const loginUser = makeAction<LoginUserAction>(UserActions.LOGIN_USER);
export const loginUserSuccess = makeAction<LoginUserActionSuccess>(UserActions.LOGIN_USER_SUCCESS);
export const loginUserFail = makeAction<LoginUserActionFail>(UserActions.LOGIN_USER_FAIL);

export type RegisterUserAction = Action<UserActions.REGISTER_USER, ShortUser & UserCredentials>;
export type RegisterUserActionSuccess = Action<UserActions.REGISTER_USER_SUCCESS, User>;
export type RegisterUserActionFail = Action<UserActions.REGISTER_USER_FAIL>;

export const registerUser = makeAction<RegisterUserAction>(UserActions.REGISTER_USER);
export const registerUserSuccess = makeAction<RegisterUserActionSuccess>(UserActions.REGISTER_USER_SUCCESS);
export const registerUserFail = makeAction<RegisterUserActionFail>(UserActions.REGISTER_USER_FAIL);


export type UserActionsUnion = LoadUserAction
    | LoadUserActionSuccess
    | LoadUserActionFail
    | LoginUserAction
    | LoginUserActionFail
    | LoginUserActionSuccess
    | RegisterUserAction
    | RegisterUserActionFail
    | RegisterUserActionSuccess;
