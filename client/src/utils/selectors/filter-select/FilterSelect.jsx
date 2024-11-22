import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import Select from 'react-select';
import "./filterselect.css";

const FilterSelect = ({ options, onFilterChange }) => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [timer, setTimer] = useState(null);

    const genreOptions = options.map(option => ({
        value: option.id,
        label: option.animeGenre
    }));

    const handleGenreChange = (selectedOptions) => {
        setSelectedGenres(selectedOptions);

        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            onFilterChange({
                genreIds: selectedOptions.map(option => option.value)
            });
        }, 700);

        setTimer(newTimer);
    };

    return (
        <div className="filter-selector">
            <Select
                value={selectedGenres}
                onChange={handleGenreChange}
                options={genreOptions}
                classNamePrefix="react-select"
                isMulti={true}
                isSearchable={true}
                closeMenuOnSelect={false}
                placeholder="Жанры"
            />
        </div>
    );
};

export default observer(FilterSelect);
