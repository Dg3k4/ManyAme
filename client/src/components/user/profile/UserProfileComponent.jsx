import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import "./userprofilecomponent.css"
import userAvatar from '../../../assets/base-avatars/user-avatar-test.png';
import {Context} from "../../../index";

const UserProfileComponent = () => {
    const {userStore} = useContext(Context);

    const isAvatar = true

    return (
        <div className="user-profile">
            <div className="user-profile__container">
                <div className="user-profile__container-up">
                    <div className="user-profile__container-up__avatar">
                        { isAvatar ?
                            <img src={userAvatar} alt=""/>
                            :
                            <svg width="100" height="100" viewBox="-7 -13 14 13" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                                <path d="M 0 0 L -7 0 C -7 0 -7 -4 0 -4 C 7 -4 7 0 7 0 L 0 0 Z M 0 -6 A 1 1 0 0 0 0 -13 A 1 1 0 0 0 0 -6 Z"/>
                            </svg>
                        }
                    </div>
                    <div className="user-profile__container-up__table">
                        <div className="user-name">
                            {userStore.user.name}
                        </div>
                        <div className="user-stats">
                            Статы
                        </div>
                    </div>
                </div>
                <div className="user-profile__container-down">
                    <div className="user-profile__container-down__switcher">

                    </div>
                    <div className="user-profile__container-down__content">
                        <div className="user-profile__container-down__content-table">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(UserProfileComponent);