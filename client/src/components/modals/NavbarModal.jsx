import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import "./navbarmodal.css"
import {Context} from "../../index";
import {NavLink} from "react-router-dom";
import {ANIME_ROUTE, ANIME_SEARCH_ROUTE, LOGIN_ROUTE, USER_ROUTE} from "../../utils/consts";

const NavbarModal = ({isModalActive, isPress, toggleMenu}) => {
    const {userStore} = useContext(Context)

    const onExitClick = () => {
        userStore.logout()
        toggleMenu()
    }

    return (
        <div className="navbar-modal__spacer">

        </div>
    );
};

export default observer(NavbarModal);