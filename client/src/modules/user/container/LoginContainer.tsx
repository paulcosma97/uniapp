import React, {useEffect} from "react";
import LoginForm from "../presentational/LoginForm";
import {UserCredentials} from "../../../shared/user/model/user.model";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../shared/user/state/user.actions";
import {useTypedSelector} from "../../../shared/state/utils";
import { Redirect } from "react-router-dom";
import {message} from "antd";

const LoginContainer: React.FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useTypedSelector(state => !!state.user.data);
    const isError = useTypedSelector(state => state.user.login.error);

    const onSubmit = (credentials: UserCredentials) => {
        dispatch(loginUser(credentials));
    };

    useEffect(() => {
        if (isError) {
            message.error('Autentificarea a esuat!');
        }
    }, [isError]);

    if (isLoggedIn) {
        return <Redirect to="/profile" />
    }

    return <LoginForm
        onSubmit={onSubmit}
    />
};

export default LoginContainer;