import React, {useEffect, useState} from "react";
import {Button, List, message, Row} from "antd";
import {CourseDetails} from "../../../shared/course/model/course.model";
import AttendanceProgress from "./AttendanceProgress";
import {TriggerCallback} from "../../../shared/utils";
import TeacherCourseDetailsContent from "./TeacherCourseDetailsContent";
import AddTeacherModal from "./AddTeacherModal";
import {useDispatch} from "react-redux";
import {addTeacher} from "../../../shared/course/state/course.actions";
import {useTypedSelector} from "../../../shared/state/utils";

const AddTeacher: React.FC<{ onClick?: TriggerCallback }> = ({ onClick }) => (
    <Row justify="center" className="attend-button-wrapper">
        <Button onClick={onClick} type="primary" ghost>
            Adaugă Profesor
        </Button>
    </Row>
);


export interface TeacherCourseDetailsContentContainerProps {
    course: CourseDetails;
}

const TeacherCourseDetailsContentContainer: React.FC<TeacherCourseDetailsContentContainerProps> = ({ course }) => {
    const [total, setTotal] = useState(0);
    const [attended, setAttended] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch();
    const addTeacherError = useTypedSelector(state => state.course.addTeacherError);

    useEffect(() => {
        const { attended: computedAttended, total: computedTotal } = course.attendances
            .filter(attendance => !attendance.available)
            .map(attendance => ({ total: attendance.total, attended: attendance.attended }))
            .reduce((acc, next) =>
                ({ total: acc.total + next.total, attended: acc.attended + next.attended }), { total: 0, attended: 0 });

        setAttended(computedAttended);
        setTotal(computedTotal);
    }, [setTotal, setAttended, course.attendances]);

    useEffect(() => {
        if (addTeacherError) {
            message.error('Nu s-a găsit un profesor cu acest email.');
        }

    }, [addTeacherError, message]);

    const onOpenAddTeacherModal = () => {
        setModalVisible(true);
    };

    const onStartAttendance = (attendanceId: number) => {
        console.log('start attendance', attendanceId);
    };

    const onAddTeacher = (email: string) => {
        dispatch(addTeacher({ id: course.id, email }));
        setModalVisible(false);
    };

    const onCloseModal = () => {
        setModalVisible(false);
    };

    return <>
        <TeacherCourseDetailsContent
            attendances={course.attendances}
            attended={attended}
            total={total}
            addTeacher={onOpenAddTeacherModal}
            startAttendance={onStartAttendance}
            canAddTeacher={course.teachers.length < 3}
        />
        <AddTeacherModal onAdd={onAddTeacher} onCancel={onCloseModal} visible={modalVisible}/>
    </>;
};

export default TeacherCourseDetailsContentContainer;