import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from "react-router-dom";
import {ANIME_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import "./login.css"
import MySearchInput from "../../utils/input/MySearchInput";
import MyMainButton from "../../utils/buttons/main-button/MyMainButton";
import MyInput from "../../utils/input/MyInput";

const LoginForm = () => {
    const [nameEmail, setNameEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const {userStore} = useContext(Context)
    const history = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nameEmail && password) {
            userStore.login(nameEmail, nameEmail, password);
            history(ANIME_ROUTE)
        } else {
            console.error("Name/Email and password are required");
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="login-form">
                <MyInput
                    type="text"
                    placeholder="Ник или Почта"
                    onChange={e => setNameEmail(e.target.value)}
                    value={nameEmail}
                />
                <MyInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Пароль"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    content={
                        <div
                            className="eye-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ?
                                <i className="fa-regular fa-eye-slash"></i>
                                :
                                <i className="fa-regular fa-eye"></i>
                            }
                        </div>
                    }
                />
                <div className="login-form__buttons">
                    <div className="login-form__button">Без аккаунта? <NavLink className="navlink" to={REGISTRATION_ROUTE}>Тогда жми!</NavLink></div>
                    <MyMainButton text="Войти" className="login-form__button" type="submit"></MyMainButton>
                </div>
            </form>
        </div>
    );
};

export default observer(LoginForm);