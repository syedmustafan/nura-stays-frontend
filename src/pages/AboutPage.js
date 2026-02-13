/**
 * About Nura Stays page with company story, values, and approach.
 */
import React from 'react';
import {
  Box, Container, Grid, Typography, Button, Card,
} from '@mui/material';
import {
  Favorite, TrendingUp, Handshake, Visibility, Hotel, Security,
  Star, EmojiPeople, ArrowForward,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/common/SectionTitle';

const AboutPage = () => {

  const values = [
    { icon: <Favorite />, title: 'Guest First', description: 'Every decision we make starts with our guests in mind. Your comfort and satisfaction are our top priorities.' },
    { icon: <Star />, title: 'Quality', description: 'We maintain the highest standards across all our properties, from cleanliness to amenities to design.' },
    { icon: <Handshake />, title: 'Trust', description: 'We build lasting relationships through transparency, reliability, and exceeding expectations.' },
    { icon: <TrendingUp />, title: 'Innovation', description: 'We continuously improve our service, leveraging technology to make your stay seamless and enjoyable.' },
  ];

  const services = [
    { icon: <Hotel />, title: 'Hotel-Level Comfort', description: 'Premium linens, fully equipped kitchens, smart TVs, and curated welcome packs.' },
    { icon: <Security />, title: 'Safe & Secure', description: 'All properties are fully insured, regularly inspected, and equipped with safety features.' },
    { icon: <EmojiPeople />, title: 'Personal Touch', description: 'Dedicated support, local recommendations, and attention to the little details that matter.' },
    { icon: <Visibility />, title: 'Transparency', description: 'Clear pricing with no hidden fees. What you see is what you get — and usually better.' },
  ];

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F4ECE3 100%)',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 3, mb: 2, display: 'block' }}
          >
            About Us
          </Typography>
          <Typography variant="h1" sx={{ mb: 3, fontSize: { xs: '2rem', md: '3rem' } }}>
            Creating Exceptional{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>Stays</Box>
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.15rem', maxWidth: 600, mx: 'auto' }}>
            We're on a mission to redefine short-term accommodation — blending the comfort of home
            with the quality of a boutique hotel.
          </Typography>
        </Container>
      </Box>

      {/* Our Story */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box className="card-animate-in">
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}>
                  Our Story
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, mb: 3, fontWeight: 700 }}>
                  Born From a Simple Idea
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                  Nura Stays was founded with a clear vision: to provide accommodation that truly feels
                  like home while delivering the quality and consistency of a premium hotel. We noticed
                  a gap in the market — guests were choosing between impersonal hotel rooms and
                  inconsistent holiday rentals.
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                  We set out to bridge that gap. Every property in our portfolio is personally vetted,
                  professionally designed, and maintained to the highest standards. From the moment
                  you book to the moment you leave, we ensure your experience is nothing short of
                  exceptional.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  Today, we're proud to host guests from all walks of life — business travelers,
                  families, couples, and solo explorers — all finding their perfect home away from
                  home with Nura Stays.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                className="card-animate-in"
                component="img"
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=500&fit=crop"
                alt="Beautiful Property"
                sx={{
                  width: '100%',
                  height: 450,
                  objectFit: 'cover',
                  borderRadius: 4,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* What We Offer */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F7F7F7' }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="What We Offer"
            subtitle="Everything you need for the perfect stay, and then some."
          />
          <Grid container spacing={4}>
            {services.map((service, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card className="card-animate-in" sx={{ textAlign: 'center', p: 3, height: '100%', bgcolor: '#fff' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{service.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {service.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Approach */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Box
                className="card-animate-in"
                component="img"
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=500&fit=crop"
                alt="Interior Design"
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover',
                  borderRadius: 4,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box className="card-animate-in">
                <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}>
                  Our Approach
                </Typography>
                <Typography variant="h3" sx={{ mt: 1, mb: 3, fontWeight: 700 }}>
                  Curated for You
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
                  We carefully select and manage properties in prime locations, transforming them into
                  beautifully designed spaces that meet our exacting standards. Each property is
                  furnished with premium amenities, styled for comfort, and maintained by our
                  dedicated operations team.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  Our hands-on approach means every guest receives a consistent, high-quality
                  experience regardless of which property they stay in. From professional cleaning
                  to 24/7 guest support, we've thought of everything so you can simply relax
                  and enjoy your stay.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F4ECE3' }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="Our Values"
            subtitle="The principles that guide everything we do."
          />
          <Grid container spacing={4}>
            {values.map((value, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box className="card-animate-in" sx={{ textAlign: 'center', p: 2 }}>
                  <Box sx={{ color: 'primary.main', mb: 2, fontSize: 40 }}>{value.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {value.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1F1F1F 0%, #2A2A2A 100%)',
          color: '#fff',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3" sx={{ mb: 2, color: '#fff', fontWeight: 700 }}>
            Ready to Experience Nura Stays?
          </Typography>
          <Typography sx={{ mb: 4, opacity: 0.9, fontSize: '1.1rem' }}>
            Browse our collection of premium properties and find your perfect stay.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/properties"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ bgcolor: '#C6A75E', color: '#fff', '&:hover': { bgcolor: '#A98A43' } }}
            >
              View Properties
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{ borderColor: '#fff', color: '#fff', '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
