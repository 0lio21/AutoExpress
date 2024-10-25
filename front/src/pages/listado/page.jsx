import React, { useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, MenuItem, Select, InputLabel, FormControl, Container, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from "react-router-dom";
import data from '../../assets/models/autos.json'; // Importa los datos del JSON directamente

function Listado() {
  const [autos, setAutos] = useState(data.autos ||[]); 
  const [autosFiltrados, setAutosFiltrados] = useState(data.autos); 
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [transmisionFiltro, setTransmisionFiltro] = useState('');
  const [colorFiltro, setColorFiltro] = useState('');
  const [ubicacionFiltro, setUbicacionFiltro] = useState('');
  const [kilometrajeMin, setKilometrajeMin] = useState('');
  const [kilometrajeMax, setKilometrajeMax] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [anioFiltro, setAnioFiltro] = useState('');
  const [open, setOpen] = useState(false); // Estado para el diálogo de filtros
  const navigate = useNavigate();

  const handleClick = (id) => {
    console.log(`Auto seleccionado: ${id}`);
    navigate(`/publicacion/${id}`);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Funciones para manejar los cambios en cada filtro
  const handleMarcaChange = (event) => setMarcaFiltro(event.target.value);
  const handleTransmisionChange = (event) => setTransmisionFiltro(event.target.value);
  const handleColorChange = (event) => setColorFiltro(event.target.value);
  const handleUbicacionChange = (event) => setUbicacionFiltro(event.target.value);
  const handleAnioChange = (event) => setAnioFiltro(event.target.value);
  const handlePrecioMinChange = (event) => setPrecioMin(event.target.value);
  const handlePrecioMaxChange = (event) => setPrecioMax(event.target.value);
  const handleKilometrajeMinChange = (event) => setKilometrajeMin(event.target.value);
  const handleKilometrajeMaxChange = (event) => setKilometrajeMax(event.target.value);

  const limpiarFiltros = () => {
    setMarcaFiltro('');
    setTransmisionFiltro('');
    setColorFiltro('');
    setUbicacionFiltro('');
    setAnioFiltro('');
    setPrecioMax('');
    setPrecioMin('');
    setKilometrajeMax('');
    setKilometrajeMin('');
    setAutosFiltrados(autos)
  }

  // Función para aplicar los filtros y cerrar el diálogo
  const aplicarFiltros = () => {
    const autosFiltrados = autos.filter((auto) => {
      const marcaCoincide = marcaFiltro ? auto.marca === marcaFiltro : true;
      const transmisionCoincide = transmisionFiltro ? auto.transmision === transmisionFiltro : true;
      const colorCoincide = colorFiltro ? auto.color === colorFiltro : true;
      const ubicacionCoincide = ubicacionFiltro ? auto.ubicacion === ubicacionFiltro : true;
      const anioCoincide = anioFiltro ? auto.año.toString() === anioFiltro : true;
      const precioCoincide = (precioMin ? auto.precio >= precioMin : true) && (precioMax ? auto.precio <= precioMax : true);
      const kilometrajeCoincide = (kilometrajeMin ? auto.kilometraje >= kilometrajeMin : true) && (kilometrajeMax ? auto.kilometraje <= kilometrajeMax : true);
      return marcaCoincide && transmisionCoincide && colorCoincide && ubicacionCoincide && anioCoincide && precioCoincide && kilometrajeCoincide;
    });
    setAutosFiltrados(autosFiltrados);
    setOpen(false); // Cierra el diálogo después de aplicar los filtros
  };

  // Obtener las marcas, transmisiones, colores y ubicaciones únicas para los selectores
  const marcasUnicas = [...new Set(autos.map((auto) => auto.marca))];
  const transmisionesUnicas = [...new Set(autos.map((auto) => auto.transmision))];
  const coloresUnicos = [...new Set(autos.map((auto) => auto.color))];
  const ubicacionesUnicas = [...new Set(autos.map((auto) => auto.ubicacion))];

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Listado de Autos
      </Typography>

      {/* Botón para abrir el diálogo de filtros */}
      <Box display="flex" justifyContent="center" mb={2}>
        <Button variant="contained" onClick={handleOpen}>
          Filtrar
        </Button>
      </Box>

      {/* Diálogo para los filtros */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Aplicar Filtros</DialogTitle>
        <DialogContent>
          <Box display="flex" gap={2} mb={2} justifyContent="center" flexWrap="wrap">
            {/* Filtros dentro del diálogo */}
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
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

            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Transmisión</InputLabel>
              <Select value={transmisionFiltro} onChange={handleTransmisionChange} label="Transmisión">
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {transmisionesUnicas.map((transmision) => (
                  <MenuItem key={transmision} value={transmision}>{transmision}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Color</InputLabel>
              <Select value={colorFiltro} onChange={handleColorChange} label="Color">
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {coloresUnicos.map((color) => (
                  <MenuItem key={color} value={color}>{color}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel>Ubicación</InputLabel>
              <Select value={ubicacionFiltro} onChange={handleUbicacionChange} label="Ubicación">
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {ubicacionesUnicas.map((ubicacion) => (
                  <MenuItem key={ubicacion} value={ubicacion}>{ubicacion}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="Año" type="number" value={anioFiltro} onChange={handleAnioChange} sx={{ minWidth: 120 }} />
            <TextField label="Kilometraje Mín" type="number" value={kilometrajeMin} onChange={handleKilometrajeMinChange} sx={{ minWidth: 120 }} />
            <TextField label="Kilometraje Máx" type="number" value={kilometrajeMax} onChange={handleKilometrajeMaxChange} sx={{ minWidth: 120 }} />
            <TextField label="Precio Mínimo" type="number" value={precioMin} onChange={handlePrecioMinChange} sx={{ minWidth: 120 }} />
            <TextField label="Precio Máximo" type="number" value={precioMax} onChange={handlePrecioMaxChange} sx={{ minWidth: 120 }} />
          </Box>
        </DialogContent>
        <DialogActions>
        <Button onClick={limpiarFiltros}>Limpiar Filtros</Button>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={aplicarFiltros}>Aplicar Filtros</Button>
        </DialogActions>
      </Dialog>

      {/* Listado de Autos Filtrados */}
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {autosFiltrados.map((auto) => (
          <Box key={auto.id} sx={{ flex: '1 0 30%', cursor: 'pointer', maxWidth: '300px', margin: '10px' }}>
            <button
              onClick={() => handleClick(auto.id)}
              style={{ all: 'unset', width: '100%' }}
            >
              <Card sx={{ boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
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
                    Color: {auto.color}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Año: {auto.año}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Kilometraje: {auto.kilometraje.toLocaleString()} km
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ubicación: {auto.ubicacion}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: ${auto.precio.toLocaleString()} {auto.moneda}
                  </Typography>
                </CardContent>
              </Card>
            </button>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Listado;
