import userSaga from '../user/state/user.saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
    yield all([
        userSaga()
    ])
}