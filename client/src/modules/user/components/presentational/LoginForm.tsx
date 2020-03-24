import React, {LegacyRef} from "react";
import ErrorLabel from "../../../../shared/components/form/error-label/ErrorLabel";
import Alert from "react-bootstrap/Alert";

export interface LoginFields<T = any> {
    email: T;
    password: T;
}

export interface LoginFormProps {
    errors: LoginFields<{ message: string }>;
    refs: LoginFields<LegacyRef<HTMLInputElement>>;
    handleSubmit: (...args: any) => any;
    invalidCredentials: boolean;
}

const LoginForm: React.FC<LoginFormProps> = props => (
    <form className="form-group mt-2" onSubmit={props.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" className="form-control" name="email" id="email" ref={props.refs.email}/>
        {props.errors.email
            && <ErrorLabel text={props.errors.email.message}/> }

        <label className="mt-2" htmlFor="email">Password:</label>
        <input type="password" className="form-control" name="password" id="password" ref={props.refs.password}/>
        {props.errors.password
            && <ErrorLabel text={props.errors.password.message}/> }

        <div className="row">
            <input type="submit" className="btn btn-primary mt-3 col-8 mx-auto" value="Login" />
        </div>

        { props.invalidCredentials
            && <Alert variant="danger" className="mt-3 text-center">Incorrect email or password!</Alert> }
    </form>
);

export default LoginForm;