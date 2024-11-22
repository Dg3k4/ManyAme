import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts";
import MySearchInput from "../../utils/input/MySearchInput";
import MyMainButton from "../../utils/buttons/main-button/MyMainButton";
import "./registration.css"
import MyInput from "../../utils/input/MyInput";

const RegistrationForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("")
    const {userStore} = useContext(Context)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && password) {
            userStore.registration(name, email, password);
        } else {
            console.error("Name/Email and password are required");
        }
    }

    return (
        <div className="registration">
            <form onSubmit={handleSubmit} className="registration-form">
                <MyInput
                    type="text"
                    placeholder="Ник"
                    onChange={e => setName(e.target.value)}
                    value={name}
                />
                <MyInput
                    type="email"
                    placeholder="Почта"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
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
                <div className="registration-form__buttons">
                    <div className="registration-form__button">Уже существуешь? <NavLink to={LOGIN_ROUTE}>Тебе сюда</NavLink></div>
                    <MyMainButton className="registration-form__button" type="submit" text="Зарегистрироваться"></MyMainButton>
                </div>
            </form>
        </div>
    );
};

export default observer(RegistrationForm);