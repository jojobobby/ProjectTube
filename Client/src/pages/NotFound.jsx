import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', p: 2, pt: 8 }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center', p: 2, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ mt: 4 }}
        >
          Go to Home
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;
