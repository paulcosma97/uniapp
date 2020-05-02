import Course, {CourseDetails} from "../model/course.model";
import {all, call, put, takeEvery} from "redux-saga/effects";
import {courseService} from "../service/course.service";
import {
    AddTeacherAction,
    addTeacherFail,
    addTeacherSuccess,
    CourseActions,
    CreateCourseAction,
    createCourseFail,
    createCourseSuccess,
    DelistCourseAction,
    delistCourseFail,
    delistCourseSuccess,
    EnlistCourseAction,
    enlistCourseFail,
    enlistCourseSuccess,
    loadAllCoursesFail,
    loadAllCoursesSuccess,
    LoadCourseAction,
    loadCourseFail,
    loadCourse as dispatchLoadCourse,
    loadCourseSuccess,
    RemoveCourseAction,
    removeCourseFail,
    removeCourseSuccess,
    ToggleCourseAttendanceAction, toggleCourseAttendanceFail,
    toggleCourseAttendanceSuccess
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

function* addTeacher(action: AddTeacherAction) {
    try {
        const teacher = yield call(courseService.addTeacher, action.payload.id, action.payload.email);
        yield put(addTeacherSuccess(teacher));
    } catch (e) {
        yield put(addTeacherFail());
    }
}

function* toggleCourseAttendance(action: ToggleCourseAttendanceAction) {
    try {
        yield call(courseService.toggleAttendance, action.payload.attendanceId);
        if (action.payload.start) {
            const zipBlob = yield call(courseService.downloadLocalServer, action.payload.attendanceId, window.location.origin);
            const url = window.URL.createObjectURL(new Blob([zipBlob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'local-server.zip');
            document.body.appendChild(link);
            link.click();
        }
        yield put(toggleCourseAttendanceSuccess());
        yield put(dispatchLoadCourse(action.payload.courseId));

    } catch (e) {
        yield put(toggleCourseAttendanceFail());
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
        takeEvery(CourseActions.ADD_TEACHER, addTeacher),
        takeEvery(CourseActions.TOGGLE_COURSE_ATTENDANCE, toggleCourseAttendance),
    ])
}