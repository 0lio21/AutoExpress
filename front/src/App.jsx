import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './pages/header/header';
import './App.css';
import Inicio from './pages/inicio/page';
import Contacto from './pages/contacto/page';
import Footer from './pages/footer/footer';
import { Public } from '@mui/icons-material';
import Publicacion from './pages/publicacion/publicacion';
import Select from './pages/select/page';


function App() {
  const [themeMode, setThemeMode] = useState('light');

  // Crear tema basado en el estado de modo
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: themeMode,
      },
    }),
    [themeMode]);

  // Función para alternar entre claro y oscuro
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {/* Pasamos la función toggleTheme y el tema actual al Header */}
        <Header page={'inicio'} toggleTheme={toggleTheme} currentTheme={themeMode} />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/publicacion" element={<Publicacion id={0} />} />
          <Route path="/select" element={<Select />} />
          {/* <Route path='/modelo3d' element={<Modelo/>} /> */}
          {/* Puedes agregar más rutas aquí si lo deseas */}
        </Routes>
      </Router>
      <div>
        <Footer />
          
        
      </div>
    </ThemeProvider>
  );
}

export default App;
