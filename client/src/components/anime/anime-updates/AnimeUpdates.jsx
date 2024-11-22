import React, {useState} from 'react';
import "./animeupdates.css"
import "./animeupdates-mini.css"
import AnimeUpdatesTable from "./anime-updates-table/AnimeUpdatesTable";
import AnimeCalendar from "./anime-calendar/AnimeCalendar";
import AnimeRelease from "./anime-release/AnimeRelease";
import {observer} from "mobx-react-lite";

const AnimeUpdates = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [hasInteracted, setHasInteracted] = useState([false, false, false, false]);

    const toggleOpen = (index) => {
        const newHasInteracted = [...hasInteracted];
        newHasInteracted[index - 1] = true;
        setHasInteracted(newHasInteracted);

        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="anime-updates">
            <div className="anime-updates__titles">
                <div
                    onClick={() => toggleOpen(1)}
                    className={`anime-updates__title-anime-updates ${activeIndex === 1 ? `active` : (hasInteracted[0] ? `hidden` : ``)}`}
                >
                    <span>Обновления аниме</span>
                    <i className={`fa-solid fa-angle-down`}></i>
                </div>
                <div
                    onClick={() => toggleOpen(2)}
                    className={`anime-updates__title-anime-calendar ${activeIndex === 2 ? `active` : (hasInteracted[1] ? `hidden` : ``)}`}
                >
                    <span>Расписание</span>
                    <i className={`fa-solid fa-angle-down`}></i>
                </div>
                <div
                    onClick={() => toggleOpen(3)}
                    className={`anime-updates__title-anime-release ${activeIndex === 3 ? `active` : (hasInteracted[2] ? `hidden` : ``)}`}
                >
                    <span>Недавние релизы</span>
                    <i className={`fa-solid fa-angle-down`}></i>
                </div>
            </div>
            <div className="anime-updates__table">
                <div className={`anime-updates__table-anime-updates ${activeIndex === 1 ? `active` : (hasInteracted[0] ? `hidden` : ``)}`}>
                    <AnimeUpdatesTable/>
                </div>
                <div className={`anime-updates__table-anime-calendar ${activeIndex === 2 ? `active` : (hasInteracted[1] ? `hidden` : ``)}`}>
                    <AnimeCalendar/>
                </div>
                <div className={`anime-updates__table-anime-release ${activeIndex === 3 ? `active` : (hasInteracted[2] ? `hidden` : ``)}`}>
                    <AnimeRelease/>
                </div>
            </div>
        </div>
    );
};

export default observer(AnimeUpdates);