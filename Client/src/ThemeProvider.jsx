import React, { createContext, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a context to pass the toggle function
const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Custom hook to use our color mode context
export const useColorMode = () => useContext(ColorModeContext);

const CustomThemeProvider = ({ children }) => {
  const mode = 'dark'; // Permanently set to dark mode

  // Create MUI theme based on the current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
          background: {
            default: '#0d1117', // GitHub dark mode background color
            paper: '#161b22', // GitHub dark mode paper color
          },
          text: {
            primary: '#c9d1d9', // GitHub dark mode text color
          },
        },
        transitions: {
          duration: {
            standard: 3000,
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: 'background-color 3s ease, color 3s ease',
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ColorModeContext.Provider value={{ toggleColorMode: () => {} }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;
