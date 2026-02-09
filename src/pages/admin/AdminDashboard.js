/**
 * Admin dashboard overview page with stats.
 */
import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, Typography, Skeleton,
} from '@mui/material';
import { Home, RateReview, Star, People } from '@mui/icons-material';
import { adminAuthAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await adminAuthAPI.dashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statCards = [
    {
      label: 'Total Properties',
      value: stats?.total_properties,
      sub: `${stats?.active_properties || 0} active`,
      icon: <Home />,
      color: '#FF6B35',
      bg: '#FFF0E6',
    },
    {
      label: 'Total Reviews',
      value: stats?.total_reviews,
      sub: `${stats?.approved_reviews || 0} approved`,
      icon: <RateReview />,
      color: '#25D366',
      bg: '#E8F8EF',
    },
    {
      label: 'Average Rating',
      value: stats?.average_rating || '—',
      sub: 'out of 5.0',
      icon: <Star />,
      color: '#FFB400',
      bg: '#FFF8E1',
    },
    {
      label: 'Team Members',
      value: stats?.total_team_members,
      sub: 'active members',
      icon: <People />,
      color: '#7C4DFF',
      bg: '#EDE7F6',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Welcome Back 👋
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Here's an overview of your Nura Stays dashboard.
      </Typography>

      <Grid container spacing={3}>
        {statCards.map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            {loading ? (
              <Card sx={{ p: 3 }}>
                <Skeleton height={80} />
              </Card>
            ) : (
              <Card sx={{ p: 3, border: '1px solid rgba(0,0,0,0.04)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: card.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                  {card.label}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {card.sub}
                </Typography>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
