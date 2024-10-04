import React from "react";
import data from "../../assets/models/listado.json";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import './inicio.css';

export default function Inicio() {
  const navegar = useNavigate();

  const handleClick = (id) => {
    navegar(`/publicacion?id=${id}`);
  };

  return (
    <Box>
  
      <Container>
        <h2 className="text-center my-4">Autos en Promoción</h2>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {data.autos.slice(0, 3).map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : "false"}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {data.autos.slice(0, 3).map((auto, index) => (
              <div key={auto.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <img src={auto.imagen} className="d-block w-100" alt={`${auto.marca} ${auto.modelo}`} />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
                  <h5>{auto.marca} {auto.modelo}</h5>
                  <p>Precio: ${auto.precio.toLocaleString()}</p>
                  <Button variant="light" onClick={() => handleClick(auto.id)}>
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </Container>

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
                  alt={auto.marca + " " + auto.modelo}
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
