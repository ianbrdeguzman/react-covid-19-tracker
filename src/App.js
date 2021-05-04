import React from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import Map from './components/Map';
import Aside from './components/Aside';
import { AppProvider } from './components/context';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    app: {
        width: '90%',
        margin: '2rem auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        [theme.breakpoints.up('lg')]: {
            flexDirection: 'row',
        },
    },
    app__main: {
        flex: '0.9',
    },
}));

function App() {
    const classes = useStyles();
    return (
        <AppProvider>
            <CssBaseline />
            <div className={classes.app}>
                <main className={classes.app__main}>
                    <Header />
                    <Stats />
                    <Map />
                </main>
                <Aside />
            </div>
        </AppProvider>
    );
}

export default App;
