import {Action, makeAction} from "../../state/utils";
import Course, {CourseAttendance, CourseDetails} from "../model/course.model";
import User from "../../user/model/user.model";

export enum CourseActions {
    LOAD_ALL_COURSES = '[Course] Load All',
    LOAD_ALL_COURSES_SUCCESS = '[Course] Load All Success',
    LOAD_ALL_COURSES_FAIL = '[Course] Load All Fail',
    LOAD_COURSE = '[Course] Load',
    LOAD_COURSE_SUCCESS = '[Course] Load Success',
    LOAD_COURSE_FAIL = '[Course] Load Fail',
    ENLIST_COURSE = '[Course] Enlist',
    ENLIST_COURSE_SUCCESS = '[Course] Enlist Success',
    ENLIST_COURSE_FAIL = '[Course] Enlist Fail',
    CREATE_COURSE = '[Course] Create',
    CREATE_COURSE_SUCCESS = '[Course] Create Success',
    CREATE_COURSE_FAIL = '[Course] Create Fail',
    DELIST_COURSE = '[Course] Delist',
    DELIST_COURSE_SUCCESS = '[Course] Delist Success',
    DELIST_COURSE_FAIL = '[Course] Delist Fail',
    REMOVE_COURSE = '[Course] Remove',
    REMOVE_COURSE_SUCCESS = '[Course] Remove Success',
    REMOVE_COURSE_FAIL = '[Course] Remove Fail',
    ADD_TEACHER = '[Course] Add Teacher',
    ADD_TEACHER_SUCCESS = '[Course] Add Teacher Success',
    ADD_TEACHER_FAIL = '[Course] Add Teacher Fail',
    TOGGLE_COURSE_ATTENDANCE = '[Course] Toggle Course Attendance',
    TOGGLE_COURSE_ATTENDANCE_SUCCESS = '[Course] Toggle Course Attendance Success',
    TOGGLE_COURSE_ATTENDANCE_FAIL = '[Course] Toggle Course Attendance Fail',
    ATTEND_COURSE = '[Course] Attend Course',
    ATTEND_COURSE_SUCCESS = '[Course] Attend Course Success',
    ATTEND_COURSE_FAIL = '[Course] Attend Course Fail',
    CREATE_ATTENDANCE = '[Course] Create Attendance',
    CREATE_ATTENDANCE_SUCCESS = '[Course] Create Attendance Success',
    CREATE_ATTENDANCE_FAIL = '[Course] Create Attendance Fail',
    DELETE_ATTENDANCE = '[Course] Delete Attendance',
    DELETE_ATTENDANCE_SUCCESS = '[Course] Delete Attendance Success',
    DELETE_ATTENDANCE_FAIL = '[Course] Delete Attendance Fail',
}

export type LoadAllCoursesAction = Action<CourseActions.LOAD_ALL_COURSES>;
export type LoadAllCoursesActionSuccess = Action<CourseActions.LOAD_ALL_COURSES_SUCCESS, Course[]>;
export type LoadAllCoursesActionFail = Action<CourseActions.LOAD_ALL_COURSES_FAIL>;

export const loadAllCourses = makeAction<LoadAllCoursesAction>(CourseActions.LOAD_ALL_COURSES);
export const loadAllCoursesSuccess = makeAction<LoadAllCoursesActionSuccess>(CourseActions.LOAD_ALL_COURSES_SUCCESS);
export const loadAllCoursesFail = makeAction<LoadAllCoursesActionFail>(CourseActions.LOAD_ALL_COURSES_FAIL);

export type LoadCourseAction = Action<CourseActions.LOAD_COURSE, number>;
export type LoadCourseActionSuccess = Action<CourseActions.LOAD_COURSE_SUCCESS, CourseDetails>;
export type LoadCourseActionFail = Action<CourseActions.LOAD_COURSE_FAIL>;

export const loadCourse = makeAction<LoadCourseAction>(CourseActions.LOAD_COURSE);
export const loadCourseSuccess = makeAction<LoadCourseActionSuccess>(CourseActions.LOAD_COURSE_SUCCESS);
export const loadCourseFail = makeAction<LoadCourseActionFail>(CourseActions.LOAD_COURSE_FAIL);

