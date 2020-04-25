import React, {useEffect, useState} from "react";
import {Button, List, Row} from "antd";
import {CourseDetails} from "../../../shared/course/model/course.model";
import AttendanceProgress from "./AttendanceProgress";
import AttendanceIcon from "./AttendanceIcon";
import {TriggerCallback} from "../../../shared/utils";
import StudentCourseDetailsContent from "./StudentCourseDetailsContent";

export interface StudentCourseDetailsContentContainerProps {
    course: CourseDetails;
}

const StudentCourseDetailsContentContainer: React.FC<StudentCourseDetailsContentContainerProps> = ({ course }) => {
    const [total, setTotal] = useState(0);
    const [attended, setAttended] = useState(0);

    useEffect(() => {
        setAttended(course.attendances.filter(attendance => attendance.didAttend).length);
        setTotal(course.attendances.length);
    }, [setTotal, setAttended, course.attendances]);

    return <StudentCourseDetailsContent attendances={course.attendances} attendingStudents={attended} totalStudents={total}/>;
};

export default StudentCourseDetailsContentContainer;