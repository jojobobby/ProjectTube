import React from 'react';
import { Box, Button, useTheme } from '@mui/material';

const Notification = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: 32, backgroundColor: theme.palette.text.primary, color: theme.palette.background.default, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
      Free until further notice. <Button color="inherit" sx={{ ml: 1 }}>Learn More</Button>
    </Box>
  );
};

export default Notification;
