import Course, {CourseDetails} from "../model/course.model";
import {all, call, put, takeEvery} from "redux-saga/effects";
import {courseService} from "../service/course.service";
import {
    CourseActions,
    loadAllCoursesFail,
    loadAllCoursesSuccess,
    LoadCourseAction, loadCourseFail,
    loadCourseSuccess
} from "./course.actions";


function* loadAllCourses() {
    try {
        const courses: Course[] = yield call(courseService.loadAll);
        yield put(loadAllCoursesSuccess(courses));
    } catch (e) {
        yield put(loadAllCoursesFail());
    }
}

function* loadCourse(action: LoadCourseAction) {
    try {
        const course: CourseDetails = yield call(courseService.load, action.payload);
        yield put(loadCourseSuccess(course));
    } catch (e) {
        yield put(loadCourseFail());
    }
}

export default function* courseSaga () {
    yield all([
        takeEvery(CourseActions.LOAD_ALL_COURSES, loadAllCourses),
        takeEvery(CourseActions.LOAD_COURSE, loadCourse),
    ])
}