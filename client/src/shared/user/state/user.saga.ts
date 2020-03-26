import {all, call, put, takeEvery} from 'redux-saga/effects'
import {
    loadUserFail,
    loadUserSuccess,
    LoginUserAction,
    loginUserFail,
    loginUserSuccess, logoutUserFail, logoutUserSuccess,
    RegisterUserAction,
    registerUserFail,
    registerUserSuccess,
    UserActions
} from "./user.actions";
import {userService} from "../service/user.service";
import User from "../model/user.model";

function* loadUserSaga() {
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
        yield call(userService.register, action.payload);
        yield put(registerUserSuccess());
    } catch (e) {
        yield put(registerUserFail());
    }
}

function* logoutUserSaga() {
    try {
        yield call(userService.logout);
        yield put(logoutUserSuccess());
    } catch (e) {
        yield put(logoutUserFail());
    }
}

export default function* userSaga () {
    yield all([
        takeEvery(UserActions.REGISTER_USER, registerUserSaga),
        takeEvery(UserActions.LOAD_USER, loadUserSaga),
        takeEvery(UserActions.LOGIN_USER, loginUserSaga),
        takeEvery(UserActions.LOGOUT_USER, logoutUserSaga),
    ])
}