export type EnlistCourseAction = Action<CourseActions.ENLIST_COURSE, string>;
export type EnlistCourseActionSuccess = Action<CourseActions.ENLIST_COURSE_SUCCESS, Course>;
export type EnlistCourseActionFail = Action<CourseActions.ENLIST_COURSE_FAIL>;

export const enlistCourse = makeAction<EnlistCourseAction>(CourseActions.ENLIST_COURSE);
export const enlistCourseSuccess = makeAction<EnlistCourseActionSuccess>(CourseActions.ENLIST_COURSE_SUCCESS);
export const enlistCourseFail = makeAction<EnlistCourseActionFail>(CourseActions.ENLIST_COURSE_FAIL);

export type DelistCourseAction = Action<CourseActions.DELIST_COURSE, { id: number; student: number }>;
export type DelistCourseActionSuccess = Action<CourseActions.DELIST_COURSE_SUCCESS, number>;
export type DelistCourseActionFail = Action<CourseActions.DELIST_COURSE_FAIL>;

export const delistCourse = makeAction<DelistCourseAction>(CourseActions.DELIST_COURSE);
export const delistCourseSuccess = makeAction<DelistCourseActionSuccess>(CourseActions.DELIST_COURSE_SUCCESS);
export const delistCourseFail = makeAction<DelistCourseActionFail>(CourseActions.DELIST_COURSE_FAIL);

export type CreateCourseAction = Action<CourseActions.CREATE_COURSE, string>;
export type CreateCourseActionSuccess = Action<CourseActions.CREATE_COURSE_SUCCESS, Course>;
export type CreateCourseActionFail = Action<CourseActions.CREATE_COURSE_FAIL>;

export const createCourse = makeAction<CreateCourseAction>(CourseActions.CREATE_COURSE);
export const createCourseSuccess = makeAction<CreateCourseActionSuccess>(CourseActions.CREATE_COURSE_SUCCESS);
export const createCourseFail = makeAction<CreateCourseActionFail>(CourseActions.CREATE_COURSE_FAIL);

export type RemoveCourseAction = Action<CourseActions.REMOVE_COURSE, number>;
export type RemoveCourseActionSuccess = Action<CourseActions.REMOVE_COURSE_SUCCESS, number>;
export type RemoveCourseActionFail = Action<CourseActions.REMOVE_COURSE_FAIL>;

export const removeCourse = makeAction<RemoveCourseAction>(CourseActions.REMOVE_COURSE);
export const removeCourseSuccess = makeAction<RemoveCourseActionSuccess>(CourseActions.REMOVE_COURSE_SUCCESS);
export const removeCourseFail = makeAction<RemoveCourseActionFail>(CourseActions.REMOVE_COURSE_FAIL);

export type AddTeacherAction = Action<CourseActions.ADD_TEACHER, { email: string; id: number }>;
export type AddTeacherActionSuccess = Action<CourseActions.ADD_TEACHER_SUCCESS, User>;
export type AddTeacherActionFail = Action<CourseActions.ADD_TEACHER_FAIL>;

export const addTeacher = makeAction<AddTeacherAction>(CourseActions.ADD_TEACHER);
export const addTeacherSuccess = makeAction<AddTeacherActionSuccess>(CourseActions.ADD_TEACHER_SUCCESS);
export const addTeacherFail = makeAction<AddTeacherActionFail>(CourseActions.ADD_TEACHER_FAIL);

export type ToggleCourseAttendanceAction = Action<CourseActions.TOGGLE_COURSE_ATTENDANCE, { attendanceId: number; start: boolean; courseId: number }>;
export type ToggleCourseAttendanceActionSuccess = Action<CourseActions.TOGGLE_COURSE_ATTENDANCE_SUCCESS>;
export type ToggleCourseAttendanceActionFail = Action<CourseActions.TOGGLE_COURSE_ATTENDANCE_FAIL>;

