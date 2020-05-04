import React, {useEffect, useState} from "react";
import {message, Modal} from "antd";
import {CourseAttendance, CourseDetails} from "../../../shared/course/model/course.model";
import TeacherCourseDetailsContent from "../presentational/TeacherCourseDetailsContent";
import AddTeacherModal from "../presentational/AddTeacherModal";
import {useDispatch} from "react-redux";
import {
    addTeacher,
    createAttendance,
    deleteAttendance,
    toggleCourseAttendance
} from "../../../shared/course/state/course.actions";
import {useTypedSelector} from "../../../shared/state/utils";
import AddAttendanceModal from "../presentational/AddAttendanceModal";
import {TriggerCallback} from "../../../shared/utils";
import {ExclamationCircleOutlined} from "@ant-design/icons/lib";

function showDangerConfirm(onConfirm: TriggerCallback, title: string) {
    Modal.confirm({
        title: `Ești sigur că vrei sa ștergi "${title}"?`,
        icon: <ExclamationCircleOutlined />,
        content: 'Aceasta acțiune nu este reversibilă.',
        okText: 'Sunt sigur.',
        okType: 'danger',
        cancelText: 'Înapoi',
        onOk: onConfirm
    });
}

export interface TeacherCourseDetailsContentContainerProps {
    course: CourseDetails;
}

const TeacherCourseDetailsContentContainer: React.FC<TeacherCourseDetailsContentContainerProps> = ({ course }) => {
    const [total, setTotal] = useState(0);
    const [attended, setAttended] = useState(0);
    const [addTeacherModalVisible, setAddTeacherModalVisible] = useState(false);
    const [addAttendanceModalVisible, setAddAttendanceModalVisible] = useState(false);
    const dispatch = useDispatch();
    const { addTeacherError, toggleCourseAttendanceError, deleteAttendanceError, createAttendanceError } = useTypedSelector(state => state.course);

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

    useEffect(() => {
        if (toggleCourseAttendanceError) {
            message.error('Nu s-a putut porni / opri prezenta cursului.');
        }

    }, [toggleCourseAttendanceError]);

    useEffect(() => {
        if (deleteAttendanceError) {
            message.error('Nu s-a putut șterge prezența.');
        }

    }, [deleteAttendanceError]);


    useEffect(() => {
        if (createAttendanceError) {
            message.error('Nu s-a putut crea prezența.');
        }

    }, [createAttendanceError]);

    const onOpenAddTeacherModal = () => {
        setAddTeacherModalVisible(true);
    };

    const onToggleAttendance = (attendance: CourseAttendance) => {
        dispatch(toggleCourseAttendance({ courseId: course.id, attendanceId: attendance.id, start: !attendance.open }));
    };

    const onAddTeacher = (email: string) => {
        dispatch(addTeacher({ id: course.id, email }));
        setAddTeacherModalVisible(false);
    };

    const onCloseAddTeacherModal = () => {
        setAddTeacherModalVisible(false);
    };

    const onOpenAddAttendanceModal = () => {
      setAddAttendanceModalVisible(true);
    };

    const onAddAttendance = (title: string) => {
        dispatch(createAttendance({ courseId: course.id, title }));
        setAddAttendanceModalVisible(false);
    };

    const onCloseAddAttendanceModal = () => {
        setAddAttendanceModalVisible(false);
    };

    const onDeleteAttendance = (attendance: CourseAttendance) => {
        showDangerConfirm(() => {
            dispatch(deleteAttendance(attendance.id));
        }, attendance.title);
    };

    return <>
        <TeacherCourseDetailsContent
            attendances={course.attendances}
            attended={attended}
            total={total}
            addTeacher={onOpenAddTeacherModal}
            startAttendance={onToggleAttendance}
            canAddTeacher={course.teachers.length < 3}
            stopAttendance={onToggleAttendance}
            createAttendance={onOpenAddAttendanceModal}
            deleteAttendance={onDeleteAttendance}
        />
        <AddTeacherModal onAdd={onAddTeacher} onCancel={onCloseAddTeacherModal} visible={addTeacherModalVisible}/>
        <AddAttendanceModal onAdd={onAddAttendance} onCancel={onCloseAddAttendanceModal} visible={addAttendanceModalVisible}/>
    </>;
};

export default TeacherCourseDetailsContentContainer;