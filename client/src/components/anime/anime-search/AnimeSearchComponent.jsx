import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import AnimeService from "../../../services/AnimeService";
import "./animesearchcomponent.css"
import "./animesearchcomponent-mini.css"
import {NavLink} from "react-router-dom";
import {ANIME_PAGE_ROUTE} from "../../../utils/consts";
import YearSlider from "../../../utils/sliders/year-slider/YearSlider";
import SortSelect from "../../../utils/selectors/sort-select/SortSelect";
import FilterSelect from "../../../utils/selectors/filter-select/FilterSelect";

const AnimeSearchComponent = ({isMain}) => {
    const [anime, setAnime] = useState([])
    const [activeGrid, setActiveGrid] = useState("")
    const [showAll, setShowAll] = useState(null);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('DESC');
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(9);
    const [filters, setFilters] = useState({});
    const [genres, setGenres] = useState([])
    const [filterOpen, setFilterOpen] = useState(false)

    const options = [
        { value: 'createdAt', label: 'Дате добавления' },
        { value: 'rating', label: 'Рейтингу' },
        { value: 'releaseDate', label: 'Дате выхода' },
        { value: 'title', label: 'Алфавиту' }
    ];

    useEffect(() => {
        async function fetchAnime() {
            try {
                const response = await AnimeService.fetchAnime({
                    offset,
                    limit,
                    sortField,
                    sortOrder,
                    filters
                });

                const sortedAnime = response.data.map(anime => {
                    if (anime.anime_genre_titles) {
                        anime.anime_genre_titles.sort((a, b) => a.animeGenre.localeCompare(b.animeGenre));
                    }
                    return anime;
                });

                setAnime(sortedAnime);
            } catch (e) {
                console.error(e);
            }
        }

        fetchAnime();
    }, [filters, sortField, sortOrder, offset, limit]);


    useEffect(() => {
        async function fetchGenre() {
            try {
                const genres = await AnimeService.fetchGenre();
                setGenres(genres.data)
            } catch (e) {
                console.error(e)
            }
        }
        fetchGenre()
    }, [])

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'ASC' ? 'DESC' : 'ASC'));
    };

    const handleViewChange = (view) => {
        setActiveGrid(view);
    };

    const toggleSubTitles = (id) => {
        setShowAll(id)
    }

    const handleSortChange = (field) => {
        setSortField(field);
    };

    const takeYear = (date) => {
        const year = new Date(date).getFullYear()
        return year
    }

    function truncateText(description, maxLength) {
        if (description.length <= maxLength) {
            return description;
        }

        let truncated = description.slice(0, maxLength);
        const punctuationMarks = ['!', '?', '.'];

        let lastPunctuationIndex = -1;

        for (let i = maxLength; i < description.length; i++) {
            if (punctuationMarks.includes(description[i])) {
                lastPunctuationIndex = i;
                break;
            }
        }

        if (lastPunctuationIndex !== -1) {
            truncated = description.slice(0, lastPunctuationIndex + 1) + '...';
        } else {
            truncated += '...';
        }

        return truncated;
    }


    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters
        }));
    };

    const filterOpenHandler = () => {
        setFilterOpen(!filterOpen)
    }

    return (
        <div className={`anime-search`}>
            <div className="anime-search__container">
                {isMain &&
                    <span className="anime-list-title">Обновки на сайте</span>
                }
                <div className="anime-search__container-sort">
                    <div className="anime-search__container-sort__by">
                        <span>Сортировать по</span>
                        <SortSelect onSortChange={handleSortChange} options={options}/>
                        <div className="decrease-increase" onClick={toggleSortOrder}>
                            {sortOrder === 'DESC' ? <i className="fa-solid fa-arrow-down-wide-short" title="По убыванию"></i> :
                                <i className="fa-solid fa-arrow-up-wide-short" title="По возрастанию"></i>}
                        </div>
                    </div>
                    <div className="anime-search__container-right">
                        <div onClick={() => filterOpenHandler()} className="anime-search__container-sort__filters">
                            <i className="fa-solid fa-square-sliders"></i>
                            <span></span>
                        </div>
                        <div className="anime-search__container-sort__grid">
                            <i className={`fa-solid fa-grid ${activeGrid === "grid" ? "active" : ""}`} onClick={() => handleViewChange("grid")}></i>
                            <i className={`fa-solid fa-grid-2 ${activeGrid === "grid-2" ? "active" : ""}`} onClick={() => handleViewChange("grid-2")}></i>
                            <i className={`fa-solid fa-list ${activeGrid === "" ? "active" : ""}`} onClick={() => handleViewChange("")}></i>
                        </div>
                    </div>
                </div>
                <div className={`anime-search__container__filter ${filterOpen ? "active" : ""}`}>
                    <YearSlider STEP={1} MAX={2025} MIN={1959}/>
                    <div className="anime-search__container__filter-selectors">
                        <FilterSelect options={genres} onFilterChange={handleFilterChange} />
                    </div>
                </div>
                <div className={`anime-search__container-content ${activeGrid}`}>
                    {anime.map(item =>
                        <div key={item.id} className="anime-search__container-content__item">
                            <div className="anime-search__container-content__item-animeRating">
                                <svg width="60" height="25" viewBox="-1 -4 12 5">
                                    <path d="M 0 0 L 0 1 L -1 0 L -1 -4 L 10 -4 L 8 -2 L 10 0 Z" />
                                </svg>
                                <div className="anime-search__container-content__item-animeRating__value">
                                    <i className="fa-solid fa-star"></i> {item.rating}
                                </div>
                            </div>
                            <div className="anime-search__container-content__item-img">
                                <NavLink to={`${ANIME_PAGE_ROUTE}/${item.id}`}>
                                    <img src={process.env.REACT_APP_API_URL + item.img} alt={`${item.title}`}/>
                                </NavLink>
                            </div>
                            <div className="anime-search__container-content__item-info">
                                <div className="up">
                                    <div className="up-title">
                                        {item.title}
                                    </div>
                                    <div className="up-subtitles">
                                        {item.subTitles.slice(0, 1).map((sub, index) =>
                                            <span key={index}>{sub}</span>
                                        )}
                                        {showAll === item.id && item.subTitles.slice(1).map((sub, index) =>
                                            <span key={index}>{sub}</span>
                                        )}
                                        <div className="show" onClick={() => toggleSubTitles(item.id)}>{showAll === item.id ? "" : '...'}</div>
                                    </div>
                                    <div className="up-container">
                                        <div className="up-container__type">
                                            {item.anime_type ?
                                                item.anime_type.animeType
                                                :
                                                <span>Тип не дан :(</span>
                                            }
                                        </div>
                                        <span className="spacer"> / </span>
                                        <div className="up-container__date">
                                            {takeYear(item.anime_release.releaseFrom)}
                                            {!item.anime_release &&
                                                <span>Ненаход года выпуска :(</span>
                                            }
                                        </div>
                                        <span className="spacer"> / </span>
                                        <div className="up-container__genres">
                                            {item.anime_genre_titles.map((genre, index) => (
                                                <React.Fragment key={index}>
                                                    <span className="up-genre__link">{genre.animeGenre}</span>
                                                    {index < item.anime_genre_titles.length - 1 && ", "}
                                                </React.Fragment>
                                            ))}
                                            {!item.anime_genre_titles.length && <span>Ненаход жанров :(</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="down">
                                    {truncateText(item.description, 350)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default observer(AnimeSearchComponent);