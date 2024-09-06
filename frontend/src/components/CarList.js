// src/components/CarList.js
import React, { useRef } from 'react';
import data from '../data/carsData.json'; // Ajusta la ruta si es necesario
import '../index.css'; // Asegúrate de crear este archivo CSS con el estilo adecuado

const CarList = () => {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({
            left: -300, // Ajusta según el ancho del contenedor
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({
            left: 300, // Ajusta según el ancho del contenedor
            behavior: 'smooth'
        });
    };

    return (
        <div className="car-slider">
            <button className="scroll-button left" onClick={scrollLeft}>{"<"}</button>
            <div className="car-list" ref={scrollContainerRef}>
                {data.map(car => (
                    <div className="car-card" key={car.id}>
                        <img src={car.image} alt={`${car.make} ${car.model}`} />
                        <h2>{car.make} {car.model}</h2>
                        <p>{car.year}</p>
                        <p>${car.price}</p>
                    </div>
                ))}
            </div>
            <button className="scroll-button right" onClick={scrollRight}>{">"}</button>
        </div>
    );
};

export default CarList;
