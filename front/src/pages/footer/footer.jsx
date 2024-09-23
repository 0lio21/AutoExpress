import React from 'react';
import { Container, Typography, Box, IconButton, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import DriveEtaSharpIcon from '@mui/icons-material/DriveEtaSharp';
import './footer.css'


const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box 
          display="grid" 
          gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }} 
          gap={2}
        >
          <Box>
            <Typography variant="h6">Sobre Nosotros</Typography>
            <Typography variant="body2">
              Somos un concesionario que vende autos al triple de precio + IVA.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">Enlaces Útiles</Typography>
            <Link href="#" variant="body2" color="inherit">
              Servicios
            </Link>
            <br />
            <Link href="#" variant="body2" color="inherit">
              Contacto
            </Link>
            <br />
            <Link href="#" variant="body2" color="inherit">
              Política de privacidad
            </Link>
          </Box>

          <Box>
            <Typography variant="h6">Síguenos</Typography>
            <IconButton aria-label="Facebook" color="inherit" href="https://facebook.com">
              <Facebook />
            </IconButton>
            <IconButton aria-label="Twitter" color="inherit" href="https://twitter.com">
              <Twitter />
            </IconButton>
            <IconButton aria-label="Instagram" color="inherit" href="https://instagram.com">
              <Instagram />
            </IconButton>
            <IconButton aria-label="LinkedIn" color="inherit" href="https://linkedin.com">
              <LinkedIn />
            </IconButton>
            <Link href="/select" underline='none' color='textSecondary'>
            <Typography variant="h5" className='select'>
              AutoExpress Select
            </Typography>
            
            </Link>
          </Box>
        </Box>

        <Box mt={4}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'© '} {new Date().getFullYear()} AutoExpress. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
