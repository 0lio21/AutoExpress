import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RespuestaInspector from "../respuesta/respuestaInspector";

const Input = styled('input')({
  display: 'none',
});

export default function Cotizacion() {
  const [seleccionarArchivos, setSeleccionarArchivos] = useState([]);
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [anio, setAnio] = useState('');
  const [transmision, setTransmision] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [respuestaInspector, setRespuestaInspector] = useState("");


  const handleArchivoChange = (e) => {
    setSeleccionarArchivos(e.target.files);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (seleccionarArchivos.length === 0) {
      alert('Por favor, envía imágenes de tu vehículo');
      return;
    }

    setCargando(true);
    const formData = new FormData();
    for (let i = 0; i < seleccionarArchivos.length; i++) {
      formData.append('imagenes', seleccionarArchivos[i]);
    }
    formData.append('marca', marca);
    formData.append('modelo', modelo);
    formData.append('anio', anio);
    formData.append('kilometraje', kilometraje);
    formData.append('transmision', transmision);
    formData.append('descripcion', descripcion);

    try {
      const response = await fetch('https://backend-cotizacion', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMensaje('Tu cotización ha sido enviada. Recibirás una respuesta pronto.');
      } else {
        setMensaje('Hubo un problema al enviar tu cotización. Intenta más tarde.');
        console.log('Error al enviar la cotización', response.statusText);
      }
    } catch (error) {
      setMensaje('Hubo un problema al enviar tu cotización. Intenta más tarde.');
      console.log('Error al enviar la cotización', error);
    } finally {
      setCargando(false);
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cotización de tu Auto
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Campo de Marca */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              required
            />
          </Grid>

          {/* Campo de Modelo */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              required
            />
          </Grid>

          {/* Campo de Año */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Año"
              type="number"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              required
            />
          </Grid>

          {/* Campo de Kilometraje */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Kilometraje"
              type="number"
              value={kilometraje}
              onChange={(e) => setKilometraje(e.target.value)}
              required
            />
          </Grid>

          {/* Campo de Transmisión */}
          <Grid item xs={12} sm={6}>
            <InputLabel id="transmision-label">Transmisión</InputLabel>
            <Select
              labelId="transmision-label"
              fullWidth
              value={transmision}
              onChange={(e) => setTransmision(e.target.value)}
              required
            >
              <MenuItem value="manual">Manual</MenuItem>
              <MenuItem value="automatica">Automática</MenuItem>
            </Select>
          </Grid>

          {/* Campo de Descripción */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción Adicional"
              multiline
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Grid>

          {/* Subir imágenes */}
          <Grid item xs={12}>
            <InputLabel htmlFor="upload-images">
              Sube imágenes de tu auto
            </InputLabel>
            <label htmlFor="upload-images">
              <Input
                id="upload-images"
                multiple
                type="file"
                onChange={handleArchivoChange}
              />
              <Button variant="contained" component="span">
                Subir Imágenes
              </Button>
            </label>
          </Grid>

          {/* Botón para enviar el formulario */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={cargando}
            >
              {cargando ? <CircularProgress size={24} /> : 'Enviar Cotización'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Mostrar mensaje de éxito o error */}
      {mensaje && (
        <Box mt={4}>
          <Typography variant="h6">{mensaje}</Typography>
        </Box>
      )}
      {/* Mostrar la respuesta del inspector, si está disponible */}
      {respuestaInspector && (
        <Box mt={4}>
          <Typography variant="h6">Respuesta del Inspector:</Typography>
          <RespuestaInspector setRespuestaInspector={setRespuestaInspector} />
        </Box>
      )}

    </Box>
  );
}
