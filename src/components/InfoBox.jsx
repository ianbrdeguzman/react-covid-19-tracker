import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import numeral from 'numeral';
import { AppContext } from './context';

const InfoBox = ({ title, cases, total, active, isRed, isGrey }) => {
    const { onInfoBoxClick } = useContext(AppContext);
    return (
        <Card
            className={`infoBox ${active && 'infoBox--selected'} ${
                active && isGrey && 'infoBox--grey'
            } ${active && isRed && 'infoBox--red'}`}
            onClick={() => onInfoBoxClick(title.toLowerCase())}
        >
            <CardContent>
                <Typography className='infoBox__title' color='textSecondary'>
                    {title} Today
                </Typography>
                <h3
                    className={`infoBox__cases ${
                        isRed && 'infoBox__cases--red'
                    } ${isGrey && 'infoBox__cases--grey'}`}
                >
                    {numeral(cases).format('+O a')}
                </h3>
                <Typography className='infoBox__total' color='textSecondary'>
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InfoBox;
