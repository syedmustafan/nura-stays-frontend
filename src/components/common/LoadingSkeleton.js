/**
 * Loading skeleton components for various content types.
 */
import React from 'react';
import { Box, Skeleton, Grid, Card, CardContent } from '@mui/material';

export const PropertyCardSkeleton = () => (
  <Card sx={{ height: '100%' }}>
    <Skeleton variant="rectangular" height={220} animation="wave" />
    <CardContent>
      <Skeleton width="40%" height={20} sx={{ mb: 1 }} />
      <Skeleton width="80%" height={28} sx={{ mb: 1 }} />
      <Skeleton width="100%" height={40} sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Skeleton width={60} height={20} />
        <Skeleton width={60} height={20} />
        <Skeleton width={60} height={20} />
      </Box>
    </CardContent>
  </Card>
);

export const PropertyGridSkeleton = ({ count = 6 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <PropertyCardSkeleton />
      </Grid>
    ))}
  </Grid>
);

export const PageHeroSkeleton = () => (
  <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Box sx={{ textAlign: 'center' }}>
      <Skeleton variant="text" width={300} height={50} sx={{ mx: 'auto', mb: 2 }} />
      <Skeleton variant="text" width={500} height={30} sx={{ mx: 'auto' }} />
    </Box>
  </Box>
);
