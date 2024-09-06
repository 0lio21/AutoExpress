import React from 'react';

const CarCard = ({ car }) => {
    return (
        <div className="car-card">
            <img src={car.image} alt={car.model} />
            <h2>{car.brand} - {car.model}</h2>
            <p>Año: {car.year}</p>
            <p>Precio: ${car.price}</p>
        </div>
    );
}

export default CarCard;
