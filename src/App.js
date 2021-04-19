import React from 'react';
import './App.css';
import Header from './components/Header';
import Stats from './components/Stats';
import Map from './components/Map';
import Aside from './components/Aside';
import { AppProvider } from './components/context';

function App() {
    return (
        <AppProvider>
            <div className='app'>
                <main className='app__main'>
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
