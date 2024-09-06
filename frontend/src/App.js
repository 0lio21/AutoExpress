// src/App.js
import React from 'react';
import Header from './components/Header';
import CarList from './components/CarList';

const App = () => {
    return (
        <div className="App">
            <Header />
            <main>
                <h1>Lista de Autos</h1>
                <CarList />
            </main>
        </div>
    );
}

export default App;