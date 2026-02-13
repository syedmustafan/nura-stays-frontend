/**
 * Contact page with form and contact information.
 */
import React, { useState } from 'react';
import {
  Box, Container, Grid, Typography, TextField, Button, Card, Alert,
  CircularProgress,
} from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { contactAPI } from '../services/api';

const ContactPage = () => {
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      await contactAPI.submit(data);
      setSubmitStatus({ type: 'success', message: 'Thank you for your message! We will get back to you soon.' });
      reset();
    } catch (err) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Email />, label: 'Email', value: 'info@nurastays.com', href: 'mailto:info@nurastays.com' },
    { icon: <Phone />, label: 'Phone', value: '+44 700 000 0000', href: 'tel:+447000000000' },
    { icon: <LocationOn />, label: 'Based in', value: 'United Kingdom', href: null },
  ];

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: 'linear-gradient(135deg, #FFFFFF 0%, #F4ECE3 100%)', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Box className="content-animate-in">
            <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Box className="card-animate-in">
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
              Send Us a Message
            </Typography>

            {submitStatus && (
              <Alert severity={submitStatus.type} sx={{ mb: 3 }} onClose={() => setSubmitStatus(null)}>
                {submitStatus.message}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    {...register('name', { required: 'Name is required' })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Please enter a valid email',
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number (Optional)"
                    {...register('phone')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    multiline
                    rows={5}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Please write at least 10 characters' },
                    })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                    disabled={submitting}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            </Box>
          </Grid>

          {/* Contact Info Sidebar */}
          <Grid item xs={12} md={5}>
            <Box className="card-animate-in">
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
              Contact Information
            </Typography>
            {contactInfo.map((info, i) => (
              <Card key={i} className="card-animate-in" sx={{ p: 2.5, mb: 2, display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#FFFFFF' }}>
                <Box sx={{ color: 'primary.main' }}>{info.icon}</Box>
                <Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {info.label}
                  </Typography>
                  {info.href ? (
                    <Typography
                      component="a"
                      href={info.href}
                      variant="body2"
                      sx={{
                        display: 'block',
                        fontWeight: 600,
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {info.value}
                    </Typography>
                  ) : (
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {info.value}
                    </Typography>
                  )}
                </Box>
              </Card>
            ))}

            <Card sx={{ p: 3, mt: 3, textAlign: 'center', bgcolor: '#F7F7F7' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Prefer WhatsApp?
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Chat with us directly for quick responses.
              </Typography>
              <Button
                component="a"
                href="https://wa.me/447000000000?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Nura%20Stays."
                target="_blank"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  bgcolor: '#25D366',
                  '&:hover': { bgcolor: '#20BD5A' },
                  py: 1.5,
                }}
              >
                💬 Chat on WhatsApp
              </Button>
            </Card>

            {/* Social Links */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Follow us on social media
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                {['Instagram', 'Facebook', 'Twitter'].map((platform) => (
                  <Typography
                    key={platform}
                    component="a"
                    href="#"
                    sx={{
                      color: 'text.secondary',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {platform}
                  </Typography>
                ))}
              </Box>
            </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
