import React, {useEffect} from "react";
import LoginForm from "../presentational/LoginForm";
import {UserCredentials} from "../../../shared/user/model/user.model";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../shared/user/state/user.actions";
import {useTypedSelector} from "../../../shared/state/utils";
import {useHistory} from "react-router-dom";
import {message} from "antd";

const LoginContainer: React.FC = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useTypedSelector(state => !!state.user.data);
    const isError = useTypedSelector(state => state.user.login.error);
    const history = useHistory();

    const onSubmit = (credentials: UserCredentials) => {
        dispatch(loginUser(credentials));
    };

    useEffect(() => {
        if (isError) {
            message.error('Autentificarea a esuat!');
        }
    }, [isError]);

    useEffect(() => {
        if (isLoggedIn) {
            history.push('/courses');
        }
    }, [isLoggedIn]);

    return <LoginForm
        onLogin={onSubmit}
    />
};

export default LoginContainer;