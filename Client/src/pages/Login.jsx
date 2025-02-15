import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useUser } from '../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const theme = useTheme();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    // For demonstration, we'll just set a dummy user
    const dummyUser = { name: 'John Doe', email: 'john.doe@example.com' };
    setUser(dummyUser);
    navigate('/video-editor');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Login to ProjectTube
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{ mt: 4 }}
        >
          Login with Google
        </Button>
      </Container>
    </Box>
  );
};

export default Login;
