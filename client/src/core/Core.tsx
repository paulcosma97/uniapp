import React from "react";
import {useDispatch} from "react-redux";
import {Router} from "./router/Router";
import {loadUser} from "../shared/user/state/user.actions";

const Core: React.FC = () => {
    const dispatch = useDispatch();

    dispatch(loadUser());

    return (
        <Router />
    );
};

export default Core;