import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import "./animepagecomponent.css"
import {Context} from "../../../index";
import {useParams} from "react-router-dom";
import AnimeService from "../../../services/AnimeService";

const AnimePageComponent = () => {
    const [anime, setAnime] = useState({info: []})
    const [isOpenSubTitle, setIsOpenSubTitle] = useState(false)
    const {animeStore} = useContext(Context)
    const {animeId} = useParams()

    useEffect(() => {
        try {
            async function oneAnime() {
                await AnimeService.giveOneAnime(animeId).then(data => setAnime(data.data))
            }
            oneAnime()
        } catch (e) {
            console.error(e)
        }
    }, [])
    console.log(anime)

    const subTitleHandler = () => {
        setIsOpenSubTitle(!isOpenSubTitle)
    }

    return (
        <div className="anime-page">
            <div className="anime-page__container">
                <div className="anime-page__container-up">
                    <div className="anime-page__container-up__left">
                        <div className="anime-img">
                            <div className="anime-img__rating">
                                <svg width="122" height="50" viewBox="-1 -4 12 5">
                                    <path d="M 0 0 L 0 1 L -1 0 L -1 -4 L 10 -4 L 8 -2 L 10 0 Z" />
                                </svg>
                                <div className="anime-img__rating-value">
                                    <i className="fa-solid fa-star"></i>
                                    <span>{anime?.rating}</span>
                                </div>
                            </div>
                            <img src={(process.env.REACT_APP_API_URL + anime?.img) || ""}/>
                        </div>
                    </div>
                    <div className="anime-page__container-up__right">
                        <div className="titles-rating-info">
                            <div className="name">
                                <span>{anime?.title}</span>
                                <div className="sub-names">
                                    <span className="sub-names__item">{anime?.subTitles?.slice(0, 1)}</span>
                                </div>
                            </div>
                            <div className="set-rating">
                                <div className="set-rating-star">
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="table-info">

                        </div>
                    </div>
                </div>
                <div className="anime-page__container-mid">

                </div>
                <div className="anime-page__container-down">

                </div>
            </div>
        </div>
    );
};

export default observer(AnimePageComponent);