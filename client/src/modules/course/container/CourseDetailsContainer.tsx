import React, {useEffect} from "react";
import CourseDetails from "../presentational/CourseDetails";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../shared/state/utils";
import {loadCourse} from "../../../shared/course/state/course.actions";
import LoadingSpinner from "../../../shared/components/spinner/LoadingSpinner";
import * as Course from "../../../shared/course/model/course.model";


const CourseDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const history = useHistory();
    const { error, data: course, loading } = useTypedSelector(state => state.course.course);
    const user = useTypedSelector(state => state.user.data);

    useEffect(() => {
        dispatch(loadCourse(+id));
    }, [id, dispatch]);

    useEffect(() => {
        if (error) {
            history.push('/not-found')
        }
    }, [error, history]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return <CourseDetails forStudent={user?.role === 'student'} course={course as Course.CourseDetails} />
};

export default CourseDetailsContainer;