import React, { useState, useContext, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import VideoEditor from './pages/VideoEditor';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomThemeProvider from './ThemeProvider';

const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <CustomThemeProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/video-editor" element={user ? <VideoEditor /> : <Navigate to="/login" />} />
          </Routes>
          <Footer />
        </Router>
      </UserContext.Provider>
    </CustomThemeProvider>
  );
};