import React, {useEffect, useState} from "react";
import {CourseList} from "../presentational/CourseList";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../shared/state/utils";
import {
    createCourse,
    delistCourse,
    enlistCourse,
    loadAllCourses,
    removeCourse
} from "../../../shared/course/state/course.actions";
import LoadingSpinner from "../../../shared/components/spinner/LoadingSpinner";
import Course from "../../../shared/course/model/course.model";
import {useHistory} from "react-router-dom";
import AddCourseModal from "../presentational/AddCourseModal";
import {UserRole} from "../../../shared/user/model/user.model";
import {message, Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons/lib";
import {TriggerCallback} from "../../../shared/utils";

function showDangerConfirm(onConfirm: TriggerCallback) {
    Modal.confirm({
        title: 'Ești sigur?',
        icon: <ExclamationCircleOutlined />,
        content: 'Dacă ștergi acest curs, îți vei pierde toate datele.',
        okText: 'Sunt sigur.',
        okType: 'danger',
        cancelText: 'Înapoi',
        onOk: onConfirm
    });
}

export const CourseListContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { items: courses, loading } = useTypedSelector(state => state.course.courses);
    const history = useHistory();
    const [ modalVisible, setModalVisible ] = useState(false);
    const user = useTypedSelector(state => state.user.data);
    const { removeCourseError, addCourseError } = useTypedSelector(state => state.course);

    const onCourseClick = (course: Course) => {
        history.push('/courses/' + course.id)
    };

    const onCourseDelete = (course: Course) => {
        showDangerConfirm(() => {
            if (user!.role === UserRole.STUDENT) {
                dispatch(delistCourse({ id: course.id, student: user!.id }))
            } else {
                dispatch(removeCourse(course.id));
            }
        });
    };

    const onTriggerCourseModal = () => {
        setModalVisible(true);
    };

    const onAddCourse = (course: string) => {
        setModalVisible(false);

        if (user!.role === UserRole.STUDENT) {
            dispatch(enlistCourse(course))
        } else {
            dispatch(createCourse(course));
        }
    };

    const onDismissModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        dispatch(loadAllCourses());
    }, [dispatch]);

    useEffect(() => {
        if (addCourseError) {
            if (user!.role === UserRole.STUDENT) {
                message.error('Nu s-a găsit un curs cu acest cod.');
            } else {
                message.error('Nu s-a putut creea cursul.')
            }
        }
    }, [addCourseError, user]);

    useEffect(() => {
        if (removeCourseError) {
            message.error('Nu s-a putut șterge acest curs.');
        }
    }, [removeCourseError]);

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <>
            <CourseList onAddCourse={onTriggerCourseModal} onCourseClick={onCourseClick} onCourseDelete={onCourseDelete} courses={courses} />
            <AddCourseModal forStudent={true} onAdd={onAddCourse} onCancel={onDismissModal} visible={modalVisible}/>
        </>
    )
};