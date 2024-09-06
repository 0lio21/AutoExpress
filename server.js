const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

// Configurar la conexión a la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

sequelize.authenticate().then(() => {
    console.log('Conexión a la base de datos establecida.');
}).catch(err => {
    console.error('Error al conectar a la base de datos:', err);
});

// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido al concesionario');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
app.get('/api/cars', (req, res) => {
    const cars = [
        { id: 1, brand: 'Toyota', model: 'Yaris', year: 2020, price: 1200000, image: 'url_image_1' },
        { id: 2, brand: 'Ford', model: 'Focus', year: 2019, price: 1500000, image: 'url_image_2' },
        // Agrega más autos aquí
    ];
    res.json(cars);
});
