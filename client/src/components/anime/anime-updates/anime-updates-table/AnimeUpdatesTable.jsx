import React, {useState} from 'react';
import "./animeupdatestable.css"
import {NavLink} from "react-router-dom";
import {ANIME_PAGE_ROUTE} from "../../../../utils/consts";
import {observer} from "mobx-react-lite";

const AnimeUpdatesTable = () => {
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const [isSwapping, setIsSwapping] = useState(false)
    const [isSwitching, setIsSwitching] = useState(false)
    const [isSwitch, setIsSwitch] = useState('today')
    const [isPress, setIsPress] = useState(false)


    const animeMoc = [
        {id: 1, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg"},
        {id: 2, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg"},
        {id: 3, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg"},
        {id: 4, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg"},
        {id: 5, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg"},
        {id: 6, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg"},
        {id: 7, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg"},
        {id: 8, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg"},
        {id: 9, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg"},
        {id: 10, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg"},
        {id: 11, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg"},
        {id: 12, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg"},
        {id: 13, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg"},
        {id: 14, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg"},
        {id: 15, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg"},
        {id: 16, title: "Невероятное приключение ДжоДжо: Золотой ветер", img: "263ea133-f2d4-4c6b-a141-395fc15ddf53.jpg"},
        {id: 17, title: "Провожающая в последний путь Фрирен", img: "6515ec6ebe476944952501.jpg"},
        {id: 18, title: "Звёздное дитя 2", img: "667e9fcf46fb9694086397.jpg"},
    ]

    const voiceoversMoc = [
        {id: 1, animeId: 1, title: "AniLibria", episode: 1},
        {id: 2, animeId: 1, title: "AniLibria", episode: 2},
        {id: 3, animeId: 2, title: "AniDub", episode: 3},
        {id: 4, animeId: 2, title: "AniDub", episode: 2},
        {id: 5, animeId: 2, title: "AniDub", episode: 1},
        {id: 6, animeId: 2, title: "Студийная банда", episode: 3},
        {id: 7, animeId: 2, title: "AniLibria", episode: 2},
        {id: 8, animeId: 2, title: "AniLibria", episode: 4},
        {id: 9, animeId: 1, title: "Студийная банда", episode: 1},
        {id: 10, animeId: 3, title: "Студийная банда", episode: 1},
        {id: 11, animeId: 2, title: "Студийная банда", episode: 6},
        {id: 12, animeId: 2, title: "Студийная банда", episode: 7},
        {id: 13, animeId: 2, title: "Студийная банда", episode: 8},
        {id: 14, animeId: 2, title: "Студийная банда", episode: 3},
        {id: 15, animeId: 2, title: "Студийная банда", episode: 3},
        {id: 16, animeId: 2, title: "Студийная банда", episode: 8},
        {id: 17, animeId: 2, title: "Студийная банда", episode: 8},

    ]

    const sortByField = (array, field ) => {
        try {
            const bundles = {};

            array.forEach(item => {
                const fieldValue = item[field];

                if (!bundles[fieldValue]) {
                    bundles[fieldValue] = [];
                }

                bundles[fieldValue].push(item);
            });

            return bundles;
        } catch (e) {
            return "Нет инфы для сортировки"
        }
    };

    const groupEpisodeVoiceovers = (sortedObject) => {
        try {
            const group = {}

            Object.entries(sortedObject).forEach(([animeId, array]) => {
                group[animeId] = {}

                array.forEach(item => {
                    const episodeValue = item["episode"]

                    if (!group[animeId][episodeValue]) {
                        group[animeId][episodeValue] = []
                    }

                    group[animeId][episodeValue].push(item)
                });
            });

            return group;
        } catch (e) {
            return e;
        }
    };

    const groupAnimeVoiceover = (animeArray, voiceoversArray) => {
        const groupedVoiceovers = groupEpisodeVoiceovers(sortByField(voiceoversArray, "animeId"));

        return animeArray.map(anime => {
            const { id: animeId } = anime;
            const voiceovers = groupedVoiceovers[animeId] || {};

            return {
                ...anime,
                voiceovers
            };
        });
    }

    const handleAnimeClick = (anime) => {
        if (selectedAnime && selectedAnime.id === anime.id) {
            setIsClosing(true)
            setTimeout(() => {
                setIsClosing(false)
                setSelectedAnime(null);
            }, 300)
        } else if (selectedAnime && selectedAnime.id !== anime.id  ) {
            setIsSwapping(true);
            setTimeout(() => {
                setSelectedAnime(anime);
                setIsSwapping(false);
            }, 200);
        } else {
            setSelectedAnime(anime);
        }
    };

    const handleDateSwitch = (day) => {
        if (isSwitch === day) {
            return;
        }
        setIsPress(true)
        if (selectedAnime) {
            setIsClosing(true)
            setTimeout(() => {
                setIsClosing(false)
                setSelectedAnime(null);
            }, 300)
        }
        setIsSwitching(true)
        setTimeout(() => {
            setIsSwitch(day)
            setIsSwitching(false)
            }, 250)
    }

    const todayAnimeUpdates = groupAnimeVoiceover(animeMoc, voiceoversMoc)
    const yesterdayAnimeUpdates = groupAnimeVoiceover(animeMoc, voiceoversMoc).filter(i => i.id === 1)

    return (
        <div className="table-anime-updates__container">
            <div className="today-yesterday-switcher">
                <div className={`today-switcher ${isSwitch === 'today' ? 'active' : ''}`} onClick={() => handleDateSwitch('today')}>
                    Сегодня
                </div>
                <div className={`yesterday-switcher ${isSwitch === 'yesterday' ? 'active' : ''}`} onClick={() => handleDateSwitch('yesterday')}>
                    Вчера
                </div>
            </div>
            <div className={`table-anime-updates__container__details ${isSwapping ? "active" : (selectedAnime ? "active" : "hidden")} ${isClosing ? "hidden" : ""}`}>
                <div className={`table-anime-updates__container__details-value ${isSwapping && selectedAnime ? "swap" : ""}`}>
                    {selectedAnime &&
                        <NavLink to={`${ANIME_PAGE_ROUTE}/${selectedAnime.id}`} className="anime-card">
                            <img src={`http://localhost:7000/${selectedAnime.img}`} alt={`${selectedAnime.title}`}/>
                        </NavLink>
                    }
                    {selectedAnime && (
                        <div className="update-info">
                            <div className="update-info__title">
                                <span>{selectedAnime.title}</span>
                                <i onClick={() => handleAnimeClick(selectedAnime)} className="fa-regular fa-xmark"></i>
                            </div>
                            <div className="update-info__container">
                                {Object.entries(selectedAnime.voiceovers).map(([episode, voiceovers]) => (
                                    <NavLink to={`${ANIME_PAGE_ROUTE}/${selectedAnime.id}`} key={episode} className="update-info__container__episode">
                                        <div className="update-info__container__episode-title">
                                            <span>{episode} cерия:</span>
                                        </div>
                                        <div className="update-info__container__voiceovers">
                                            <div className="voiceover">
                                                {voiceovers.map(voiceover => voiceover.title).join(', ')}
                                            </div>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="table-anime-updates__container__wrap">
                <div className={`table-anime-updates__container__content ${isPress ? (isSwitching ? "switch-out" : "switch-in") : ""}`}>
                    {isSwitch === 'today' ?
                        todayAnimeUpdates.map(anime =>
                            <div key={anime.id} className={`anime-cell ${selectedAnime && selectedAnime.id === anime.id ? "active" : ""}`}>
                                <div onClick={() => handleAnimeClick(anime)} className="anime-cell__img" >
                                    <img src={`http://localhost:7000/${anime.img}`} alt={anime.title} />
                                </div>
                                <div className="anime-cell__title">
                                    <NavLink className="anime-cell__title-value" to={`${ANIME_PAGE_ROUTE}/${anime.id}`} title={`${anime.title}`}>
                                        {anime.title}
                                    </NavLink>
                                </div>
                            </div>
                        )
                        :
                        yesterdayAnimeUpdates.map(anime =>
                            <div key={anime.id} className={`anime-cell ${selectedAnime && selectedAnime.id === anime.id ? "active" : ""}`}>
                                <div onClick={() => handleAnimeClick(anime)} className="anime-cell__img" >
                                    <img src={process.env.REACT_APP_API_URL + anime.img} alt={anime.title} />
                                </div>
                                <div className="anime-cell__title">
                                    <NavLink className="anime-cell__title-value" to={`${ANIME_PAGE_ROUTE}/${anime.id}`} title={`${anime.title}`}>
                                        {anime.title}
                                    </NavLink>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default observer(AnimeUpdatesTable);