import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {ANIME_ROUTE} from "../utils/consts";

const AppRouter = () => {
    const {userStore} = useContext(Context)

    return (
        <Routes>
            {userStore.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to={ANIME_ROUTE}/>}/>
        </Routes>
    );
};

export default observer(AppRouter);