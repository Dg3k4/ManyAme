import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
import {Context} from "../index";
import NavBar from "./navbar/NavBar";
import "./app.css"
import Footer from "./footer/Footer";
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

function App() {
    const {userStore} = useContext(Context)

    useEffect(() => {
        if(localStorage.getItem("token")) {
            userStore.checkAuth()
        }
    }, [userStore])

    return (
        <BrowserRouter>
            <div className="app">
                <div className="app__back"></div>
                <NavBar/>
                <div className="app__content">
                    <SimpleBar style={{height: "calc(100vh - 70px)"}}>
                        <AppRouter/>
                        <Footer/>
                    </SimpleBar>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default observer(App);
