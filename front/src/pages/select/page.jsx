import React, { useState } from 'react';
import Modelo from "./modelo";
import './page.css';
import { MenuItem, FormControl, Select as MuiSelect, InputLabel } from '@mui/material';

export default function Select() {
    const [selectedCar, setSelectedCar] = useState('golf');

    const handleChange = (event) => {
        setSelectedCar(event.target.value);
    };

    return (
        <div>
            <h1>Select</h1>
            <h2>Nuestros Mejores Autos</h2>
            {/* Dropdown para seleccionar el auto */}
            <FormControl variant="outlined" style={{ minWidth: 200, marginBottom: '20px' }}>
                <InputLabel>Seleccionar Auto</InputLabel>
                <MuiSelect
                    value={selectedCar}
                    onChange={handleChange}
                    label="Seleccionar Auto"
                >
                    <MenuItem value="golf">Golf</MenuItem>
                    <MenuItem value="corolla">Corolla</MenuItem>
                </MuiSelect>
            </FormControl>
            
            {/* Contenedor que muestra el auto seleccionado */}
            <div className="div-modelo" key={selectedCar}>
                <Modelo auto={selectedCar} className='modelo'></Modelo>
            </div>
        </div>
    );
}
