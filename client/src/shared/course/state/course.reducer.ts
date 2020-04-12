import Course from "../model/course.model";
import {CourseActions, CourseActionsUnion} from "./course.actions";

export interface CourseState {
    courses: {
        items: Course[],
        loading: boolean;
    }
}

export const initialState: CourseState = {
    courses: {
        items: [],
        loading: false
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
        default:
            return { ...state };
    }
}