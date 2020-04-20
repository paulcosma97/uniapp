import React from "react";
import {Form, Input, Modal} from "antd";

export interface AddCourseModalProps {
    onAdd: (course: string) => any;
    onCancel: () => any;
    visible: boolean;
    forStudent: boolean;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ onAdd, onCancel, visible, forStudent }) => {
    const formRef = React.createRef<any>();

    const addCourse = () => {
        formRef.current.submit();
    };

    return (
        <Modal
            title="Adaugă un curs..."
            visible={visible}
            onOk={addCourse}
            onCancel={onCancel}
            okText="Adaugă"
            cancelText="Anulează"
        >
            <Form onFinish={form => onAdd(form.course)} ref={formRef}>
                <Form.Item
                    label={forStudent ? 'Codul cursului:' : 'Titlul noului curs:'}
                    name="course"
                    rules={[
                        { required: true, message: (forStudent ? 'Codul' : 'Titlul') + ' cursului este necesar.' },
                        { min: 4, message: (forStudent ? 'Codul' : 'Titlul') + ' cursului este prea scurt.' },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCourseModal;