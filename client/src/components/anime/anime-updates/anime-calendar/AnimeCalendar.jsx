import React, {useEffect, useState} from 'react';
import "./animecalendar.css"
import {NavLink} from "react-router-dom";
import {ANIME_PAGE_ROUTE} from "../../../../utils/consts";

const AnimeCalendar = () => {
    const [activeIndexSwitch, setActiveIndexSwitch] = useState(null)
    const [isSwapping, setIsSwapping] = useState(false)

    const animeMoc = [
        {id: 1, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg", episode: 10, releaseTime: "2024-09-09T17:15"},
        {id: 2, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg", episode: 2, releaseTime: "2024-09-10T15:45"},
        {id: 3, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg", episode: 12, releaseTime: "2024-09-12T21:00"},
        {id: 4, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg", episode: 10, releaseTime: "2024-09-14T17:15"},
        {id: 5, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg", episode: 2, releaseTime: "2024-09-15T15:45"},
        {id: 6, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg", episode: 12, releaseTime: "2024-09-13T21:00"},
        {id: 7, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg", episode: 10, releaseTime: "2024-09-09T17:15"},
        {id: 8, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg", episode: 2, releaseTime: "2024-09-11T15:45"},
        {id: 9, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg", episode: 12, releaseTime: "2024-09-12T21:00"},
        {id: 10, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg", episode: 10, releaseTime: "2024-09-10T17:15"},
        {id: 11, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg", episode: 2, releaseTime: "2024-09-13T15:45"},
        {id: 12, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg", episode: 12, releaseTime: "2024-09-11T21:00"},
        {id: 13, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg", episode: 10, releaseTime: "2024-09-14T17:15"},
        {id: 14, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg", episode: 2, releaseTime: "2024-09-15T15:45"},
        {id: 15, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg", episode: 12, releaseTime: "2024-09-13T21:00"},
        {id: 16, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg", episode: 10, releaseTime: "2024-09-09T17:15"},
        {id: 17, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg", episode: 2, releaseTime: "2024-09-10T15:45"},
        {id: 18, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg", episode: 12, releaseTime: "2024-09-12T21:00"}
    ];

    const toggleSwitch = (index) => {
        if (index === activeIndexSwitch) {
            return;
        }
        setIsSwapping(true)
        setTimeout(() => {
            setIsSwapping(false)
            setActiveIndexSwitch(index)
        }, 250)
    }

    console.log(isSwapping)

    const getCurrentDay = () => {
        const currentDay = new Date().getDay();
        return currentDay === 0 ? 7 : currentDay;
    };

    const filterAnimeByDay = (day) => {
        return animeMoc.filter(anime => {
            const releaseDay = new Date(anime.releaseTime).getDay();
            return (releaseDay === day || (releaseDay === 0 && day === 7));
        });
    };

    useEffect(() => {
        const today = getCurrentDay();
        setActiveIndexSwitch(today);
    }, []);

    const takeHour = (time) => {
        const date = new Date(time)
        const hour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        return hour
    }

    const filteredAnime = filterAnimeByDay(activeIndexSwitch);

    return (
        <div className={`anime-calendar`}>
            <div className="anime-calendar__week-switcher">
                <div onClick={() => toggleSwitch(1)} className={`anime-calendar__week-switcher__switch ${activeIndexSwitch === 1 ? "active" : ""}`}>Понедельник</div>
                <div onClick={() => toggleSwitch(2)} className={`anime-calendar__week-switcher__switch ${activeIndexSwitch === 2 ? "active" : ""}`}>Вторник</div>
                <div onClick={() => toggleSwitch(3)} className={`anime-calendar__week-switcher__switch ${activeIndexSwitch === 3 ? "active" : ""}`}>Среда</div>
                <div onClick={() => toggleSwitch(4)} className={`anime-calendar__week-switcher__switch ${activeIndexSwitch === 4 ? "active" : ""}`}>Четверг</div>
                <div onClick={() => toggleSwitch(5)} className={`anime-calendar__week-switcher__switch ${activeIndexSwitch === 5 ? "active" : ""}`}>Пятница</div>
                <div onClick={() => toggleSwitch(6)} className={`anime-calendar__week-switcher__switch ${activeIndexSwitch === 6 ? "active" : ""}`}>Суббота</div>
                <div onClick={() => toggleSwitch(7)} className={`anime-calendar__week-switcher__switch ${activeIndexSwitch === 7 ? "active" : ""}`}>Воскресенье</div>
            </div>
            <div className="anime-calendar__wrap">
                <div className={`anime-calendar__content ${isSwapping ? "swap" : ""}`}>
                    {filteredAnime.map(anime =>
                        <div key={anime.id} className="anime-calendar__content-cell">
                            <div className="anime-calendar__content-cell__episode">
                                <div className="anime-calendar__content-cell__episode-number">
                                    {anime.episode + " серия"}
                                </div>
                                <span className="anime-calendar__content-cell__episode-time">{takeHour(anime.releaseTime)}</span>
                            </div>
                            <NavLink to={`${ANIME_PAGE_ROUTE}/${anime.id}`}>
                                <img src={process.env.REACT_APP_API_URL + anime.img} alt=""/>
                            </NavLink>
                            <div className="anime-calendar__content-cell__episode-title">
                                <div className="anime-calendar__content-cell__episode-title__value" title={anime.title}>
                                    {anime.title}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimeCalendar;