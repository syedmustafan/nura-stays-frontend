/**
 * Admin dashboard layout with sidebar navigation.
 */
import React, { useState } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, AppBar, Toolbar, Typography, IconButton, useMediaQuery,
  useTheme, Divider, Button,
} from '@mui/material';
import {
  Dashboard, Home, RateReview, People, ContactMail, Menu as MenuIcon,
  Logout, ChevronLeft,
} from '@mui/icons-material';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 260;

const menuItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: <Dashboard /> },
  { label: 'Properties', path: '/admin/properties', icon: <Home /> },
  { label: 'Reviews', path: '/admin/reviews', icon: <RateReview /> },
  { label: 'Leads', path: '/admin/leads', icon: <ContactMail /> },
  { label: 'Team', path: '/admin/team', icon: <People /> },
];

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #FF6B35 0%, #D4AF37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Nura Stays
        </Typography>
        {isMobile && (
          <IconButton onClick={() => setMobileOpen(false)}>
            <ChevronLeft />
          </IconButton>
        )}
      </Box>
      <Typography variant="caption" sx={{ px: 2.5, color: 'text.secondary', mb: 2 }}>
        Admin Panel
      </Typography>
      <Divider />
      <List sx={{ flex: 1, px: 1, pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={() => isMobile && setMobileOpen(false)}
              sx={{
                borderRadius: 2,
                py: 1.2,
                bgcolor: location.pathname === item.path ? 'rgba(255,107,53,0.08)' : 'transparent',
                color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                '&:hover': {
                  bgcolor: 'rgba(255,107,53,0.06)',
                  color: 'primary.main',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: location.pathname === item.path ? 700 : 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
          {user?.name || 'Admin'}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
          {user?.email}
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          size="small"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F5F5F7' }}>
      {/* Sidebar */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{ sx: { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              width: drawerWidth,
              borderRight: '1px solid rgba(0,0,0,0.06)',
              bgcolor: '#fff',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content */}
      <Box sx={{ flex: 1, ml: { md: `${drawerWidth}px` } }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: '#F5F5F7',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ mr: 1, color: 'text.primary' }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              {menuItems.find((item) => item.path === location.pathname)?.label || 'Admin'}
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Button component={Link} to="/" size="small" variant="text" sx={{ color: 'text.secondary' }}>
              View Site →
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
