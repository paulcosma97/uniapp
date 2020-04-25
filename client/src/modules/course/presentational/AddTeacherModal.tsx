import React, {useEffect} from "react";
import {Form, Input, Modal} from "antd";
import {TriggerCallback} from "../../../shared/utils";

export interface AddTeacherModalProps {
    onAdd: TriggerCallback<string>;
    onCancel: TriggerCallback;
    visible: boolean;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({ onAdd, onCancel, visible }) => {
    const formRef = React.createRef<any>();

    const addTeacher = () => {
        formRef.current.submit();
    };

    useEffect(() => {
        if (!visible && formRef.current) {
            formRef.current.resetFields(['value']);
        }
    }, [formRef, visible]);

    return (
        <Modal
            title="Adaugă un curs..."
            visible={visible}
            onOk={addTeacher}
            onCancel={onCancel}
            okText="Adaugă"
            cancelText="Anulează"
        >
            <Form onFinish={form => onAdd(form.value)} ref={formRef}>
                <Form.Item
                    label="Emailul profesorului"
                    name="value"
                    rules={[
                        { required: true, message:  'Emailul profesorului este necesar.' },
                        { pattern: /\S+@\S+\.\S+/, message: 'Scrie o adresă de email validă.' }
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddTeacherModal;