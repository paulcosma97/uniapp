import Course from "../model/course.model";
import {all, call, put, takeEvery} from "redux-saga/effects";
import {courseService} from "../service/course.service";
import {CourseActions, loadAllCoursesFail, loadAllCoursesSuccess} from "./course.actions";


function* loadAllCourses() {
    try {
        const courses: Course[] = yield call(courseService.loadAll);
        yield put(loadAllCoursesSuccess(courses));
    } catch (e) {
        yield put(loadAllCoursesFail());
    }
}

export default function* courseSaga () {
    yield all([
        takeEvery(CourseActions.LOAD_ALL_COURSES, loadAllCourses)
    ])
}