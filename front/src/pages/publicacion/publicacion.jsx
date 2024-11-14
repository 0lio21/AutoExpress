import React from 'react';
import data from '/public/listado.json';  // Asegúrate de que la ruta sea correcta
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Publicacion() {
    const { id } = useParams();
    console.log(id);
    console.log(data);

    // Verifica que el archivo JSON tenga los datos esperados
    if (!data || !Array.isArray(data.autos)) {
        return <Box display="flex" justifyContent="center" style={{ marginTop: '20px' }}>
            <Typography variant="h6" color="error">No se encontraron autos disponibles</Typography>
        </Box>;
    }

    // Buscar el auto correspondiente al id
    let auto = data.autos.find(auto => auto.id === parseInt(id, 10));  // Usar base 10 para parsear el id
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
            <Box display="flex" justifyContent="center" style={{ marginTop: '20px', width: '100%'}}>
                <Card style={{ display: 'flex', width: '100%' }}>
                    <CardMedia
                        component="img"
                        alt={auto.marca}
                        height="300"
                        image={auto.imagen}
                        style={{ width: '50%', objectFit: 'cover',height:'500px' }}
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

                        {/* Información adicional */}
                        <Typography variant="body2" color="text.secondary">
                            <strong>Descripción:</strong> {auto.descripcion}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Motor:</strong> {auto.motor}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Potencia:</strong> {auto.potencia}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Puertas:</strong> {auto.puertas}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Asientos:</strong> {auto.asientos}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Consumo:</strong> {auto.consumo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Tipo de combustible:</strong> {auto.tipo_combustible}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Aire acondicionado:</strong> {auto.aire_acondicionado}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Última revisión:</strong> {auto.ultima_revision}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Propietarios previos:</strong> {auto.propietarios_previos}
                        </Typography>
                        
                        {/* Equipamiento y Seguridad */}
                        <Typography variant="body2" color="text.secondary">
                            <strong>Equipamiento:</strong> {auto.equipamiento.join(', ')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Seguridad:</strong> {auto.seguridad.join(', ')}
                        </Typography>

                        <Box display='flex' gap='10px' marginTop='20px'>
                            {/* Botón para redirigir a WhatsApp */}
                            <Button variant='contained' color='primary' onClick={() => window.open(urlWhatsApp, '_blank')}>
                                Comprar
                            </Button>
                            
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Box>
                <p>Más detalles: </p>
            </Box>
        </>
    );
}
