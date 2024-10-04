import React from 'react';
import data from '../../assets/models/publicacion.json';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';

export default function Publicacion() {
    let auto = data.auto;

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
                            <Button variant='contained' color='primary'>Comprar</Button>
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
