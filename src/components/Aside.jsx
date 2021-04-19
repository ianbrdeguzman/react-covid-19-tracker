import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import Table from './Table';
import LineGraph from './LineGraph';
import { AppContext } from './context';

const Aside = () => {
    const { countryName, type } = useContext(AppContext);
    return (
        <Card className='app__aside'>
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
