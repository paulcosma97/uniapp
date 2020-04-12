import React, {useEffect} from "react";
import {ShortUser, UserCredentials} from "../../../shared/user/model/user.model";
import {useDispatch} from "react-redux";
import {registerUser} from "../../../shared/user/state/user.actions";
import {useTypedSelector} from "../../../shared/state/utils";
import {Redirect} from "react-router-dom";
import RegisterForm from "../presentational/RegisterForm";
import {message} from "antd";

type RegistrationData = ShortUser & UserCredentials;
const RegisterContainer: React.FC = () => {
    const dispatch = useDispatch();
    const registrationError = useTypedSelector(state => state.user.register.error);

    const onSubmit = (data: RegistrationData) => {
        dispatch(registerUser(data));
    };

    useEffect(() => {
        if (registrationError) {
            message.error('Înregistrarea a eșuat!')
        }
    }, [registrationError]);

    if (registrationError === false) {
        return <Redirect to="/login" />
    }

    return <RegisterForm
        onSubmit={onSubmit}
    />
};

export default RegisterContainer;