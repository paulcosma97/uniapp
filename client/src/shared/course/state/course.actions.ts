import {Action, makeAction} from "../../state/utils";
import Course from "../model/course.model";

export enum CourseActions {
    LOAD_ALL_COURSES = '[Course] Load All',
    LOAD_ALL_COURSES_SUCCESS = '[Course] Load All Success',
    LOAD_ALL_COURSES_FAIL = '[Course] Load All Fail',
}

export type LoadAllCoursesAction = Action<CourseActions.LOAD_ALL_COURSES>;
export type LoadAllCoursesActionSuccess = Action<CourseActions.LOAD_ALL_COURSES_SUCCESS, Course[]>;
export type LoadAllCoursesActionFail = Action<CourseActions.LOAD_ALL_COURSES_FAIL>;

export const loadAllCourses = makeAction<LoadAllCoursesAction>(CourseActions.LOAD_ALL_COURSES);
export const loadAllCoursesSuccess = makeAction<LoadAllCoursesActionSuccess>(CourseActions.LOAD_ALL_COURSES_SUCCESS);
export const loadAllCoursesFail = makeAction<LoadAllCoursesActionFail>(CourseActions.LOAD_ALL_COURSES_FAIL);

export type CourseActionsUnion =
    | LoadAllCoursesAction
    | LoadAllCoursesActionFail
    | LoadAllCoursesActionSuccess;