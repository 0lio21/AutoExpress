import React, { useRef } from 'react';
import newsData from '../data/newsData.json'; // Asegúrate de ajustar la ruta si es necesario
import './NewsCarousel.css'; // Asegúrate de crear este archivo CSS

const NewsCarousel = () => {
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
        <div className="news-slider">
            <button className="scroll-button left" onClick={scrollLeft}>{"<"}</button>
            <div className="news-list" ref={scrollContainerRef}>
                {newsData.map(news => (
                    <div className="news-card" key={news.id}>
                        <img src={news.image} alt={news.title} />
                        <h2>{news.title}</h2>
                        <p>{news.description}</p>
                    </div>
                ))}
            </div>
            <button className="scroll-button right" onClick={scrollRight}>{">"}</button>
        </div>
    );
};

export default NewsCarousel;
