// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'; 
import Trim from '../pages/VideoEditor'; 
import Navbar from '../components/Header';
import Footer from '../components/Footer';

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Trim />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default AppRouter;