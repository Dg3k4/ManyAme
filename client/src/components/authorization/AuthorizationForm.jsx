import React from 'react';
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts";
import "./authorization.css"

const AuthorizationForm = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <div className="authorization">
            <div className="authorization__form">
                {isLogin ?
                    <LoginForm/>
                    :
                    <RegistrationForm/>
                }
            </div>
        </div>
    );
};

export default observer(AuthorizationForm);