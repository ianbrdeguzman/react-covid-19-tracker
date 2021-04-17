import React, { useContext } from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { AppContext } from './context';

const Header = () => {
    const { countries, country, onCountryChange } = useContext(AppContext);

    return (
        <header className='app__header'>
            <h1>COVID-19 TRACKER</h1>
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
