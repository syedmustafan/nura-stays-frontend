/**
 * Footer component for Nura Stays.
 */
import React from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { Email, Phone, Instagram, Facebook, Twitter, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Properties', path: '/properties' },
    { label: 'About Us', path: '/about' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Meet the Team', path: '/team' },
  ];

  const supportLinks = [
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Privacy Policy', path: '#' },
    { label: 'Terms of Service', path: '#' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1A1A1A',
        color: '#FFFFFF',
        pt: { xs: 6, md: 8 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box
  component="img"
  src="/nurastays.png"
  alt="Nura Stays"
  sx={{
    height: 120,        // adjust if you want bigger/smaller
    width: 'auto',
    mb: 1,
    objectFit: 'contain',
  }}
/>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, maxWidth: 300 }}>
              Your home away from home. Premium short-term accommodation with hotel-level comfort and the privacy of your own space.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[Instagram, Facebook, Twitter, LinkedIn].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    color: 'rgba(255,255,255,0.6)',
                    '&:hover': { color: '#C6A75E', bgcolor: 'rgba(255,107,53,0.1)' },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.95rem' }}>
              Quick Links
            </Typography>
            {quickLinks.map((link) => (
              <MuiLink
                key={link.path}
                component={Link}
                to={link.path}
                sx={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  py: 0.5,
                  fontSize: '0.9rem',
                  '&:hover': { color: '#C6A75E' },
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </MuiLink>
            ))}
          </Grid>

          {/* Support */}
          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.95rem' }}>
              Support
            </Typography>
            {supportLinks.map((link) => (
              <MuiLink
                key={link.label}
                component={Link}
                to={link.path}
                sx={{
                  display: 'block',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  py: 0.5,
                  fontSize: '0.9rem',
                  '&:hover': { color: '#C6A75E' },
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </MuiLink>
            ))}
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.95rem' }}>
              Get in Touch
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Email sx={{ fontSize: 18, color: '#C6A75E' }} />
              <MuiLink
                href="mailto:info@nurastays.com"
                sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: '#C6A75E' } }}
              >
                info@nurastays.com
              </MuiLink>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Phone sx={{ fontSize: 18, color: '#C6A75E' }} />
              <MuiLink
                href="tel:+447000000000"
                sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: '#C6A75E' } }}
              >
                +44 700 000 0000
              </MuiLink>
            </Box>
            <Box
              component="a"
              href="https://wa.me/447000000000?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Nura%20Stays%20properties."
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mt: 1,
                px: 3,
                py: 1,
                bgcolor: '#25D366',
                color: '#fff',
                borderRadius: 2,
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                '&:hover': { bgcolor: '#20BD5A' },
                transition: 'all 0.2s',
              }}
            >
              💬 WhatsApp Us
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            © {currentYear} Nura Stays. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
            Crafted with care for exceptional stays.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
