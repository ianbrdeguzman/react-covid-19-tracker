import React, { useContext } from 'react';
import { AppContext } from './context';
import { Card, CardContent, Typography } from '@material-ui/core';
import Table from './Table';
import LineGraph from './LineGraph';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    app__aside: {
        margin: '2rem 0',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '400px',
        },
    },
}));

const Aside = () => {
    const { countryName, type } = useContext(AppContext);

    const classes = useStyles();

    return (
        <Card className={classes.app__aside}>
            <CardContent>
                <Typography variant='h6'>Highest {type} by country</Typography>
                <Table />
                <Typography variant='h6'>
                    {countryName || 'Worldwide'} daily {type}
                </Typography>
                <LineGraph />
            </CardContent>
        </Card>
    );
};

export default Aside;
