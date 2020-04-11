import React from "react";
import {Button, Checkbox, Col, Form, Input} from "antd";
import {UserCredentials} from "../../../../shared/user/model/user.model";

export interface LoginFormProps {
    onSubmit: (credentials: UserCredentials) => any;
}

const LoginForm: React.FC<LoginFormProps> = props => (
    <Form
        initialValues={{ remember: true }}
        onFinish={props.onSubmit as any}
    >
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

        <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Ține-mă minte</Checkbox>
        </Form.Item>

        <Form.Item>
            <Col span={12} offset={6}>
                <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                    Logare
                </Button>
            </Col>
        </Form.Item>
    </Form>
);

export default LoginForm;