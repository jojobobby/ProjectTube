import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../ThemeProvider';
import { Link } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <AppBar position="static" sx={{ borderBottom: '0.75px solid #e0e0e0' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ textAlign: 'left', flexGrow: 1, fontWeight: 'bold' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            ProjectTube
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
          <Button component={Link} to="/video-editor" color="inherit">
            Editor
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7 sx={{ color: '#ffeb3b' }} /> : <Brightness4 sx={{ color: '#000000' }} />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
