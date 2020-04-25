import React from "react";
import * as Course from "../../../shared/course/model/course.model";
import './CourseDetails.css';
import {Avatar, Col, Row} from "antd";
import User from "../../../shared/user/model/user.model";
import StudentCourseDetailsContentContainer from "./StudentCourseDetailsContentContainer";
import TeacherCourseDetailsContentContainer from "./TeacherCourseDetailsContentContainer";

export interface CourseDetailsProps {
    course: Course.CourseDetails;
    forStudent: boolean;
}

const mapTeacherHeader = (user: User) => (
    <Col span={8} className="teacher-header-item" key={user.id}>
        <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle' }} size="large">
            {[user.firstName, user.lastName].map(word => word[0].toUpperCase()).join('')}
        </Avatar>
        <p>{user.firstName} {user.lastName}</p>
    </Col>
);

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, forStudent }) => (
    <div className="course-details">
        <h3 className="align-center">{course.title}</h3>

        <Row justify="center" className="teacher-header">
            {course.teachers.map(mapTeacherHeader)}
        </Row>

        {forStudent ?
            <StudentCourseDetailsContentContainer course={course}/> :
            <TeacherCourseDetailsContentContainer course={course} /> }

    </div>
);

export default CourseDetails;