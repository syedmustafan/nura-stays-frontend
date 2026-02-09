/**
 * Main navigation bar component.
 * Uses CSS-based responsive display for reliable mobile/desktop detection.
 */
import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Box, Button, IconButton, Drawer, List,
  ListItem, ListItemButton, ListItemText, Container,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Properties', path: '/properties' },
  { label: 'About', path: '/about' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Team', path: '/team' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 }, minHeight: { xs: 64, md: 72 } }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  fontSize: { xs: '1.5rem', md: '1.75rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #FF6B35 0%, #D4AF37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                Nura Stays
              </Box>
            </Box>

            {/* Desktop Nav - uses CSS class for reliable responsive display */}
            <Box className="desktop-nav" sx={{ alignItems: 'center', gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === link.path ? 700 : 500,
                    fontSize: '0.9rem',
                    px: 2,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: location.pathname === link.path ? '60%' : '0%',
                      height: 2,
                      bgcolor: 'primary.main',
                      borderRadius: 1,
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '60%',
                    },
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                component={Link}
                to="/properties"
                variant="contained"
                color="primary"
                sx={{ ml: 1, px: 3 }}
              >
                Book Now
              </Button>
            </Box>

            {/* Mobile Menu Button - uses CSS class for reliable responsive display */}
            <IconButton
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: '80%', maxWidth: 350, bgcolor: '#fff', pt: 2 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 2 }}>
          <Box sx={{ fontSize: '1.5rem', fontWeight: 800, color: 'primary.main' }}>
            Nura Stays
          </Box>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton
                component={Link}
                to={link.path}
                sx={{
                  py: 1.5,
                  px: 3,
                  color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === link.path ? 700 : 400,
                  borderLeft: location.pathname === link.path ? '3px solid' : '3px solid transparent',
                  borderColor: location.pathname === link.path ? 'primary.main' : 'transparent',
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ px: 3, mt: 2 }}>
            <Button
              component={Link}
              to="/properties"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Book Now
            </Button>
          </ListItem>
        </List>
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />
    </>
  );
};

export default Navbar;
