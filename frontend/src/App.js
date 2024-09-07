import React, { useState } from 'react';
import Header from './components/Header';
import CarList from './components/CarList';

const App = () => {
    // Estado para capturar el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // Función que maneja la búsqueda cuando se envía el formulario
    const handleSearch = (event) => {
        event.preventDefault();
        // Aquí puedes manejar la lógica de búsqueda
        console.log('Buscando:', searchTerm);
        // Si deseas hacer algo con los datos de búsqueda, puedes agregar la lógica aquí.
    }

    return (
        <div className="App">
            <Header />
            <main>
                

                {/* Barra de búsqueda */}
                <div className="search-container">
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="Buscar autos..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">Buscar</button>
                    </form>
                </div>
                <h1>Lista de Autos</h1>
                {/* Componente que muestra la lista de autos */}
                <CarList searchTerm={searchTerm} />
            </main>

            {/* Footer con más contenido y enlaces sociales */}
            <footer className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Concesionario</h3>
                        <p>© 2024 Concesionario. Todos los derechos reservados.</p>
                        <p>Desarrollado por AutoExpress</p>
                    </div>
                    <div className="footer-section">
                        <h3>Redes Sociales</h3>
                        <ul className="social-links">
                            <li><a href="#"><i className="fab fa-facebook-f"></i> Facebook</a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contacto</h3>
                        <p>📞 +123 456 7890</p>
                        <p>📧 info@concesionario.com</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
