import React from "react";
import ErrorLabel from "../../../../shared/components/form/error-label/ErrorLabel";
import Alert from "react-bootstrap/Alert";
import BaseFormProps from "../../../../shared/components/form/model/BaseFormProps";

export interface RegisterFields {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export type RegisterFormProps = BaseFormProps<RegisterFields>

const RegisterForm: React.FC<RegisterFormProps> = props => (
    <form className="form-group mt-2" onSubmit={props.handleSubmit}>

        <label htmlFor="firstName" className="mb-0">First Name:</label>
        <input type="text" className="form-control" name="firstName" id="firstName" ref={props.refs.firstName}/>
        {props.errors.firstName
            && <ErrorLabel text={props.errors.firstName.message}/> }

        <label htmlFor="lastName" className="mt-2 mb-0">Last Name:</label>
        <input type="text" className="form-control" name="lastName" id="lastName" ref={props.refs.lastName}/>
        {props.errors.lastName
            && <ErrorLabel text={props.errors.lastName.message}/> }

        <label htmlFor="email" className="mt-2 mb-0">Email:</label>
        <input type="email" className="form-control" name="email" id="email" ref={props.refs.email}/>
        {props.errors.email
            && <ErrorLabel text={props.errors.email.message}/> }

        <label className="mt-2 mb-0" htmlFor="password">Password:</label>
        <input type="password" className="form-control" name="password" id="password" ref={props.refs.password}/>
        {props.errors.password
            && <ErrorLabel text={props.errors.password.message}/> }

        <div className="row">
            <input type="submit" className="btn btn-primary mt-3 col-8 mx-auto" value="Register" />
        </div>

        { props.submitFailed
            && <Alert variant="danger" className="mt-3 text-center">Incorrect email or password!</Alert> }
    </form>
);

export default RegisterForm;