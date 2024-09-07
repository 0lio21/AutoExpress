import React, { useState } from 'react';
import './FilterAccordion.css'; // Asegúrate de crear este archivo CSS

const FilterAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const filterOptions = [
        { title: 'Buscar por marca' },
        { title: 'Buscar por año' },
        { title: 'Buscar por sucursales' },
        { title: 'Buscar por tipo' },
        { title: 'Buscar por transmisión' },
        { title: 'Buscar por tipo de combustible' }
    ];

    return (
        <div className="accordion-container">
            <h2>Continua tu búsqueda</h2>
            {filterOptions.map((option, index) => (
                <div className="accordion-item" key={index}>
                    <div 
                        className="accordion-title"
                        onClick={() => toggleAccordion(index)}
                    >
                        {option.title}
                        <span className={`accordion-arrow ${activeIndex === index ? 'open' : ''}`}>
                            &#9660; {/* Flecha */}
                        </span>
                    </div>
                    {activeIndex === index && (
                        <div className="accordion-content">
                            {/* Aquí irían los controles de búsqueda, como selectores, checkboxes, etc. */}
                            <p>Contenido para {option.title}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FilterAccordion;
