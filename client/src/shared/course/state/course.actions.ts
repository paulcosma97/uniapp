import {Action, makeAction} from "../../state/utils";
import Course, {CourseDetails} from "../model/course.model";

export enum CourseActions {
    LOAD_ALL_COURSES = '[Course] Load All',
    LOAD_ALL_COURSES_SUCCESS = '[Course] Load All Success',
    LOAD_ALL_COURSES_FAIL = '[Course] Load All Fail',
    LOAD_COURSE = '[Course] Load',
    LOAD_COURSE_SUCCESS = '[Course] Load Success',
    LOAD_COURSE_FAIL = '[Course] Load Fail',
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

export type CourseActionsUnion =
    | LoadAllCoursesAction
    | LoadAllCoursesActionFail
    | LoadAllCoursesActionSuccess
    | LoadCourseAction
    | LoadCourseActionSuccess
    | LoadCourseActionFail;