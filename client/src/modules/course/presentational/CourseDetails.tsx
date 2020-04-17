import React from "react";
import * as Course from "../../../shared/course/model/course.model";
import './CourseDetails.css';
import {Avatar, Button, Col, List, Progress, Row} from "antd";
import User from "../../../shared/user/model/user.model";
import {CourseAttendance} from "../../../shared/course/model/course.model";
import { SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';

export interface CourseDetailsProps {
    course: Course.CourseDetails;
    forStudent: boolean;
}

const DidAttendIcon: any = SmileOutlined;
const DidNotAttendIcon: any = FrownOutlined;
const CanStillAttendIcon: any = MehOutlined;

const mapTeacherHeader = (user: User) => (
    <Col span={8} className="teacher-header-item" key={user.id}>
        <Avatar style={{ backgroundColor: '#00a2ae', verticalAlign: 'middle' }} size="large">
            {[user.firstName, user.lastName].map(word => word[0].toUpperCase()).join('')}
        </Avatar>
        <p>{user.firstName} {user.lastName}</p>
    </Col>
);

const AttendanceIcon: React.FC<{ didAttend: boolean; available: boolean }> = ({ didAttend, available }) => {
    if (didAttend) {
        return <DidAttendIcon style={{ fontSize: '1.5em', color: '#3CB371' }} />;
    }

    if (available) {
        return <CanStillAttendIcon style={{ fontSize: '1.5em', color: '#a0a0a0' }} />
    }

    return <DidNotAttendIcon style={{ fontSize: '1.5em', color: '#FF6347' }} />;
};

const AttendanceProgress: React.FC<{ attendances: CourseAttendance[] }> = ({ attendances }) => {
    const attended = attendances.filter(attendance => attendance.didAttend).length;
    const total = attendances.length;

    return (
        <div className="align-center">
            <Progress
                type="circle"
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={Math.floor(attended / total * 10000) / 100}
                format={() => attended + ' / ' + total}
            />
        </div>
    )
};

const AttendButton: React.FC = () => (
    <Row justify="center" className="attend-button-wrapper">
        <Button type="primary" ghost icon={<DidAttendIcon style={{ fontSize: '1.3em' }} />} size="large">
            Sunt Prezent!
        </Button>
    </Row>
);

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, forStudent }) => (
    <div className="course-details">
        <h3 className="align-center">{course.title}</h3>

        <Row justify="center" className="teacher-header">
            {course.teachers.map(mapTeacherHeader)}
        </Row>

        <h4 className="align-center">Prezențe</h4>

        {forStudent && <AttendanceProgress attendances={course.attendances} />}

        {forStudent && <AttendButton />}

        <List
            itemLayout="horizontal"
            dataSource={course.attendances}
            renderItem={attendance => (
                <List.Item>
                    <AttendanceIcon didAttend={attendance.didAttend} available={attendance.available}/>
                    <span>{attendance.title}</span>
                </List.Item>
            )}
        />

    </div>
);

export default CourseDetails;