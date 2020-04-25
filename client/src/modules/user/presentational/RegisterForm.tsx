import React from "react";
import {ShortUser, UserCredentials} from "../../../shared/user/model/user.model";
import {Button, Col, Form, Input, Select} from "antd";
import {TriggerCallback} from "../../../shared/utils";

export interface RegisterFormProps {
    onSubmit: TriggerCallback<ShortUser & UserCredentials>
}

const RegisterForm: React.FC<RegisterFormProps> = props => (
    <Form onFinish={props.onSubmit as any} initialValues={{ role: 'student' }}>
        <Form.Item
            label="Prenume"
            name="firstName"
            rules={[
                { required: true, message: 'Este necesar.' },
                { min: 3, message: 'Prenumele tău trebuie să aibă cel puțin 3 caractere.' }
            ]}>
            <Input />
        </Form.Item>

        <Form.Item
            label="Nume"
            name="lastName"
            rules={[
                { required: true, message: 'Este necesar.' },
                { min: 3, message: 'Numele tău trebuie să aibă cel puțin 3 caractere.' }
            ]}>
            <Input />
        </Form.Item>

        <Form.Item
            label="Email"
            name="email"
            rules={[
                { required: true, message: 'Este necesar.' },
                { pattern: /\S+@\S+\.\S+/, message: 'Scrie o adresă de email validă.' }
            ]}>
            <Input />
        </Form.Item>

        <Form.Item
            label="Parolă"
            name="password"
            rules={[
                { required: true, message: 'Este necesar.' },
                { min: 6, message: 'Parola este prea scurtă.' }
            ]}>
            <Input.Password />
        </Form.Item>

        <Form.Item name="role" label="Mă înregistrez ca" rules={[{ required: true }]}>
            <Select
                placeholder="Sunt profesor / sunt student"
            >
                <Select.Option value="student">Student</Select.Option>
                <Select.Option value="teacher">Profesor</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item>
            <Col span={12} offset={6}>
                <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                    Înregistrare
                </Button>
            </Col>
        </Form.Item>
    </Form>
);

export default RegisterForm;