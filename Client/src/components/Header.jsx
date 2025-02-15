import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../App';

const Header = () => {
  const theme = useTheme();
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ borderBottom: '0.75px solid #e0e0e0' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ textAlign: 'left', flexGrow: 1, fontWeight: 'bold' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            ProjectTube
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          {user ? (
            <>
              <Button component={Link} to="/video-editor" color="inherit">
                Editor
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
