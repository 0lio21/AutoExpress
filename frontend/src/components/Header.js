import React from 'react';

const Header = () => {
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
                </div>
            </nav>
            {/* Sección de información de contacto */}
            <div className="contact-info">
                <p>📞 Llama ahora: <a href="tel:+1234567890">+1234567890</a></p>
                <p>📍 Visítanos en: Av. Ejemplo 1234, Buenos Aires</p>
                <p>📧 Email: <a href="mailto:info@concesionario.com">info@concesionario.com</a></p>
            </div>
        </header>
    );
}

export default Header;

