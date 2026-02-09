/**
 * Meet the Team page.
 */
import React, { useState, useEffect } from 'react';
import {
  Box, Container, Grid, Typography, Card, CardContent, CardMedia,
  IconButton, Skeleton,
} from '@mui/material';
import { LinkedIn, Twitter, Instagram } from '@mui/icons-material';
import { teamAPI } from '../services/api';

const TeamPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const { data } = await teamAPI.getAll();
        setMembers(data);
      } catch (err) {
        console.error('Error loading team:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  const socialIcons = {
    linkedin: <LinkedIn />,
    twitter: <Twitter />,
    instagram: <Instagram />,
  };

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: 'linear-gradient(135deg, #FFF8F3 0%, #F5E6D3 100%)', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
            Meet the Team
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: 600, mx: 'auto' }}>
            The passionate people behind Nura Stays who work tirelessly to make your stay exceptional.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box>
          {loading ? (
            <Grid container spacing={4}>
              {[1, 2, 3, 4].map((i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Card>
                    <Skeleton variant="rectangular" height={280} />
                    <CardContent>
                      <Skeleton width="60%" height={28} />
                      <Skeleton width="40%" height={20} />
                      <Skeleton width="100%" height={60} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {members.map((member) => (
                <Grid item xs={12} sm={6} md={3} key={member.id}>
                  <Card
                    className="card-animate-in team-card"
                    sx={{
                      height: '100%',
                      textAlign: 'center',
                      overflow: 'hidden',
                      '&:hover .team-photo': { transform: 'scale(1.05)' },
                    }}
                  >
                    <Box sx={{ overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height={280}
                        image={member.photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=FF6B35&color=fff&bold=true`}
                        alt={member.name}
                        className="team-photo"
                        sx={{ transition: 'transform 0.5s ease', objectFit: 'cover' }}
                      />
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, mb: 1.5 }}>
                        {member.role}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2, fontSize: '0.85rem' }}>
                        {member.bio?.substring(0, 150)}{member.bio?.length > 150 ? '...' : ''}
                      </Typography>
                      {member.social_links && Object.keys(member.social_links).length > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                          {Object.entries(member.social_links).map(([platform, url]) => (
                            <IconButton
                              key={platform}
                              component="a"
                              href={url}
                              target="_blank"
                              size="small"
                              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                            >
                              {socialIcons[platform] || null}
                            </IconButton>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default TeamPage;
