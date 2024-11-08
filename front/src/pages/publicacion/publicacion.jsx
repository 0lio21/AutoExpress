import React from 'react';
import data from '/public/listado.json';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Publicacion() {
    const { id } = useParams();
    console.log(id);
    console.log(data);
    console.log(data.autos[0]);

    // Buscar el auto correspondiente al id
    let auto = data.autos.find(auto => auto.id === Number(id));
    console.log(auto);

    // Si no se encuentra el auto, mostrar un mensaje de error
    if (!auto) {
        return (
            <Box display="flex" justifyContent="center" style={{ marginTop: '20px' }}>
                <Typography variant="h6" color="error">Auto no encontrado</Typography>
            </Box>
        );
    }

    // Crear el enlace de WhatsApp con el mensaje predefinido
    const mensaje = `Hola, buenas tardes. Estoy interesado en comprar el ${auto.marca} ${auto.modelo}.`;
    const numeroWhatsApp = '+5491158785080';  // Reemplaza con el número de teléfono de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    return (
        <>
            <h1>Publicación</h1>
            <Box display="flex" justifyContent="center" style={{ marginTop: '20px', width: '100%' }}>
                <Card style={{ display: 'flex', width: '100%' }}>
                    <CardMedia
                        component="img"
                        alt={auto.marca}
                        height="300"
                        image={auto.imagen}
                        style={{ width: '50%', objectFit: 'cover' }}
                    />
                    <CardContent style={{ width: '50%' }}>
                        <Typography variant="h5" component="div">
                            {`${auto.marca} ${auto.modelo}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Año:</strong> {auto.año}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Kilometraje:</strong> {auto.kilometraje} km
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Precio:</strong> {auto.precio.toLocaleString()} {auto.moneda}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Color:</strong> {auto.color}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Transmisión:</strong> {auto.transmision}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Ubicación:</strong> {auto.ubicacion}
                        </Typography>
                        <Box display='flex' gap='10px' marginTop='20px'>
                            {/* Botón para redirigir a WhatsApp */}
                            <Button variant='contained' color='primary' onClick={() => window.open(urlWhatsApp, '_blank')}>
                                Comprar
                            </Button>
                            <Button variant='outlined' color='secondary'>Detalles</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Box>
                <p>Mas detalles: </p>
            </Box>
        </>
    );
}
