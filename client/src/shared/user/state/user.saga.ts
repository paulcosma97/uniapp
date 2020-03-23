import { call, put, takeEvery, all } from 'redux-saga/effects'
import {
    LoadUserAction,
    loadUserFail,
    loadUserSuccess,
    LoginUserAction,
    loginUserFail,
    loginUserSuccess, RegisterUserAction, registerUserFail, registerUserSuccess, UserActions
} from "./user.actions";
import {userService} from "../service/user.service";
import User from "../model/user.model";

function* loadUserSaga(action: LoadUserAction) {
    try {
        const user: User = yield call(userService.load);
        yield put(loadUserSuccess(user));
    } catch (e) {
        yield put(loadUserFail());
    }
}

function* loginUserSaga(action: LoginUserAction) {
    try {
        const user: User = yield call(userService.login, action.payload);
        yield put(loginUserSuccess(user));
    } catch (e) {
        yield put(loginUserFail());
    }
}

function* registerUserSaga(action: RegisterUserAction) {
    try {
        const user: User = yield call(userService.register, action.payload);
        yield put(registerUserSuccess(user));
    } catch (e) {
        yield put(registerUserFail());
    }
}

export default function* userSaga () {
    yield all([
        takeEvery(UserActions.REGISTER_USER, registerUserSaga),
        takeEvery(UserActions.LOAD_USER, loadUserSaga),
        takeEvery(UserActions.LOGIN_USER, loginUserSaga),
    ])
}