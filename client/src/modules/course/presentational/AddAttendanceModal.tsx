import React, {useEffect} from "react";
import {Form, Input, Modal} from "antd";
import {TriggerCallback} from "../../../shared/utils";

export interface AddAttendanceModalProps {
    onAdd: TriggerCallback<string>;
    onCancel: TriggerCallback;
    visible: boolean;
}

const AddAttendanceModal: React.FC<AddAttendanceModalProps> = ({ onAdd, onCancel, visible }) => {
    const formRef = React.createRef<any>();

    const onOK = () => {
        formRef.current.submit();
    };

    useEffect(() => {
        if (!visible && formRef.current) {
            formRef.current.resetFields(['title']);
        }
    }, [formRef, visible]);

    return (
        <Modal
            title="Adaugă o prezență..."
            visible={visible}
            onOk={onOK}
            onCancel={onCancel}
            okText="Adaugă"
            cancelText="Anulează"
        >
            <Form onFinish={form => onAdd(form.title)} ref={formRef}>
                <Form.Item
                    label="Titlul prezenței:"
                    name="title"
                    rules={[
                        { required: true, message: 'Titlul prezenței este necesar.' },
                        { min: 4, message: 'Titlul prezenței este prea scurt.' },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddAttendanceModal;