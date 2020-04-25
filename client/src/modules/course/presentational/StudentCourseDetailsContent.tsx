import React from "react";
import {Button, List, Row} from "antd";
import {CourseAttendance} from "../../../shared/course/model/course.model";
import AttendanceProgress from "./AttendanceProgress";
import AttendanceIcon from "./AttendanceIcon";
import {TriggerCallback} from "../../../shared/utils";

const AttendButton: React.FC<{ onClick?: TriggerCallback }> = ({ onClick }) => (
    <Row justify="center" className="attend-button-wrapper">
        <Button onClick={onClick} type="primary" ghost icon={<AttendanceIcon didAttend={true} />} size="large">
            Sunt Prezent!
        </Button>
    </Row>
);


export interface StudentCourseDetailsContentProps {
    attendances: CourseAttendance[];
    totalStudents: number;
    attendingStudents: number;
}

const StudentCourseDetailsContent: React.FC<StudentCourseDetailsContentProps> = ({ attendances, totalStudents, attendingStudents }) =>(
    <>
        <h4 className="align-center">Prezențe</h4>

        <AttendanceProgress total={totalStudents} current={attendingStudents} />

        <AttendButton onClick={() => {}} />
        <List
            itemLayout="horizontal"
            dataSource={attendances}
            renderItem={attendance => (
                <List.Item>
                    <AttendanceIcon didAttend={attendance.didAttend} available={attendance.available}/>
                    <span>{attendance.title}</span>
                </List.Item>
            )}
        />
    </>
);

export default StudentCourseDetailsContent;