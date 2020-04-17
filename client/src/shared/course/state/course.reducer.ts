import Course, {CourseDetails} from "../model/course.model";
import {CourseActions, CourseActionsUnion} from "./course.actions";

export interface CourseState {
    courses: {
        items: Course[],
        loading: boolean;
    };
    course: {
        data?: CourseDetails;
        loading: boolean;
        error: boolean;
    }
}

export const initialState: CourseState = {
    courses: {
        items: [],
        loading: false
    },
    course: {
        loading: true,
        error: false
    }
};

export default function reducer(state= initialState, action: CourseActionsUnion): CourseState {
    switch (action.type) {
        case CourseActions.LOAD_ALL_COURSES:
            return {
                ...state,
                courses: {
                    ...state.courses,
                    loading: true
                }
            };
        case CourseActions.LOAD_ALL_COURSES_SUCCESS:
            return {
                ...state,
                courses: {
                    items: action.payload,
                    loading: false
                }
            };
        case CourseActions.LOAD_ALL_COURSES_FAIL:
            return {
                ...state,
                courses: {
                    ...state.courses,
                    loading: false
                }
            };
        case CourseActions.LOAD_COURSE:
            return {
                ...state,
                course: {
                    loading: true,
                    error: false
                }
            };
        case CourseActions.LOAD_COURSE_SUCCESS:
            return {
                ...state,
                course: {
                    data: action.payload,
                    loading: false,
                    error: false
                }
            };
        case CourseActions.LOAD_COURSE_FAIL:
            return {
                ...state,
                course: {
                    loading: false,
                    error: true
                }
            };
        default:
            return { ...state };
    }
}