export const toggleCourseAttendance = makeAction<ToggleCourseAttendanceAction>(CourseActions.TOGGLE_COURSE_ATTENDANCE);
export const toggleCourseAttendanceSuccess = makeAction<ToggleCourseAttendanceActionSuccess>(CourseActions.TOGGLE_COURSE_ATTENDANCE_SUCCESS);
export const toggleCourseAttendanceFail = makeAction<ToggleCourseAttendanceActionFail>(CourseActions.TOGGLE_COURSE_ATTENDANCE_FAIL);

export type AttendCourseAction = Action<CourseActions.ATTEND_COURSE, { url: string; courseId: number }>;
export type AttendCourseActionSuccess = Action<CourseActions.ATTEND_COURSE_SUCCESS>;
export type AttendCourseActionFail = Action<CourseActions.ATTEND_COURSE_FAIL>;

export const attendCourse = makeAction<AttendCourseAction>(CourseActions.ATTEND_COURSE);
export const attendCourseSuccess = makeAction<AttendCourseActionSuccess>(CourseActions.ATTEND_COURSE_SUCCESS);
export const attendCourseFail = makeAction<AttendCourseActionFail>(CourseActions.ATTEND_COURSE_FAIL);

export type CreateAttendanceAction = Action<CourseActions.CREATE_ATTENDANCE, { courseId: number, title: string }>;
export type CreateAttendanceActionSuccess = Action<CourseActions.CREATE_ATTENDANCE_SUCCESS, CourseAttendance>;
export type CreateAttendanceActionFail = Action<CourseActions.CREATE_ATTENDANCE_FAIL>;

export const createAttendance = makeAction<CreateAttendanceAction>(CourseActions.CREATE_ATTENDANCE);
export const createAttendanceSuccess = makeAction<CreateAttendanceActionSuccess>(CourseActions.CREATE_ATTENDANCE_SUCCESS);
export const createAttendanceFail = makeAction<CreateAttendanceActionFail>(CourseActions.CREATE_ATTENDANCE_FAIL);

export type DeleteAttendanceAction = Action<CourseActions.DELETE_ATTENDANCE, number>;
export type DeleteAttendanceActionSuccess = Action<CourseActions.DELETE_ATTENDANCE_SUCCESS, number>;
export type DeleteAttendanceActionFail = Action<CourseActions.DELETE_ATTENDANCE_FAIL>;

export const deleteAttendance = makeAction<DeleteAttendanceAction>(CourseActions.DELETE_ATTENDANCE);
export const deleteAttendanceSuccess = makeAction<DeleteAttendanceActionSuccess>(CourseActions.DELETE_ATTENDANCE_SUCCESS);
export const deleteAttendanceFail = makeAction<DeleteAttendanceActionFail>(CourseActions.DELETE_ATTENDANCE_FAIL);

export type CourseActionsUnion =
    | LoadAllCoursesAction
    | LoadAllCoursesActionFail
    | LoadAllCoursesActionSuccess
    | LoadCourseAction
    | LoadCourseActionSuccess
    | LoadCourseActionFail
    | EnlistCourseAction
    | EnlistCourseActionSuccess
    | EnlistCourseActionFail
    | DelistCourseAction
    | DelistCourseActionSuccess
    | DelistCourseActionFail
    | CreateCourseAction
    | CreateCourseActionSuccess
    | CreateCourseActionFail
    | RemoveCourseAction
    | RemoveCourseActionSuccess
    | RemoveCourseActionFail
    | AddTeacherAction
    | AddTeacherActionSuccess
    | AddTeacherActionFail
    | ToggleCourseAttendanceAction
    | ToggleCourseAttendanceActionSuccess
    | ToggleCourseAttendanceActionFail
    | AttendCourseAction
    | AttendCourseActionSuccess
    | AttendCourseActionFail
    | CreateAttendanceAction
    | CreateAttendanceActionSuccess
    | CreateAttendanceActionFail
    | DeleteAttendanceAction
    | DeleteAttendanceActionSuccess
    | DeleteAttendanceActionFail;