import React from "react";
import {Button, List, Row} from "antd";
import {CourseAttendance} from "../../../shared/course/model/course.model";
import AttendanceProgress from "./AttendanceProgress";
import {TriggerCallback} from "../../../shared/utils";

const AddTeacher: React.FC<{ onClick?: TriggerCallback, disabled: boolean }> = ({ onClick, disabled }) => (
    <Row justify="center" className="attend-button-wrapper">
        <Button onClick={onClick} disabled={disabled} type="primary" ghost>
            Adaugă Profesor
        </Button>
    </Row>
);


export interface TeacherCourseDetailsContentProps {
    attendances: CourseAttendance[];
    attended: number;
    total: number;
    addTeacher: TriggerCallback;
    startAttendance: TriggerCallback<CourseAttendance>;
    canAddTeacher: boolean
}

const TeacherCourseDetailsContent: React.FC<TeacherCourseDetailsContentProps> = props => (
    <>
        <AddTeacher disabled={!props.canAddTeacher} onClick={props.addTeacher} />

        <h4 className="align-center">Prezențe</h4>
        <AttendanceProgress total={props.total} current={props.attended} />

        <List
            itemLayout="horizontal"
            dataSource={props.attendances}
            renderItem={attendance => (
                <List.Item>
                    <span>{attendance.title}</span>
                    {attendance.available ? (
                        <Button onClick={() => props.startAttendance(attendance)}>Începe cursul</Button>
                    ) : (
                        <span>{attendance.attended} / {attendance.total} ( {Math.round(attendance.attended / attendance.total * 100)}% )</span>
                    )}
                </List.Item>
            )}
        />
    </>
);

export default TeacherCourseDetailsContent;