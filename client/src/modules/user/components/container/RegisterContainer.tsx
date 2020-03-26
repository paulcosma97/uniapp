import React from "react";
import {useForm} from "react-hook-form";
import {ShortUser, UserCredentials} from "../../../../shared/user/model/user.model";
import {useDispatch} from "react-redux";
import {registerUser} from "../../../../shared/user/state/user.actions";
import {useTypedSelector} from "../../../../shared/state/utils";
import {Redirect} from "react-router-dom";
import RegisterForm from "../presentational/RegisterForm";

type RegistrationData = ShortUser & UserCredentials;
const RegisterContainer: React.FC = () => {
    const { register, errors, handleSubmit } = useForm<RegistrationData>();
    const dispatch = useDispatch();
    const registrationError = useTypedSelector(state => state.user.register.error);

    const onSubmit = (data: RegistrationData) => {
        dispatch(registerUser(data));
    };

    if (registrationError === false) {
        return <Redirect to="/login" />
    }

    return <RegisterForm
        errors={errors as any}
        refs={{
            email: register({
                required: { value: true, message: 'Please type your email.' },
                pattern: { value: /\S+@\S+\.\S+/, message: 'Please type a valid email.' }
            }),
            password: register({
                required: { value: true, message: 'Please type your password.' },
                minLength: { value: 5, message: 'Your password is too short.' }
            }),
            firstName: register({
                required: { value: true, message: 'Please type your first name.' },
                minLength: { value: 3, message: 'Your first name is too short.' }
            }),
            lastName: register({
                required: { value: true, message: 'Please type your last name.' },
                minLength: { value: 3, message: 'Your last name is too short.' }
            }),
        }}
        handleSubmit={handleSubmit(onSubmit)}
        submitFailed={!!registrationError}
    />
};

export default RegisterContainer;