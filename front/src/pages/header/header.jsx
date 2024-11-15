import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Divider, Box, InputBase, useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon, Brightness4 as Brightness4Icon, Brightness7 as Brightness7Icon,
  Search as SearchIcon, LocalOffer as LocalOfferIcon, DirectionsCar as DirectionsCarIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const menuItems = [
  { text: 'Ofertas', icon: <LocalOfferIcon />, to: '/ofertas' },
  { text: 'Listado', icon: <DirectionsCarIcon />, to: '/listado' },
  { text: 'Cotiza tu Auto', icon: <AttachMoneyIcon />, to: '/cotizacion' },
];

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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    [theme.breakpoints.up('md')]: { width: '20ch' },
  },
}));

const Header = ({ toggleTheme, currentTheme, page }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/public/listado.json');
        const jsonData = await response.json();
        setData(jsonData.autos); // Asigna el array de autos directamente
      } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredResults = data.filter((auto) =>
      auto.marca.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleResultClick = (id) => {
    navigate(`/publicacion/${id}`);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    /* { text: 'Ofertas', icon: <LocalOfferIcon />, to: '/ofertas' }, */
    { text: 'Listado', icon: <DirectionsCarIcon />, to: '/listado' },
    { text: 'Cotiza tu Auto', icon: <AttachMoneyIcon />, to: '/cotizacion' },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Concesionario
            </RouterLink>
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar por marca…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchResults.length > 0 && (
              <Box sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'white', zIndex: 2, boxShadow: 1 }}>
                {searchResults.map((result) => (
                  <ListItem
                    key={result.id}
                    button
                    onClick={() => handleResultClick(result.id)}
                    style={{ color: "black" }}
                  >
                    <div className='d-flex'>
                      <img src={result.imagen} alt="" width={100} srcset="" />
                    <p className='text-center'>
                      {"ㅤ" + result.marca + " " + result.modelo}
                    </p>
                    </div>
                  
                  </ListItem>
                ))}
              </Box>
            )}
          </Search>

          {!isSmallScreen && page === 'inicio' && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              {menuItems.map((item) => (
                <Button key={item.text} href={item.to} color="inherit" startIcon={item.icon}>
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <Button color="inherit">Iniciar Sesión</Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          <Typography variant="h6" sx={{ padding: 2 }}>
            Menú
          </Typography>
          <Divider />
          {menuItems.map((item) => (
            <ListItem button component={RouterLink} to={item.to} key={item.text} onClick={handleDrawerToggle}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
