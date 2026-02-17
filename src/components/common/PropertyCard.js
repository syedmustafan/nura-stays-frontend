/**
 * Property card component used in grids/lists.
 * Uses only API image URL; shows "No Image Available" when missing or on load error.
 */
import React, { useState } from 'react';
import {
  Card, CardMedia, CardContent, Box, Typography, Chip, Rating,
} from '@mui/material';
import { BedOutlined, BathtubOutlined, PeopleOutlined, LocationOn, ImageOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NoImagePlaceholder = ({ height = 220 }) => (
  <Box
    sx={{
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f0f0f0',
      color: 'text.secondary',
    }}
  >
    <Box sx={{ textAlign: 'center' }}>
      <ImageOutlined sx={{ fontSize: 48, mb: 0.5, opacity: 0.5 }} />
      <Typography variant="caption" display="block">No Image Available</Typography>
    </Box>
  </Box>
);

const PropertyCard = ({ property, index = 0 }) => {
  const imageUrl = property.primary_image || null;
  const [imageError, setImageError] = useState(false);
  const showImage = imageUrl && !imageError;

  return (
    <Card
      component={Link}
      to={`/properties/${property.slug}`}
      className="card-animate-in"
      sx={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        overflow: 'hidden',
        animationDelay: `${index * 0.1}s`,
        '&:hover .property-image': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {showImage ? (
          <CardMedia
            component="img"
            height="220"
            image={imageUrl}
            alt={property.name}
            className="property-image"
            onError={() => setImageError(true)}
            sx={{
              transition: 'transform 0.5s ease',
              objectFit: 'cover',
            }}
          />
        ) : (
          <NoImagePlaceholder height={220} />
        )}
        {property.is_featured && (
          <Chip
            label="Featured"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: 'primary.main',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
        )}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            bgcolor: 'rgba(255,255,255,0.95)',
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
            £{Number(property.price_per_night).toFixed(0)}<Typography component="span" variant="caption" sx={{ color: 'text.secondary' }}>/night</Typography>
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <LocationOn sx={{ fontSize: 16, color: 'text.light' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {property.location}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, fontSize: '1.05rem', lineHeight: 1.3 }}>
          {property.name}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, flex: 1, fontSize: '0.85rem' }}>
          {property.short_description?.substring(0, 100)}{property.short_description?.length > 100 ? '...' : ''}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BedOutlined sx={{ fontSize: 18, color: 'text.light' }} />
            <Typography variant="caption">{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BathtubOutlined sx={{ fontSize: 18, color: 'text.light' }} />
            <Typography variant="caption">{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PeopleOutlined sx={{ fontSize: 18, color: 'text.light' }} />
            <Typography variant="caption">{property.max_guests} guests</Typography>
          </Box>
        </Box>

        {property.average_rating && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={property.average_rating} precision={0.1} size="small" readOnly />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              ({property.review_count} review{property.review_count !== 1 ? 's' : ''})
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
