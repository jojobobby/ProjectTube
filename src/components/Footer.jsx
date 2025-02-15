// src/components/Footer.jsx 
import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, useTheme } from '@mui/material';
import { Twitter, LinkedIn, Facebook, Instagram } from '@mui/icons-material'; 

const Footer = () => {
  const theme = useTheme(); 

  return (
    <Box
      component="footer"
      sx={{ 
        backgroundColor: theme.palette.background.paper, 
        color: theme.palette.text.primary,
        pt: 6, 
        pb: 6, 
        borderTop: '1px solid',
        width: '100%'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Your Company
            </Typography>
            <Typography variant="body2" color="text.primary">
              Building innovative solutions for tomorrow.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/about" variant="body2" color="inherit" underline="hover">
              About Us
            </Link>
            <br />
            <Link href="/services" variant="body2" color="inherit" underline="hover">
              Services
            </Link>
            <br />
            <Link href="/careers" variant="body2" color="inherit" underline="hover">
              Careers
            </Link>
            <br />
            <Link href="/contact" variant="body2" color="inherit" underline="hover">
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect
            </Typography>
            <IconButton href="https://twitter.com" color="inherit">
              <Twitter />
            </IconButton>
            <IconButton href="https://linkedin.com" color="inherit">
              <LinkedIn />
            </IconButton>
            <IconButton href="https://facebook.com" color="inherit">
              <Facebook />
            </IconButton>
            <IconButton href="https://instagram.com" color="inherit">
              <Instagram />
            </IconButton>
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="body2" color="text.primary">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;