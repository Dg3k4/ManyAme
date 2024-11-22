import React, {useContext, useEffect, useState} from 'react';
import "./navbar.css"
import "./navbar-mini.css"
import useMouseMoveEffect from "../../hooks/useMouseMoveEffect";
import MySearchInput from "../../utils/input/MySearchInput";
import {NavLink, useNavigate} from "react-router-dom";
import {ANIME_ROUTE, ANIME_SEARCH_ROUTE, LOGIN_ROUTE, USER_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const NavBar = () => {
    const [isActive, setIsActive] = useState(false)
    const [isPress, setIsPress] = useState(false)
    const [isLightTheme, setIsLightTheme] = useState(false)
    const [isSearch, setIsSearch] = useState('')
    const {userStore, animeStore} = useContext(Context)
    const history = useNavigate()
    const containerRef = useMouseMoveEffect()

    const onExitClick = () => {
        userStore.logout()
        toggleMenu()
    }

    function switchTheme() {
        const root = document.getElementById("root");

        if (isLightTheme) {
            root.style.setProperty('--background-color-main', '#D4D4D4');
            root.style.setProperty('--background-color-main-lighter', '#b9b9b9');
            root.style.setProperty('--outline-color', '#191919');
            root.style.setProperty('--text-color', '#121212');
            root.style.setProperty('--text-color-darker', '#191919');
            root.style.setProperty('--placeholder-color', '#323232');

        } else {
            root.style.setProperty('--background-color-main', '#121212');
            root.style.setProperty('--background-color-main-lighter', '#191919');
            root.style.setProperty('--outline-color', '#323232');
            root.style.setProperty('--text-color', '#D4D4D4');
            root.style.setProperty('--text-color-darker', '#C8C8C8');
            root.style.setProperty('--placeholder-color', '#D4D4D499');
        }
    }

    useEffect(() => {
        switchTheme()
    }, [isLightTheme])

    const toggleMenu = () => {
        setIsActive(!isActive)
        setIsPress(true)
    }

    const stopPropagation = (e) => {
        e.stopPropagation()
    }

     const toggleTheme = () => {
        setIsLightTheme(!isLightTheme)
    }

    return (
        <div className="navbar" ref={containerRef}>
            <button onClick={() => toggleTheme()} className={`navbar__content__change-theme-scale ${isLightTheme ? "navbar__content__change-theme-light" : "navbar__content__change-theme"}`}>
                <div className={`${isLightTheme ? "navbar__content__change-theme-light-icon-sun" : "navbar__content__change-theme-icon-sun"}`}>
                    <i className="fa-solid fa-brightness"></i>
                </div>
                <div className={`${isLightTheme ? "navbar__content__change-theme-light-icon-moon" : "navbar__content__change-theme-icon-moon"}`}>
                    <i className="fa-solid fa-moon"></i>
                </div>
            </button>
            <div className="navbar__content">
                <NavLink to={ANIME_ROUTE} className="navbar__content__left">
                    <div className="navbar__content__logo-container">
                        <div className="navbar__content__logo">ManyAme</div>
                    </div>
                </NavLink>
                <div className="navbar__content__right">
                    <MySearchInput type="text" placeholder="Чего ищем?" onChange={(e) => setIsSearch(e.target.value)} value={isSearch}/>
                    <div className="navbar__content__menu">
                        <div onClick={toggleMenu} className="navbar__content__menu-container">
                            <svg className="navbar__content__menu-container-icon" xmlns="http://www.w3.org/2000/svg" fill={`${isLightTheme ? "#323232" : "#D4D4D499"}`} height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true">
                                <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
                            </svg>
                        </div>
                        <div className={`navbar__content__menu-content__wrapper ${isPress ? `${isActive ? "open" : "close"}` : ""}`}>
                            <div className="navbar__content__menu-content">
                                { userStore.isAuth ?
                                    <NavLink className="navbar__content__menu-content__field" onClick={onExitClick} to={ANIME_ROUTE}>Выйти</NavLink>
                                    :
                                    <NavLink className="navbar__content__menu-content__field" to={LOGIN_ROUTE}>Войти</NavLink>
                                }
                                { userStore.isAuth ?
                                    <NavLink className="navbar__content__menu-content__field" to={USER_ROUTE}>Профиль</NavLink>
                                    :
                                    null
                                }
                                <NavLink className="navbar__content__menu-content__field" to={ANIME_SEARCH_ROUTE}>Аниме</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(NavBar);