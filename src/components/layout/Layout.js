/**
 * Main layout wrapper with Navbar and Footer.
 * Includes scroll-reveal IntersectionObserver for animations.
 */
import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import useScrollReveal from '../../hooks/useScrollReveal';

const Layout = () => {
  useScrollReveal();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
