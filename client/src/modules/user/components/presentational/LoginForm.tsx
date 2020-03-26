import React from "react";
import ErrorLabel from "../../../../shared/components/form/error-label/ErrorLabel";
import Alert from "react-bootstrap/Alert";
import BaseFormProps from "../../../../shared/components/form/model/BaseFormProps";

export interface LoginFields<> {
    email: string;
    password: string;
}

export type LoginFormProps = BaseFormProps<LoginFields>;

const LoginForm: React.FC<LoginFormProps> = props => (
    <form className="form-group mt-2" onSubmit={props.handleSubmit}>
        <label htmlFor="email" className="mb-0">Email:</label>
        <input type="email" className="form-control" name="email" id="email" ref={props.refs.email}/>
        {props.errors.email
            && <ErrorLabel text={props.errors.email.message}/> }

        <label className="mt-2 mb-0" htmlFor="email">Password:</label>
        <input type="password" className="form-control" name="password" id="password" ref={props.refs.password}/>
        {props.errors.password
            && <ErrorLabel text={props.errors.password.message}/> }

        <div className="row">
            <input type="submit" className="btn btn-primary mt-3 col-8 mx-auto" value="Login" />
        </div>

        { props.submitFailed
            && <Alert variant="danger" className="mt-3 text-center">Incorrect email or password!</Alert> }
    </form>
);

export default LoginForm;