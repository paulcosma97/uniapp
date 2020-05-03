import React, {useEffect, useState} from "react";
import {CourseDetails} from "../../../shared/course/model/course.model";
import StudentCourseDetailsContent from "../presentational/StudentCourseDetailsContent";
import {useDispatch} from "react-redux";
import {attendCourse} from "../../../shared/course/state/course.actions";
import {useTypedSelector} from "../../../shared/state/utils";
import {message} from "antd";

export interface StudentCourseDetailsContentContainerProps {
    course: CourseDetails;
}

const StudentCourseDetailsContentContainer: React.FC<StudentCourseDetailsContentContainerProps> = ({ course }) => {
    const [total, setTotal] = useState(0);
    const [attended, setAttended] = useState(0);
    const dispatch = useDispatch();
    const attendCourseError = useTypedSelector(state => state.course.attendCourseError);


    useEffect(() => {
        setAttended(course.attendances.filter(attendance => attendance.didAttend).length);
        setTotal(course.attendances.length);
    }, [setTotal, setAttended, course.attendances]);

    const onAttendCourse = () => {
        const attendance = course.attendances.find(att => att.open);
        dispatch(attendCourse({ url: attendance!.url!, courseId: course.id }))
    };

    useEffect(() => {
        if (attendCourseError) {
            message.error('Nu ai reușit să te pui prezent!');
        }

    }, [attendCourseError]);

    return <StudentCourseDetailsContent
        attendances={course.attendances}
        attendingStudents={attended}
        totalStudents={total}
        onAttendCourse={onAttendCourse}
    />;
};

export default StudentCourseDetailsContentContainer;