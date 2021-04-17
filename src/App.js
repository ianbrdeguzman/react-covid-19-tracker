import React from 'react';
import './App.css';
import { AppProvider } from './components/context';
import Header from './components/Header';
import Stats from './components/Stats';
import Map from './components/Map';
import Table from './components/Table';
import LineGraph from './components/LineGraph';
import { Card, CardContent } from '@material-ui/core';

function App() {
    return (
        <AppProvider>
            <div className='app'>
                <main className='app__left'>
                    <Header />
                    <Stats />
                    <Map />
                </main>
                <Card className='app__right'>
                    <CardContent>
                        <h3>Live Cases by Country</h3>
                        <Table />
                        <h3>Worldwide new cases</h3>
                        <LineGraph />
                    </CardContent>
                </Card>
            </div>
        </AppProvider>
    );
}

export default App;
