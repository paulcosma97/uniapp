import React from "react";
import {Button, List, Row} from "antd";
import {CourseAttendance} from "../../../shared/course/model/course.model";
import AttendanceProgress from "./AttendanceProgress";
import {TriggerCallback} from "../../../shared/utils";
import './TeacherCourseDetailsContent.css'

const AddTeacher: React.FC<{ onClick: TriggerCallback, disabled: boolean }> = ({ onClick, disabled }) => (
    <Row justify="center" className="attend-button-wrapper">
        <Button onClick={onClick} disabled={disabled} type="primary" ghost>
            Adaugă Profesor
        </Button>
    </Row>
);


const AddAttendance: React.FC<{ onClick: TriggerCallback }> = ({ onClick }) => (
    <Row justify="center" className="attend-button-wrapper">
        <Button onClick={onClick} type="primary" ghost>
            Adaugă Prezență
        </Button>
    </Row>
);


export interface TeacherCourseDetailsContentProps {
    attendances: CourseAttendance[];
    attended: number;
    total: number;
    addTeacher: TriggerCallback;
    startAttendance: TriggerCallback<CourseAttendance>;
    stopAttendance: TriggerCallback<CourseAttendance>;
    canAddTeacher: boolean;
    createAttendance: TriggerCallback;
    deleteAttendance: TriggerCallback<CourseAttendance>;
}

const TeacherCourseDetailsContent: React.FC<TeacherCourseDetailsContentProps> = props => {
    const attendanceInProgress = props.attendances.find(att => att.open);
    const attendanceCanBeStarted = props.attendances.find(att => att.available);

    return (
      <>
          <AddTeacher disabled={!props.canAddTeacher} onClick={props.addTeacher} />

          <h4 className="align-center">Prezențe</h4>
          <AttendanceProgress total={props.total} current={props.attended} />

          <List
              itemLayout="horizontal"
              dataSource={props.attendances}
              renderItem={attendance => (
                  <List.Item className="fixed-width-buttons">
                      <span>{attendance.title}</span>
                      <div>
                          {attendanceCanBeStarted && attendanceCanBeStarted.id === attendance.id && !attendanceInProgress &&
                          <Button onClick={() => props.startAttendance(attendance)}>Începe cursul</Button>
                          }
                          {attendanceCanBeStarted && attendanceCanBeStarted.id > attendance.id && (
                              <span>{attendance.attended} / {attendance.total} ( {Math.round(attendance.attended / attendance.total * 100)}% )</span>
                          )}
                          {attendanceCanBeStarted && attendanceCanBeStarted.id <= attendance.id && (
                              <Button style={{ marginLeft: '7px' }} type="danger" onClick={() => props.deleteAttendance(attendance)}>Șterge</Button>
                          )}
                          {attendanceInProgress && attendance.id === attendanceInProgress.id && (
                              <Button style={{ marginLeft: '7px' }} onClick={() => props.stopAttendance(attendance)}>Încheie cursul</Button>
                          )}
                      </div>

                  </List.Item>
              )}
          />

          <AddAttendance onClick={props.createAttendance} />
      </>
    );
};

export default TeacherCourseDetailsContent;