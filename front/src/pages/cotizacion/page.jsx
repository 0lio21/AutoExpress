import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function Cotizacion() {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [precioMinimo, setPrecioMinimo] = useState(null);
  const [precioMaximo, setPrecioMaximo] = useState(null);
  const [moneda, setMoneda] = useState("ARS"); // Moneda final en ARS
  const [cargando, setCargando] = useState(false);
  const [tipoCambio, setTipoCambio] = useState(350); // Tipo de cambio inicial (puede actualizarse)

  useEffect(() => {
    // Llamada para obtener el tipo de cambio actual de USD a ARS
    const fetchTipoCambio = async () => {
      try {
        const response = await fetch(
          `https://api.exchangeratesapi.io/latest?base=USD&symbols=ARS`
        );
        const data = await response.json();
        setTipoCambio(data.rates.ARS); // Actualizamos el tipo de cambio con el valor de la API
      } catch (error) {
        console.error("Error al obtener el tipo de cambio:", error);
      }
    };

    fetchTipoCambio();
  }, []);

  const handleCalcularPrecio = async () => {
    setCargando(true);
    const query = `${marca} ${modelo} ${anio}`;
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(query)}&category=MLA1744&condition=used&limit=10`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Obtener precios y convertir a ARS si es necesario
        const precios = data.results.map((item) => {
          if (item.currency_id === "USD") {
            return item.price * tipoCambio; 
          }
          return item.price; // Dejar en ARS si ya está en pesos
        });

        const precioMin = Math.min(...precios);
        const precioMax = Math.max(...precios);

        setPrecioMinimo(precioMin.toFixed(2));
        setPrecioMaximo(precioMax.toFixed(2));
      } else {
        setPrecioMinimo("No se encontraron resultados");
        setPrecioMaximo("");
      }
    } catch (error) {
      console.error("Error al obtener datos de Mercado Libre:", error);
      setPrecioMinimo("Error al obtener datos");
      setPrecioMaximo("");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cotización de tu Auto
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </Grid>
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Kilometraje"
            type="number"
            value={kilometraje}
            onChange={(e) => setKilometraje(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCalcularPrecio}
            disabled={cargando}
          >
            {cargando ? <CircularProgress size={24} /> : "Calcular Rango de Precio"}
          </Button>
        </Grid>
      </Grid>

      {precioMinimo && precioMaximo && (
        <Box mt={4}>
          <Typography variant="h6">
            Rango de Precio Estimado: {moneda} ${precioMinimo} - ${precioMaximo}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              const url = `https://wa.me/5491158785080?text=Hola,%20mi%20auto%20tiene%20los%20siguientes%20datos:%0AMarca:%20${marca}%0AModelo:%20${modelo}%0AAño:%20${anio}%0AKilometraje:%20${kilometraje}%0ARango%20de%20Precio%20Estimado:%20${moneda}%20${precioMinimo}%20-%20${precioMaximo}`;
              window.open(url, "_blank");
            }}
          >
            Solicitar Cotización Específica en WhatsApp
          </Button>
        </Box>
      )}
    </Box>
  );
}
