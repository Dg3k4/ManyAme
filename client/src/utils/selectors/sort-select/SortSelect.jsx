import React, { useState } from 'react';
import Select from 'react-select';
import {observer} from "mobx-react-lite";
import "./sortselect.css"

const SortSelect = ({onSortChange, options}) => {
    const [sortField, setSortField] = useState(options[0]);

    const handleSortFieldChange = (selectedOption) => {
        setSortField(selectedOption);
        onSortChange(selectedOption.value);
    };

    return (
        <div className="sort-selector">
            <Select
                value={sortField}
                onChange={handleSortFieldChange}
                options={options}
                classNamePrefix="react-select"
                isSearchable={false}
            />
        </div>
    );
};

export default observer(SortSelect);