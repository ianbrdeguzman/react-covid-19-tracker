import React, { useContext, useEffect } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { AppContext } from './context';
import { Typography } from '@material-ui/core';

const Header = () => {
    const {
        countries,
        country,
        onCountryChange,
        fetchCountriesList,
    } = useContext(AppContext);

    useEffect(() => {
        fetchCountriesList();
    }, []);

    return (
        <header className='app__header'>
            <Typography variant='h2'>COVID-19 TRACKER</Typography>
            <FormControl variant='outlined'>
                <Select
                    onChange={(e) => onCountryChange(e.target.value)}
                    value={country}
                    className='app__dropdown'
                >
                    <MenuItem value={'all'}>All</MenuItem>
                    {countries.map((country, index) => {
                        return (
                            <MenuItem key={index} value={country.value}>
                                {country.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </header>
    );
};

export default Header;
