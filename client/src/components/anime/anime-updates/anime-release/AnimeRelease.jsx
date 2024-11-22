import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import MyMainButton from "../../../../utils/buttons/main-button/MyMainButton";
import {NavLink} from "react-router-dom";
import {ANIME_PAGE_ROUTE, ANIME_SEARCH_ROUTE} from "../../../../utils/consts";
import "./animerelease.css"
import {Context} from "../../../../index";
import AnimeService from "../../../../services/AnimeService";

const AnimeRelease = () => {
    const [anime, setAnime] = useState([])
    const {animeStore} = useContext(Context)

    useEffect(() => {
        async function getAnime() {
            try {
                const response = await AnimeService.fetchAnime(0, 1000)
                setAnime(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        getAnime()
    }, [])

    const takeYear = (date) => {
        const year = new Date(date).getFullYear()
        return year
    }

    const calcEnding = (num) => {
        const lastDigit = num % 10;
        const lastTwoDigits = num % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return 'Эпизодов';
        }

        if (lastDigit === 1) {
            return 'Эпизод';
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'Эпизода';
        }

        return 'Эпизодов';
    }

    console.log(anime);

    return (
        <div className={`anime-release`}>
            <div className="anime-release__list">
                {anime.map(item =>
                    <div key={item.id} className="anime-release__list-item">
                        <NavLink to={`${ANIME_PAGE_ROUTE}/${item.id}`}>
                            <div className="anime-release__list-item__img">
                                <img src={process.env.REACT_APP_API_URL + item.img} alt={`${item.title}`}/>
                            </div>
                            <div className="anime-release__list-item__info">
                                <div className="anime-release__list-item__info-episodes">
                                    {item.episodes + ` ${calcEnding(item.episodes)}`}
                                </div>
                                <div className="anime-release__list-item__info-year">
                                    {takeYear(item.anime_release.releaseFrom)}
                                </div>
                                <div className="anime-release__list-item__info-title">
                                    <div className="genres">
                                        {item.anime_genre_titles.map(genre => genre.animeGenre).join(", ")}
                                    </div>
                                    <div className="title-wrapper" title={item.title}>
                                        <div className="title">
                                            {item.title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                )}
            </div>
            <div className="anime-release__all-anime">
                <button className="anime-release__all-anime__button">
                    Всё аниме
                </button>
            </div>
        </div>
    );
};

export default observer(AnimeRelease);