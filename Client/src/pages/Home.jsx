import React, { useState } from 'react';
import { Container, Box, TextField, Button } from '@mui/material';
import CustomTypography from '../muiStyles/TypographyStyles';
import { useTheme } from '@mui/material/styles';

function Home() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignup = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    // Implement signup logic here
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', p: 2 }}>
        {/* Application Title */}
        <CustomTypography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          Edit Videos Together on a Single Quick Access Website
        </CustomTypography>

        {/* Join Now */}
        <CustomTypography variant="body1" gutterBottom sx={{ mb: 4, color: theme.palette.text.primary }}>
          Join now to start editing videos with your team.
        </CustomTypography>

        {/* Email Signup */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSignup} sx={{ mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
