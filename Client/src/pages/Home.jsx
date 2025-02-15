import React, { useState } from 'react';
import { Container, Box, TextField, InputAdornment, IconButton } from '@mui/material';
import CustomTypography from '../muiStyles/TypographyStyles';
import { useTheme } from '@mui/material/styles';
import { Send as SendIcon } from '@mui/icons-material';

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
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.mode === 'light' ? theme.palette.background.default : '#0d1117', color: theme.palette.text.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', p: 2 }}>
        {/* Application Title */}
        <CustomTypography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
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
            sx={{ mb: 2, minWidth: '300px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSignup} color="primary">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
