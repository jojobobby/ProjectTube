import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();

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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
