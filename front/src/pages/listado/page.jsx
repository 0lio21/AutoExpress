import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function Listado() {
  const [autos, setAutos] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [marcaFiltro, setMarcaFiltro] = useState('');

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

  // Función para manejar el cambio de filtro de tipo
  const handleTipoChange = (event) => {
    setTipoFiltro(event.target.value);
  };

  // Función para manejar el cambio de filtro de marca
  const handleMarcaChange = (event) => {
    setMarcaFiltro(event.target.value);
  };

  // Filtrar autos según tipo y marca
  const autosFiltrados = autos.filter(auto => {
    const tipoCoincide = tipoFiltro ? auto.tipo === tipoFiltro : true;
    const marcaCoincide = marcaFiltro ? auto.marca === marcaFiltro : true;
    return tipoCoincide && marcaCoincide;
  });

  // Obtener las marcas y tipos únicos para los selectores
  const marcasUnicas = [...new Set(autos.map(auto => auto.marca))];
  const tiposUnicos = [...new Set(autos.map(auto => auto.tipo))];

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Listado de Autos
      </Typography>

      {/* Filtros */}
      <Box display="flex" gap={2} mb={2}>
        <FormControl variant="outlined">
          <InputLabel>Tipo</InputLabel>
          <Select value={tipoFiltro} onChange={handleTipoChange} label="Tipo">
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {tiposUnicos.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel>Marca</InputLabel>
          <Select value={marcaFiltro} onChange={handleMarcaChange} label="Marca">
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {marcasUnicas.map((marca) => (
              <MenuItem key={marca} value={marca}>{marca}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {autosFiltrados.map((auto) => (
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
