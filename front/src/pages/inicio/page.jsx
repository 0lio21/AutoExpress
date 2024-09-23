import React from "react";
import data from "../../assets/models/listado.json";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
    const navegar = useNavigate();
  const handleClick = (e,id) => {
    navegar(`/publicacion?id=${id}`);
    // Aquí puedes agregar la lógica para redirigir o manejar el click
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Listado de autos
      </Typography>
      
      <Box display="flex" flexWrap="wrap" gap={2}>
        {data.autos.map((auto) => (
          <Box key={auto.id} sx={{ flex: '1 0 30%', cursor: 'pointer' }}>
            <button onClick={() => handleClick(event, auto.id)} style={{ all: 'unset', width: '100%' }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={auto.imagen}
                  alt={auto.marca + " " + auto.modelo}
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
