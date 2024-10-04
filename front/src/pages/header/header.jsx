import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Link } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Iconos de MUI para reemplazar los emojis
import LocalOfferIcon from '@mui/icons-material/LocalOffer';  // Reemplaza a 'Ofertas'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';  // Reemplaza a 'Nuevos Modelos'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';  // Reemplaza a 'Financiamiento'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',  // Tamaño del cuadro de búsqueda reducido
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = ({ page, toggleTheme, currentTheme }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Función para manejar búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.example.com/search?q=${searchQuery}`);
      const data = await response.json();
      console.log(data); // Aquí procesarías los datos devueltos
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };
  const handleListadoClick = () => {
    navigate('./listado'); // Redirigir a la página de Listado
  };

  const menuItems = [
    { text: 'Ofertas', icon: <LocalOfferIcon /> },
    { text: 'Listado', icon: <DirectionsCarIcon />, onclick: handleListadoClick},
    { text: 'Financiamiento', icon: <AttachMoneyIcon /> },
  ];

  const additionalItems = ['Tienda', 'Ubicación', 'Soporte Técnico', 'FAQ'];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Título del concesionario */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
            Concesionario
            </Link>
          </Typography>

          {/* Cuadro de búsqueda con tamaño reducido */}
          <form onSubmit={handleSearch} style={{ display: 'inline' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Buscar…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Search>
          </form>

          {/* Opciones del menú */}
          {!isSmallScreen && page === 'inicio' && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              {menuItems.map((item) => (
                <Button key={item.text} color="inherit" startIcon={item.icon}>
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Botón para alternar entre modo claro y oscuro */}
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Login siempre visible */}
          <Button color="inherit">Iniciar Sesión</Button>
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar) para pantallas pequeñas y hamburguesa */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          <Typography variant="h6" sx={{ padding: 2 }}>
            Menú
          </Typography>
          <Divider />
          {/* Menú principal con íconos */}
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={handleDrawerToggle}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <Divider />
          {/* Opciones adicionales */}
          {additionalItems.map((item) => (
            <ListItem button key={item} onClick={handleDrawerToggle}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
