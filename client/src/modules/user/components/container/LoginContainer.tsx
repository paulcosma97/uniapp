import React from "react";
import LoginForm from "../presentational/LoginForm";
import {useForm} from "react-hook-form";
import {UserCredentials} from "../../../../shared/user/model/user.model";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../../shared/user/state/user.actions";
import {useTypedSelector} from "../../../../shared/state/utils";
import { Redirect } from "react-router-dom";

const LoginContainer: React.FC = () => {
    const { register, errors, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const invalidCredentials = useTypedSelector(state => state.user.login.error);
    const isLoggedIn = useTypedSelector(state => !!state.user.data);

    const onSubmit = (credentials: UserCredentials) => {
        dispatch(loginUser(credentials));
    };

    if (isLoggedIn) {
        return <Redirect to="/home" />
    }

    return <LoginForm
        errors={errors as any}
        refs={{
            email: register({
                required: { value: true, message: 'Please type your email.' },
                pattern: { value: /\S+@\S+\.\S+/, message: 'Please type a valid email.' }
            }),
            password: register({
                required: { value: true, message: 'Please type your password.' },
                minLength: { value: 5, message: 'Your password is too short.' }
            })
        }}
        handleSubmit={handleSubmit(onSubmit as any)}
        invalidCredentials={invalidCredentials}
    />
};

export default LoginContainer;