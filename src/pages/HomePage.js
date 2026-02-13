/**
 * Home page with hero, featured properties, trust indicators, and CTA.
 */
import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Button, Grid, Card, Rating,
} from '@mui/material';
import {
  Hotel, Security, LocationOn, CalendarMonth, Star, VerifiedUser,
  Shield, ArrowForward,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/common/PropertyCard';
import SectionTitle from '../components/common/SectionTitle';
import CountUp from '../components/common/CountUp';
import { PropertyGridSkeleton } from '../components/common/LoadingSkeleton';
import { propertyAPI, reviewAPI } from '../services/api';

const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [reviewStats, setReviewStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [propRes, statsRes] = await Promise.all([
          propertyAPI.getFeatured(),
          reviewAPI.getStats(),
        ]);
        setFeaturedProperties(propRes.data);
        setReviewStats(statsRes.data);
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const valueProps = [
    { icon: <Hotel sx={{ fontSize: 40 }} />, title: 'Hotel-Level Comfort', description: 'Professionally designed spaces with premium amenities for the ultimate comfort.' },
    { icon: <Security sx={{ fontSize: 40 }} />, title: 'Privacy & Space', description: 'Enjoy the freedom of your own home with no shared spaces or corridors.' },
    { icon: <LocationOn sx={{ fontSize: 40 }} />, title: 'Prime Locations', description: 'Handpicked properties in the best neighbourhoods with easy access to everything.' },
    { icon: <CalendarMonth sx={{ fontSize: 40 }} />, title: 'Flexible Stays', description: 'From weekend getaways to extended stays, we accommodate your schedule.' },
  ];

  return (
    <Box>
      {/* ─── Hero Section ─────────────────────────────────────── */}
      <Box
        sx={{
          minHeight: { xs: '80vh', md: '90vh' },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F7F7F7 50%, #F4ECE3 100%)',
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(198,167,94,0.08) 0%, transparent 70%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                className="hero-animate"
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  letterSpacing: 3,
                  mb: 2,
                  display: 'block',
                  fontSize: '0.85rem',
                }}
              >
                Welcome to Nura Stays
              </Typography>
              <Typography
                className="hero-animate"
                variant="h1"
                sx={{
                  color: 'text.primary',
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  lineHeight: 1.1,
                }}
              >
                Your Home{' '}
                <Box
                  component="span"
                  sx={{
                         background: 'linear-gradient(135deg, #C6A75E 0%, #A98A43 100%)'
,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Away From Home
                </Box>
              </Typography>
              <Typography
                className="hero-animate"
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: 500,
                  lineHeight: 1.8,
                }}
              >
                Discover beautifully designed short-term rentals that combine hotel-level comfort
                with the warmth and privacy of your own home. Book your perfect stay today.
              </Typography>
              <Box className="hero-animate" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/properties"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ px: 4, py: 1.5, fontSize: '1rem' }}
                >
                  View Properties
                </Button>
                <Button
                  component="a"
                  href="https://wa.me/447000000000?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Nura%20Stays%20properties."
                  target="_blank"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    borderColor: '#25D366',
                    color: '#25D366',
                    '&:hover': { borderColor: '#20BD5A', bgcolor: 'rgba(37,211,102,0.05)' },
                  }}
                >
                  💬 WhatsApp Us
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                className="hero-animate"
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: '100%',
                    height: '100%',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: 4,
                    opacity: 0.2,
                  },
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=500&fit=crop"
                  alt="Luxury Apartment Interior"
                  sx={{
                    width: '100%',
                    height: 450,
                    objectFit: 'cover',
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ─── Featured Properties ──────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="Featured Properties"
            subtitle="Hand-picked stays that our guests love. Each property is personally vetted for quality and comfort."
          />
          {loading ? (
            <PropertyGridSkeleton count={3} />
          ) : (
            <Grid container spacing={3}>
              {featuredProperties.slice(0, 4).map((property, index) => (
                <Grid item xs={12} sm={6} md={3} key={property.id}>
                  <PropertyCard property={property} index={index} />
                </Grid>
              ))}
            </Grid>
          )}
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              component={Link}
              to="/properties"
              variant="outlined"
              color="primary"
              size="large"
              endIcon={<ArrowForward />}
            >
              View All Properties
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ─── Why Choose Nura Stays ─────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F7F7F7' }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="Why Choose Nura Stays?"
            subtitle="We go above and beyond to ensure every stay is exceptional."
          />
          <Grid container spacing={4}>
            {valueProps.map((vp, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card
                  className="card-animate-in"
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    height: '100%',
                    bgcolor: '#fff',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{vp.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1rem' }}>
                    {vp.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    {vp.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── Trust Indicators / Stats ──────────────────────────── */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: 'linear-gradient(135deg, #1F1F1F 0%, #2A2A2A 100%)',
          color: '#fff',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              { value: 6, suffix: '+', label: 'Properties', decimals: 0 },
              { value: reviewStats?.total_reviews || 10, suffix: '+', label: 'Happy Guests', decimals: 0 },
              { value: reviewStats?.average_rating || 4.8, suffix: '', label: 'Average Rating', decimals: 1 },
              { value: 100, suffix: '%', label: 'Satisfaction', decimals: 0 },
            ].map((stat, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Box className="card-animate-in" sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3rem' }, color: '#fff' }}
                  >
                    <CountUp end={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </Typography>
                  <Typography sx={{ fontSize: '1rem', opacity: 0.9, fontWeight: 500 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── Testimonials ──────────────────────────────────────── */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
        <Container maxWidth="lg">
          <SectionTitle
            title="What Our Guests Say"
            subtitle="Real experiences from real guests who chose Nura Stays."
          />
          <Grid container spacing={3}>
            {[
              { name: 'Sarah M.', rating: 5, text: 'Absolutely wonderful stay! The apartment was spotlessly clean and had everything we needed. Will definitely be booking again!' },
              { name: 'David K.', rating: 5, text: 'Nura Stays really delivers on their promise. Luxury hotel quality with the comfort and privacy of your own space.' },
              { name: 'Priya S.', rating: 5, text: 'Our second booking with Nura Stays - once again they exceeded our expectations. Highly recommend!' },
            ].map((review, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card className="card-animate-in" sx={{ p: 3, height: '100%', bgcolor: '#FFFFFF', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <Rating value={review.rating} readOnly size="small" sx={{ mb: 2 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic', lineHeight: 1.8 }}>
                    "{review.text}"
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    — {review.name}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button component={Link} to="/reviews" variant="text" color="primary" endIcon={<ArrowForward />}>
              Read All Reviews
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ─── Trust Badges ──────────────────────────────────────── */}
      <Box sx={{ py: 6, bgcolor: '#F7F7F7' }}>
        <Container maxWidth="md">
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            {[
              { icon: <VerifiedUser />, label: 'Verified Properties' },
              { icon: <Shield />, label: 'Fully Insured' },
              { icon: <Star />, label: '5-Star Service' },
            ].map((badge, i) => (
              <Grid item xs={4} key={i}>
                <Box className="card-animate-in" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Box sx={{ color: 'secondary.main' }}>{badge.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.85rem' }}>
                    {badge.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── CTA Section ───────────────────────────────────────── */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F4ECE3 100%)',
        }}
      >
        <Container maxWidth="sm">
          <Box className="content-animate-in">
          <Typography variant="h2" sx={{ mb: 2 }}>
            Ready to Book Your Stay?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
            Browse our properties and find your perfect home away from home.
            We're here to help every step of the way.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/properties"
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Browse Properties
            </Button>
            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Contact Us
            </Button>
          </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
