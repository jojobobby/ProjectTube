import React, { useState, useContext, createContext, useEffect } from 'react';
import CustomThemeProvider from './ThemeProvider';
import AppRouter from './router/AppRouter';

const UserContext = createContext({ user: {}, setUser: () => {} });

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  return (
    <CustomThemeProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <AppRouter />
      </UserContext.Provider>
    </CustomThemeProvider>
  );
};

export const useUser = () => useContext(UserContext);

export default App;
