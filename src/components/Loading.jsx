import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    app__loader: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        width: '50px',
        height: '50px',
        marginTop: '0',
        marginLeft: '-25px',
        borderRadius: '50%',
        border: '2px solid #000000',
        borderTopColor: '#ffffff',
        animation: 'rotate 0.6s linear infinite',
    },
    '@keyframes rotate': {
        to: {
            transform: 'rotate(360deg)',
        },
    },
}));
const Loading = () => {
    const classes = useStyles();

    return <div className={classes.app__loader}></div>;
};

export default Loading;
