import React, { useState } from 'react';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        // Aquí puedes manejar la lógica de búsqueda
        console.log('Buscando:', searchTerm);
    }

    return (
        <header className="header-container">
            <nav className="navbar">
                <div className="logo">
                    <h1>Concesionario</h1>
                </div>
                <ul className="nav-links">
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/autos">Autos</a></li>
                    <li><a href="/ofertas">Ofertas Especiales</a></li>
                    <li><a href="/financiamiento">Financiamiento</a></li>
                </ul>
                <div className="nav-actions">
                    
                    <button className="btn-quote">💬 Cotiza tu auto</button>
                    <button className="btn-login">Iniciar Sesión</button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
