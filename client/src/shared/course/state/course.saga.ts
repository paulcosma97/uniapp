import Course, {CourseDetails} from "../model/course.model";
import {all, call, put, takeEvery} from "redux-saga/effects";
import {courseService} from "../service/course.service";
import {
    CourseActions, CreateCourseAction,
    createCourseFail,
    createCourseSuccess,
    DelistCourseAction, delistCourseFail, delistCourseSuccess,
    EnlistCourseAction,
    enlistCourseFail,
    enlistCourseSuccess,
    loadAllCoursesFail,
    loadAllCoursesSuccess,
    LoadCourseAction,
    loadCourseFail,
    loadCourseSuccess, RemoveCourseAction, removeCourseFail, removeCourseSuccess
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

function* enlistCourse(action: EnlistCourseAction) {
    try {
        const course: Course = yield call(courseService.enlist, action.payload);
        yield put(enlistCourseSuccess(course));
    } catch (e) {
        yield put(enlistCourseFail());
    }
}

function* delistCourse(action: DelistCourseAction) {
    try {
        yield call(courseService.delist, action.payload.id, action.payload.student);
        yield put(delistCourseSuccess(action.payload.id));
    } catch (e) {
        yield put(delistCourseFail());
    }
}

function* createCourse(action: CreateCourseAction) {
    try {
        const course = yield call(courseService.create, action.payload);
        yield put(createCourseSuccess(course));
    } catch (e) {
        yield put(createCourseFail());
    }
}

function* removeCourse(action: RemoveCourseAction) {
    try {
        yield call(courseService.remove, action.payload);
        yield put(removeCourseSuccess(action.payload));
    } catch (e) {
        yield put(removeCourseFail());
    }
}

export default function* courseSaga () {
    yield all([
        takeEvery(CourseActions.LOAD_ALL_COURSES, loadAllCourses),
        takeEvery(CourseActions.LOAD_COURSE, loadCourse),
        takeEvery(CourseActions.ENLIST_COURSE, enlistCourse),
        takeEvery(CourseActions.DELIST_COURSE, delistCourse),
        takeEvery(CourseActions.CREATE_COURSE, createCourse),
        takeEvery(CourseActions.REMOVE_COURSE, removeCourse),
    ])
}