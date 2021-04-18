import React, { useContext } from 'react';
import { Card, CardContent } from '@material-ui/core';
import Table from './Table';
import LineGraph from './LineGraph';
import { AppContext } from './context';

const Aside = () => {
    const { countryName } = useContext(AppContext);
    return (
        <Card className='app__right'>
            <CardContent>
                <h3>Live Cases by Country</h3>
                <Table />
                <h3>{countryName || 'Worldwide'} Daily Statistics</h3>
                <LineGraph />
            </CardContent>
        </Card>
    );
};

export default Aside;
