import React from 'react';
import './App.css';
import { AppProvider } from './components/context';
import Header from './components/Header';
import Stats from './components/Stats';
import Map from './components/Map';
import Aside from './components/Aside';

function App() {
    return (
        <AppProvider>
            <div className='app'>
                <main className='app__left'>
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
