import {combineReducers} from "redux";
import userReducer, {UserState} from '../user/state/user.reducer';
import courseReducer, {CourseState} from "../course/state/course.reducer";

export interface RootState {
    user: UserState;
    course: CourseState
}

const rootReducer = combineReducers({
    user: userReducer,
    course: courseReducer
});

export default rootReducer;