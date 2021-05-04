import React, { useContext, useEffect } from 'react';
import { AppContext } from './context';
import { FormControl, Select, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    app__header: {
        marginBottom: '2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            margin: '2rem 0',
        },
        '& h2': {
            [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
                marginBottom: theme.spacing(3),
            },
            [theme.breakpoints.up('sm')]: {
                fontSize: '3rem',
            },
        },
    },
    app__dropdown: {
        minWidth: '100px',
    },
}));

const Header = () => {
    const {
        countries,
        country,
        onCountryChange,
        fetchCountriesList,
    } = useContext(AppContext);

    const classes = useStyles();

    useEffect(() => {
        fetchCountriesList();
    }, []);

    return (
        <header className={classes.app__header}>
            <Typography variant='h2'>COVID-19 TRACKER</Typography>
            <FormControl variant='outlined'>
                <Select
                    onChange={(e) => onCountryChange(e.target.value)}
                    value={country}
                    className={classes.app__dropdown}
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
