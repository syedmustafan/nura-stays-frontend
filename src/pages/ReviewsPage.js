/**
 * Reviews page showing all guest reviews with filtering.
 */
import React, { useState, useEffect } from 'react';
import {
  Box, Container, Grid, Typography, Card, Rating,
  FormControl, InputLabel, Select, MenuItem, Pagination, Chip, LinearProgress,
} from '@mui/material';
import { Star } from '@mui/icons-material';
import { reviewAPI } from '../services/api';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ rating: '', ordering: '-created_at', page: 1 });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const params = { page: filter.page, ordering: filter.ordering };
        if (filter.rating) params.rating = filter.rating;

        const [reviewsRes, statsRes] = await Promise.all([
          reviewAPI.getAll(params),
          reviewAPI.getStats(),
        ]);
        setReviews(reviewsRes.data.results || reviewsRes.data);
        setStats(statsRes.data);
        if (reviewsRes.data.count) {
          setTotalPages(Math.ceil(reviewsRes.data.count / 12));
        }
      } catch (err) {
        console.error('Error loading reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [filter]);


  const getInitials = (name) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: 'linear-gradient(135deg, #FFF8F3 0%, #F5E6D3 100%)', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
            Guest Reviews
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
            See what our guests have to say about their Nura Stays experience.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Overall Stats */}
        {stats && (
          <Card sx={{ p: { xs: 3, md: 4 }, mb: 5, bgcolor: '#FEFCF9', border: '1px solid rgba(0,0,0,0.04)' }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  {stats.average_rating}
                </Typography>
                <Rating value={stats.average_rating} precision={0.1} readOnly size="large" sx={{ mb: 1 }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Based on {stats.total_reviews} reviews
                </Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = stats.distribution?.[String(star)] || 0;
                  const percentage = stats.total_reviews > 0 ? (count / stats.total_reviews) * 100 : 0;
                  return (
                    <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 50 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{star}</Typography>
                        <Star sx={{ fontSize: 16, color: '#FFB400' }} />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          flex: 1,
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'rgba(0,0,0,0.06)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: '#FFB400',
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 30 }}>
                        {count}
                      </Typography>
                    </Box>
                  );
                })}
              </Grid>
            </Grid>
          </Card>
        )}

        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter by Rating</InputLabel>
            <Select
              value={filter.rating}
              label="Filter by Rating"
              onChange={(e) => setFilter((prev) => ({ ...prev, rating: e.target.value, page: 1 }))}
            >
              <MenuItem value="">All Ratings</MenuItem>
              {[5, 4, 3, 2, 1].map((r) => (
                <MenuItem key={r} value={r}>{r} Stars</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 170 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filter.ordering}
              label="Sort By"
              onChange={(e) => setFilter((prev) => ({ ...prev, ordering: e.target.value, page: 1 }))}
            >
              <MenuItem value="-created_at">Most Recent</MenuItem>
              <MenuItem value="-rating">Highest Rated</MenuItem>
              <MenuItem value="rating">Lowest Rated</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Reviews Grid */}
        <Box>
          {loading ? (
            <Typography>Loading reviews...</Typography>
          ) : reviews.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>No reviews found</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Try adjusting your filters.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {reviews.map((review) => (
                <Grid item xs={12} sm={6} md={4} key={review.id}>
                  <Card className="card-animate-in review-card" sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #FF6B35 0%, #D4AF37 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                        }}
                      >
                        {getInitials(review.guest_name)}
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {review.guest_name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {new Date(review.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={review.rating} readOnly size="small" sx={{ mb: 1.5 }} />
                    {review.property_name && (
                      <Chip
                        label={review.property_name}
                        size="small"
                        variant="outlined"
                        sx={{ mb: 1.5, alignSelf: 'flex-start', fontSize: '0.75rem' }}
                      />
                    )}
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, flex: 1 }}>
                      {review.review_text}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Pagination
              count={totalPages}
              page={filter.page}
              onChange={(e, page) => setFilter((prev) => ({ ...prev, page }))}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ReviewsPage;
