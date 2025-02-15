import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home'; 
import Trim from '../pages/VideoEditor'; 
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Navbar from '../components/Header';
import Footer from '../components/Footer';
import { useUser } from '../App';
import Converter from '../pages/Converter';

function AppRouter() {
  const { user } = useUser();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/video-editor" element={user ? <Trim /> : <Navigate to="/login" />} />
        <Route path="/converter" element={user ? <Converter /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;
