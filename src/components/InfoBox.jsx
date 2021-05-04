import React, { useContext } from 'react';
import { AppContext } from './context';
import numeral from 'numeral';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    infoBox: {
        flexGrow: '1',
        cursor: 'pointer',
        borderTop: '5px solid #ffffff',
        '&:not(:last-child)': {
            marginRight: '0.5rem',
        },
    },
    infoBox__cases: {
        color: '#7dd71d',
    },
    infoBox__cases__red: {
        color: '#ec7063',
    },
    infoBox__cases__grey: {
        color: '#808080',
    },
    infoBox__selected: {
        borderTop: '5px solid #7dd71d',
    },
    infoBox__grey: {
        borderTop: '5px solid #808080',
    },
    infoBox__red: {
        borderTop: '5px solid #ec7063',
    },
}));

const InfoBox = ({ title, cases, total, active, isRed, isGrey }) => {
    const { onInfoBoxClick } = useContext(AppContext);

    const classes = useStyles();

    return (
        <Card
            className={`${classes.infoBox} ${
                active && classes.infoBox__selected
            } ${active && isGrey && classes.infoBox__grey} ${
                active && isRed && classes.infoBox__red
            }`}
            onClick={() => onInfoBoxClick(title.toLowerCase())}
        >
            <CardContent>
                <Typography color='textSecondary'>{title} Today</Typography>
                <h3
                    className={`${classes.infoBox__cases} ${
                        isRed && classes.infoBox__cases__red
                    } ${isGrey && classes.infoBox__cases__grey}`}
                >
                    {numeral(cases).format('+O a')}
                </h3>
                <Typography color='textSecondary'>{total} Total</Typography>
            </CardContent>
        </Card>
    );
};

export default InfoBox;
