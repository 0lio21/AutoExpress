import React, { useState } from "react";
import data from "/public/listado.json";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button, Container, Carousel } from "react-bootstrap";
import './inicio.css';

export default function Inicio() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/publicacion/${id}`);
  };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Box>
      <div className="carousel-container">
        <h2 className="text-center my-4">Autos en Promoción</h2>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {data.autos.slice(0, 3).map((auto) => (
            <Carousel.Item key={auto.id}>
              <img
                className="d-block w-100"
                src={auto.imagen}
                alt={`${auto.marca} ${auto.modelo}`}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
              <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
                <h5>{auto.marca} {auto.modelo}</h5>
                <p>Precio: ${auto.precio.toLocaleString()}</p>
                <Button variant="light" onClick={() => handleClick(auto.id)}>
                  Ver Detalles
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <Typography variant="h2" gutterBottom>
        Listado de Autos
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {data.autos.map((auto) => (
          <Box key={auto.id} sx={{ flex: '1 0 30%', cursor: 'pointer' }}>
            <button onClick={() => handleClick(auto.id)} style={{ all: 'unset', width: '100%' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={auto.imagen}
                  alt={`${auto.marca} ${auto.modelo}`}
                  style={{ height: '100%' }}
                />
                <CardContent>
                  <Typography variant="h6">
                    {auto.marca} {auto.modelo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Transmisión: {auto.transmision}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: ${auto.precio.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
