/**
 * Individual property detail page with gallery, booking sidebar, and reviews.
 */
import React, { useState, useEffect } from 'react';
import {
  Box, Container, Grid, Typography, Button, Chip, Rating, Card,
  Dialog, IconButton, Divider, TextField, Skeleton,
} from '@mui/material';
import {
  LocationOn, BedOutlined, BathtubOutlined, PeopleOutlined,
  Close, ArrowBack, ArrowForward, CheckCircle, ImageOutlined,
} from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import { propertyAPI, reviewAPI } from '../services/api';
import PropertyCard from '../components/common/PropertyCard';
import SectionTitle from '../components/common/SectionTitle';

const PropertyDetailPage = () => {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [checkIn, setCheckIn] = useState('');
const [checkOut, setCheckOut] = useState('');
const [guests, setGuests] = useState(1);

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      try {
        const { data } = await propertyAPI.getBySlug(slug);
        setProperty(data);

        // Load reviews and similar properties
        const [reviewsRes, similarRes] = await Promise.all([
          data.id ? reviewAPI.getByProperty(data.id) : { data: [] },
          propertyAPI.getAll({ page: 1 }),
        ]);
        setReviews(reviewsRes.data || []);
        const similar = (similarRes.data.results || similarRes.data)
          .filter((p) => p.id !== data.id)
          .slice(0, 3);
        setSimilarProperties(similar);
      } catch (err) {
        console.error('Error loading property:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
    window.scrollTo(0, 0);
  }, [slug]);


  // Use only API images; no external placeholders
  const images =
    property?.images?.length > 0
      ? property.images.map((img) => img.image_url || img.image)
      : [];
  const hasImages = images.length > 0;

const getWhatsAppLink = () => {
  const message = encodeURIComponent(
`Hi, I'm interested in booking ${property?.name}.
Location: ${property?.location}
Check-in: ${checkIn || 'Not selected'}
Check-out: ${checkOut || 'Not selected'}
Guests: ${guests}

Can you confirm availability and total price?`
  );
  return `https://wa.me/447000000000?text=${message}`;
};

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton height={400} sx={{ borderRadius: 3, mb: 3 }} />
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Skeleton height={40} width="60%" sx={{ mb: 2 }} />
            <Skeleton height={200} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton height={300} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Property Not Found</Typography>
        <Button component={Link} to="/properties" variant="contained">
          Browse Properties
        </Button>
      </Container>
    );
  }

  return (
    <Box>
      {/* Image Gallery - only API images; "No Image Available" when empty */}
      <Box sx={{ bgcolor: '#F7F7F7' }}>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Grid container spacing={1} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            {hasImages ? (
              <>
                <Grid item xs={12} md={7}>
                  <Box
                    component="img"
                    src={images[0]}
                    alt={property.name}
                    onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
                    sx={{
                      width: '100%',
                      height: { xs: 300, md: 450 },
                      objectFit: 'cover',
                      cursor: 'pointer',
                      borderRadius: { xs: 2, md: '12px 0 0 12px' },
                      transition: 'opacity 0.3s',
                      '&:hover': { opacity: 0.9 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Grid container spacing={1}>
                    {images.slice(1, 5).map((img, i) => (
                      <Grid item xs={6} key={i}>
                        <Box
                          component="img"
                          src={img}
                          alt={`${property.name} ${i + 2}`}
                          onClick={() => { setLightboxIndex(i + 1); setLightboxOpen(true); }}
                          sx={{
                            width: '100%',
                            height: 220,
                            objectFit: 'cover',
                            cursor: 'pointer',
                            borderRadius: i === 1 ? '0 12px 0 0' : i === 3 ? '0 0 12px 0' : 0,
                            transition: 'opacity 0.3s',
                            '&:hover': { opacity: 0.9 },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: 300, md: 400 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#e8e8e8',
                    color: 'text.secondary',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <ImageOutlined sx={{ fontSize: 64, mb: 1, opacity: 0.5 }} />
                    <Typography variant="body1">No Image Available</Typography>
                  </Box>
                </Box>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Grid container spacing={4}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Box className="card-animate-in">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOn sx={{ fontSize: 18, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {property.location}
                </Typography>
                <Chip label={property.property_type} size="small" sx={{ ml: 1, textTransform: 'capitalize' }} />
              </Box>
              <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
                {property.name}
              </Typography>
              {property.average_rating && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Rating value={property.average_rating} precision={0.1} readOnly size="small" />
                  <Typography variant="body2">
                    {property.average_rating} ({property.review_count} reviews)
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Quick Info */}
            <Box className="card-animate-in" sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
              {[
                { icon: <BedOutlined />, label: `${property.bedrooms} Bedroom${property.bedrooms !== 1 ? 's' : ''}` },
                { icon: <BathtubOutlined />, label: `${property.bathrooms} Bathroom${property.bathrooms !== 1 ? 's' : ''}` },
                { icon: <PeopleOutlined />, label: `Up to ${property.max_guests} Guests` },
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                  {item.icon}
                  <Typography variant="body2">{item.label}</Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Description */}
            <Box className="card-animate-in" sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>About This Property</Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {showFullDescription
                  ? property.description
                  : property.description?.substring(0, 400)}
                {property.description?.length > 400 && !showFullDescription && '...'}
              </Typography>
              {property.description?.length > 400 && (
                <Button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  sx={{ mt: 1, p: 0 }}
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                </Button>
              )}
            </Box>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <Box className="card-animate-in" sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Amenities</Typography>
                <Grid container spacing={1}>
                  {property.amenities.map((amenity, i) => (
                    <Grid item xs={6} sm={4} key={i}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                        <CheckCircle sx={{ fontSize: 18, color: 'primary.main' }} />
                        <Typography variant="body2">{amenity}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* House Rules */}
            {property.house_rules && (
              <Box className="card-animate-in" sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>House Rules</Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {property.house_rules}
                </Typography>
              </Box>
            )}

            {/* Cancellation Policy */}
            {property.cancellation_policy && (
              <Box className="card-animate-in" sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Cancellation Policy</Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {property.cancellation_policy}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 4 }} />

            {/* Reviews */}
            <Box className="card-animate-in">
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                Guest Reviews {reviews.length > 0 && `(${reviews.length})`}
              </Typography>
              {reviews.length === 0 ? (
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  No reviews yet for this property.
                </Typography>
              ) : (
                reviews.map((review) => (
                  <Card key={review.id} sx={{ mb: 2, p: 2.5, bgcolor: '#FFFFFF' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{review.guest_name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {new Date(review.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                      {review.review_text}
                    </Typography>
                  </Card>
                ))
              )}
            </Box>
          </Grid>

          {/* Booking Sidebar */}
          <Grid item xs={12} md={4}>
            <Card
              className="card-animate-in"
              sx={{
                position: 'sticky',
                top: 100,
                p: 3,
                border: '1px solid #EAEAEA',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
                  £{Number(property.price_per_night).toFixed(0)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>/ night</Typography>
              </Box>

<TextField
  fullWidth
  label="Check-in"
  type="date"
  value={checkIn}
  onChange={(e) => setCheckIn(e.target.value)}
  InputLabelProps={{ shrink: true }}
  sx={{ mb: 2 }}
/>

<TextField
  fullWidth
  label="Check-out"
  type="date"
  value={checkOut}
  onChange={(e) => setCheckOut(e.target.value)}
  InputLabelProps={{ shrink: true }}
  sx={{ mb: 2 }}
/>

<TextField
  fullWidth
  label="Guests"
  type="number"
  value={guests}
  onChange={(e) => setGuests(e.target.value)}
  inputProps={{ min: 1, max: property.max_guests }}
  sx={{ mb: 3 }}
/>

              <Button
                fullWidth
                variant="contained"
                size="large"
                component="a"
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  mb: 2,
                  py: 1.5,
                  bgcolor: '#25D366',
                  '&:hover': { bgcolor: '#20BD5A' },
                }}
              >
                💬 Book via WhatsApp
              </Button>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                component="a"
href={`mailto:info@nurastays.com?subject=Enquiry: ${property.name}&body=Hi, I'd like to enquire about ${property.name} at ${property.location}.
Check-in: ${checkIn || 'Not selected'}
Check-out: ${checkOut || 'Not selected'}
Guests: ${guests}.
Please confirm availability and total price.`}                sx={{ py: 1.5 }}
              >
                ✉️ Enquire via Email
              </Button>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', fontSize: '0.8rem' }}>
                Contact us directly for the best rates and availability.
                We typically respond within 1 hour.
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <SectionTitle title="Similar Properties" subtitle="You might also like these stays." />
            <Grid container spacing={3}>
              {similarProperties.map((prop, index) => (
                <Grid item xs={12} sm={6} md={4} key={prop.id}>
                  <PropertyCard property={prop} index={index} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      {/* Lightbox - only when we have images */}
      {hasImages && (
        <Dialog
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          maxWidth="lg"
          fullWidth
          PaperProps={{ sx: { bgcolor: 'rgba(0,0,0,0.95)', borderRadius: 2, position: 'relative' } }}
        >
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 1 }}
          >
            <Close />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, minHeight: 500 }}>
            <IconButton
              onClick={() => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)}
              sx={{ color: '#fff', mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
            <Box
              component="img"
              src={images[lightboxIndex]}
              alt={`${property.name} ${lightboxIndex + 1}`}
              sx={{ maxHeight: '70vh', maxWidth: '80%', objectFit: 'contain', borderRadius: 2 }}
            />
            <IconButton
              onClick={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
              sx={{ color: '#fff', ml: 2 }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
          <Typography sx={{ color: '#fff', textAlign: 'center', pb: 2, opacity: 0.7 }}>
            {lightboxIndex + 1} / {images.length}
          </Typography>
        </Dialog>
      )}
    </Box>
  );
};

export default PropertyDetailPage;
