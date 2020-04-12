import React, {useEffect} from "react";
import {CourseList} from "../presentational/CourseList";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../shared/state/utils";
import {loadAllCourses} from "../../../shared/course/state/course.actions";
import LoadingSpinner from "../../../shared/components/spinner/LoadingSpinner";
import Course from "../../../shared/course/model/course.model";
import { useHistory } from "react-router-dom";

export const CourseListContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { items: courses, loading } = useTypedSelector(state => state.course.courses);
    const history = useHistory();

    const onCourseClick = (course: Course) => {
        history.push('/courses/' + course.id)
    };

    const onCourseDelete = (course: Course) => {
        console.log('delete', course)
    };

    useEffect(() => {
        dispatch(loadAllCourses());
    }, [dispatch]);

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <CourseList onCourseClick={onCourseClick} onCourseDelete={onCourseDelete} courses={courses} />
    )
};