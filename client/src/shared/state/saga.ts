import userSaga from '../user/state/user.saga';
import { all } from 'redux-saga/effects';
import courseSaga from "../course/state/course.saga";

export default function* rootSaga() {
    yield all([
        userSaga(),
        courseSaga()
    ])
}