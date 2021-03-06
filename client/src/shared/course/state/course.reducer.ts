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
    };
    addCourseError: boolean;
    removeCourseError: boolean;
    addTeacherError: boolean;
    toggleCourseAttendanceError: boolean;
    attendCourseError: boolean;
    createAttendanceError: boolean;
    deleteAttendanceError: boolean;
}

export const initialState: CourseState = {
    courses: {
        items: [],
        loading: false
    },
    course: {
        loading: true,
        error: false
    },
    addCourseError: false,
    removeCourseError: false,
    addTeacherError: false,
    toggleCourseAttendanceError: false,
    attendCourseError: false,
    createAttendanceError: false,
    deleteAttendanceError: false,
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
        case CourseActions.ENLIST_COURSE:
        case CourseActions.CREATE_COURSE:
            return {
                ...state,
                addCourseError: false,
                courses: {
                    ...state.courses,
                    loading: true
                }
            };
        case CourseActions.ENLIST_COURSE_SUCCESS:
        case CourseActions.CREATE_COURSE_SUCCESS:
            return {
                ...state,
                addCourseError: false,
                courses: {
                    ...state.courses,
                    items: [
                        ...state.courses.items,
                        action.payload
                    ],
                    loading: false
                }
            };
        case CourseActions.ENLIST_COURSE_FAIL:
        case CourseActions.CREATE_COURSE_FAIL:
            return {
                ...state,
                addCourseError: true,
                courses: {
                    ...state.courses,
                    loading: false
                }
            };
        case CourseActions.DELIST_COURSE:
        case CourseActions.REMOVE_COURSE:
            return {
                ...state,
                removeCourseError: false,
                courses: {
                    ...state.courses,
                    loading: true
                }
            };
        case CourseActions.DELIST_COURSE_SUCCESS:
        case CourseActions.REMOVE_COURSE_SUCCESS:
            return {
                ...state,
                removeCourseError: false,
                courses: {
                    ...state.courses,
                    items: state.courses.items.filter(course => course.id !== action.payload),
                    loading: false
                }
            };
        case CourseActions.DELIST_COURSE_FAIL:
        case CourseActions.REMOVE_COURSE_FAIL:
            return {
                ...state,
                removeCourseError: true,
                courses: {
                    ...state.courses,
                    loading: false
                }
            };
        case CourseActions.ADD_TEACHER:
            return {
                ...state,
                addTeacherError: false
            };
        case CourseActions.ADD_TEACHER_FAIL:
            return {
                ...state,
                addTeacherError: true
            };
        case CourseActions.ADD_TEACHER_SUCCESS:
            return {
                ...state,
                addTeacherError: false,
                course: {
                    ...state.course,
                    data: {
                        ...state.course.data!,
                        teachers: [
                            ...state.course.data!.teachers,
                            action.payload
                        ]
                    }
                }
            };
        case CourseActions.TOGGLE_COURSE_ATTENDANCE:
        case CourseActions.TOGGLE_COURSE_ATTENDANCE_SUCCESS:
            return {
                ...state,
                toggleCourseAttendanceError: false
            };
        case CourseActions.TOGGLE_COURSE_ATTENDANCE_FAIL:
            return {
                ...state,
                toggleCourseAttendanceError: true
            };
        case CourseActions.ATTEND_COURSE:
        case CourseActions.ATTEND_COURSE_SUCCESS:
            return {
                ...state,
                attendCourseError: false
            };
        case CourseActions.ATTEND_COURSE_FAIL:
            return {
                ...state,
                attendCourseError: true
            };
        case CourseActions.CREATE_ATTENDANCE:
            return {
                ...state,
                createAttendanceError: false
            };
        case CourseActions.CREATE_ATTENDANCE_SUCCESS:
            return {
                ...state,
                createAttendanceError: false,
                course: {
                    ...state.course,
                    data: {
                        ...state.course.data!,
                        attendances: [
                            ...state.course.data!.attendances,
                            {
                                ...action.payload,
                                attended: 0,
                                total: state.course.data!.students.length
                            }
                        ]
                    }
                }
            };
        case CourseActions.CREATE_ATTENDANCE_FAIL:
            return {
                ...state,
                createAttendanceError: true
            };
        case CourseActions.DELETE_ATTENDANCE:
            return {
                ...state,
                deleteAttendanceError: false
            };
        case CourseActions.DELETE_ATTENDANCE_SUCCESS:
            state.course.data!.attendances = state.course.data!.attendances.filter(attendance => attendance.id !== action.payload);

            return {
                ...state,
                deleteAttendanceError: false
            };
        case CourseActions.DELETE_ATTENDANCE_FAIL:
            return {
                ...state,
                deleteAttendanceError: true
            };
        default:
            return state;
    }
}