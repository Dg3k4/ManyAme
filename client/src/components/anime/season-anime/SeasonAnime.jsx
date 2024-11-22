import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import "./seasonanime.css"
import "./seasonanime-mini.css"
import {ANIME_PAGE_ROUTE} from "../../../utils/consts";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import AnimeService from "../../../services/AnimeService";

SwiperCore.use([Navigation]);

const SeasonAnime = () => {
    const [anime, setAnime] = useState([])
    const [isArrowLeft, setIsArrowLeft] = useState(false)
    const [isArrowRight, setIsArrowRight] = useState(false)
    const [isPress, setIsPress] = useState(false)

    useEffect(() => {
        async function giveAnime() {
            try {
                const response = await AnimeService.fetchAnime({})
                setAnime(response.data.sort((a, b) => b.rating - a.rating))
            } catch (e) {
                console.error(e)
            }
        }

        giveAnime()
        console.log(anime, 1)
    }, [])

    const copyTextToClipboard = async (e) => {
        try {
            await navigator.clipboard.writeText(e);
        } catch (err) {
            alert(`Ошибка при копировании текста: ${err}`);
        }
    };

    const toggleLeftArrow = () => {

        setIsPress(true)
        setIsArrowLeft(true)
        setTimeout(()=> {
            setIsArrowLeft(false)
        }, 500)
    }

    const toggleRightArrow = () => {

        setIsPress(true)
        setIsArrowRight(true)
        setTimeout(()=> {
            setIsArrowRight(false)
        }, 500)
    }

    return (
        <div className="season-anime">

            <span className="season-anime-title">Лучшие новинки сезона</span>
            <div onClick={() => toggleLeftArrow()} className={`season-anime__arrow-left ${isPress ? `${isArrowLeft ? "season-anime__arrow-left-active" : ""}` : ""}`}>
                <i className="fa-solid fa-chevrons-left"></i>
            </div>
            <div onClick={() => toggleRightArrow()} className={`season-anime__arrow-right ${isPress ? `${isArrowRight ? "season-anime__arrow-right-active" : ""}` : ""}`}>
                <i className="fa-solid fa-chevrons-right"></i>
            </div>
            <Swiper
                navigation={{ nextEl: '.season-anime__arrow-right', prevEl: '.season-anime__arrow-left' }}
                slidesPerView={6}
                breakpoints={{
                    150: { slidesPerView: 1 },
                    550: { slidesPerView: 2 },
                    800: { slidesPerView: 3 },
                    950: { slidesPerView: 4 },
                    1100: { slidesPerView: 5},
                    1500: { slidesPerView: 6},
                }}
                threshold={1}
                speed={500}
                className="season-anime-list"
            >
                {anime.map(item => (
                    <SwiperSlide className="animeItem__swiper" key={item.id}>
                        <div className="animeItem">
                            <div className="animeItem__animeRating">
                                <svg width="60" height="25" viewBox="-1 -4 12 5">
                                    <path d="M 0 0 L 0 1 L -1 0 L -1 -4 L 10 -4 L 8 -2 L 10 0 Z" />
                                </svg>
                                <div className="animeItem__animeRating-value">
                                    <i className="fa-solid fa-star"></i> {item.rating}
                                </div>
                            </div>
                            <NavLink className="animeItem__animeImg" to={`${ANIME_PAGE_ROUTE}/${item.id}`}>
                                <img src={process.env.REACT_APP_API_URL + item.img} alt={item.title} />
                            </NavLink>
                            <div className="animeItem__animeTitle">
                                <div className="animeItem__animeTitle-value">
                                    <NavLink className="animeItem__animeTitle-value-link" to={`${ANIME_PAGE_ROUTE}/${item.id}`} title={`${item.title}`}>
                                        {item.title}
                                    </NavLink>
                                    <div className="animeItem__animeTitle-value-copy">
                                        <i className="fa-regular fa-clone"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
};

export default observer(SeasonAnime);