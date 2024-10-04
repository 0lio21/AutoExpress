import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

function Listado() {
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    fetch('/assets/models/listado.json')
      .then((response) => response.json())
      .then((data) => setAutos(data.autos))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleClick = (id) => {
    console.log(`Auto seleccionado: ${id}`);
    // Aquí puedes agregar la lógica para manejar el clic en el auto
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Listado de Autos
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {autos.map((auto) => (
          <Box key={auto.id} sx={{ flex: '1 0 30%', cursor: 'pointer' }}>
            <button
              onClick={() => handleClick(auto.id)}
              style={{ all: 'unset', width: '100%' }}
            >
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
};

export default Listado;
