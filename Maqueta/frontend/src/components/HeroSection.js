import React from 'react';
import './HeroSection.css'; // Crea este archivo para los estilos
import carImage from '../images/car-vehicles-transport-in-flat-style-png.webp'; // Asegúrate de que la imagen esté en la carpeta de imágenes

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Cambiá o vendé tu auto de forma simple y rápida</h1>
                <p>Cotizá tu auto y agendá una inspección en nuestra sede más cercana.</p>
                <hr />
                <p>Vendé tu auto sin intermediarios. Te depositamos directo en tu cuenta.</p>
                <hr />
                <p>Dejalo en parte de pago y llevate un auto certificado y con garantía.</p>
                <button className="cta-button">Vendé tu auto</button>
            </div>
            <div className="hero-image">
                <img src={carImage} alt="Coche" />
            </div>
        </div>
    );
};

export default HeroSection;
