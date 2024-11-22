import React, {useContext, useState} from 'react';
import "./mainpage.css"
import "./mainpage-mini.css"
import {Context} from "../../../index";
import AnimeService from "../../../services/AnimeService";
import {observer} from "mobx-react-lite";
import SeasonAnime from "../season-anime/SeasonAnime";
import AnimeUpdates from "../anime-updates/AnimeUpdates";
import AnimeSearchComponent from "../anime-search/AnimeSearchComponent";

const MainPage = () => {
    const [anime, setAnime] = useState([])
    const {animeStore} = useContext(Context)

    async function getAnime() {
        try {
            const response = await AnimeService.fetchAnime()
            setAnime(response.data)
            console.log("Аниме получено успешно!")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="main-page">
            <div className="main-page__container">
                <SeasonAnime/>
                <AnimeUpdates/>
                <AnimeSearchComponent isMain={true}/>
            </div>
        </div>
    );
};

export default observer(MainPage);