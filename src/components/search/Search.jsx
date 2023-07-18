import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate';
import { API_URL, geoApiOption } from '..//../api';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
        return fetch(
            `${API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOption
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            });
    };


    const handleSearch = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <>
            <AsyncPaginate
                placeholder='Search your city'
                debounceTimeout={600}
                value={search}
                onChange={handleSearch}
                loadOptions={loadOptions}
            />
        </>
    )
}

export default Search
