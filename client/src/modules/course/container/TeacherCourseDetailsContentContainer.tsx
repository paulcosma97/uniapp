import React, {useEffect, useState} from "react";
import {message} from "antd";
import {CourseAttendance, CourseDetails} from "../../../shared/course/model/course.model";
import TeacherCourseDetailsContent from "../presentational/TeacherCourseDetailsContent";
import AddTeacherModal from "../presentational/AddTeacherModal";
import {useDispatch} from "react-redux";
import {addTeacher, toggleCourseAttendance} from "../../../shared/course/state/course.actions";
import {useTypedSelector} from "../../../shared/state/utils";

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

    }, [addTeacherError]);

    const onOpenAddTeacherModal = () => {
        setModalVisible(true);
    };

    const onStartAttendance = (attendance: CourseAttendance) => {
        dispatch(toggleCourseAttendance({ courseId: course.id, attendanceId: attendance.id, start: !attendance.open }));
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