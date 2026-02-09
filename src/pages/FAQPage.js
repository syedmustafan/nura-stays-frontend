/**
 * FAQ page with searchable accordion questions grouped by category.
 */
import React, { useState } from 'react';
import {
  Box, Container, Typography, TextField, Accordion, AccordionSummary,
  AccordionDetails, InputAdornment, Button, Chip,
} from '@mui/material';
import { ExpandMore, Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const faqData = {
  'Booking & Payments': [
    {
      q: 'How do I book a property?',
      a: 'You can book through our website by selecting your preferred property and clicking "Book Now" which will connect you with us via WhatsApp or email. We\'ll confirm availability and guide you through the booking process.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept bank transfers, credit/debit cards, and PayPal. Payment details will be shared once your booking is confirmed.',
    },
    {
      q: 'Do I need to pay a deposit?',
      a: 'Yes, a deposit is typically required to secure your booking. The deposit amount varies by property and stay duration. Full details are provided during the booking process.',
    },
    {
      q: 'When is the remaining balance due?',
      a: 'The remaining balance is typically due 7 days before your check-in date. For last-minute bookings, full payment is required at the time of booking.',
    },
  ],
  'Check-in & Check-out': [
    {
      q: 'What time is check-in and check-out?',
      a: 'Standard check-in is from 3:00 PM and check-out is by 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability.',
    },
    {
      q: 'How do I access the property?',
      a: 'Most of our properties use smart locks with unique access codes. You\'ll receive your access code and detailed instructions via email or WhatsApp before your check-in date.',
    },
    {
      q: 'Is there someone to meet me at the property?',
      a: 'While most check-ins are self-service via smart locks, we can arrange a personal welcome if needed. Just let us know when booking and we\'ll be happy to accommodate.',
    },
  ],
  'Property Information': [
    {
      q: 'Are towels and bed linen provided?',
      a: 'Yes! All our properties come fully equipped with fresh towels, premium bed linen, and essential toiletries. Hotel-quality comfort is standard at Nura Stays.',
    },
    {
      q: 'Is WiFi available?',
      a: 'Yes, all our properties have high-speed WiFi included free of charge. Connection details are provided in the welcome information.',
    },
    {
      q: 'Are the properties suitable for families with children?',
      a: 'Many of our properties are family-friendly. Please check the specific property details or contact us to discuss your requirements, and we\'ll help find the perfect fit.',
    },
    {
      q: 'Are pets allowed?',
      a: 'Some of our properties are pet-friendly. This is indicated in the property amenities and house rules. Please always check before booking, and note that a pet surcharge may apply.',
    },
  ],
  'Cancellations': [
    {
      q: 'What is the cancellation policy?',
      a: 'Each property has its own cancellation policy, clearly stated on the property page. Generally, free cancellation is available up to 48-72 hours before check-in. Please review the specific policy before booking.',
    },
    {
      q: 'Can I modify my booking?',
      a: 'Yes, modifications are possible subject to availability. Please contact us as early as possible if you need to change your dates or any other booking details.',
    },
    {
      q: 'What happens if I need to leave early?',
      a: 'Early departures are not typically eligible for a refund on unused nights. However, please reach out to us and we\'ll do our best to assist on a case-by-case basis.',
    },
  ],
  'Other': [
    {
      q: 'Is parking available?',
      a: 'Parking availability varies by property. Check the amenities list on the property page for parking information. If parking isn\'t included, we can usually recommend nearby options.',
    },
    {
      q: 'Do you offer long-term stays?',
      a: 'Yes! We offer discounted rates for extended stays. Contact us for a custom quote if you\'re looking to stay for a week or more.',
    },
    {
      q: 'How do I leave a review?',
      a: 'We\'d love to hear about your experience! You can leave a review by contacting us via email or through our reviews page. We value all feedback as it helps us improve.',
    },
  ],
};

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = Object.keys(faqData);

  const filteredFAQ = {};
  categories.forEach((cat) => {
    const items = faqData[cat].filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (items.length > 0) {
      filteredFAQ[cat] = items;
    }
  });

  const displayCategories = activeCategory
    ? { [activeCategory]: filteredFAQ[activeCategory] || [] }
    : filteredFAQ;

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ py: { xs: 6, md: 8 }, background: 'linear-gradient(135deg, #FFF8F3 0%, #F5E6D3 100%)', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 4 }}>
            Find answers to common questions about Nura Stays.
          </Typography>
          <TextField
            fullWidth
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"><Search /></InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 500,
              bgcolor: '#fff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        {/* Category Chips */}
        <Box sx={{ display: 'flex', gap: 1, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Chip
            label="All"
            onClick={() => setActiveCategory(null)}
            color={!activeCategory ? 'primary' : 'default'}
            variant={!activeCategory ? 'filled' : 'outlined'}
          />
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              color={activeCategory === cat ? 'primary' : 'default'}
              variant={activeCategory === cat ? 'filled' : 'outlined'}
            />
          ))}
        </Box>

        {/* FAQ Sections */}
        <Box>
          {Object.keys(displayCategories).length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>No matching questions found</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Try a different search term or browse all categories.
              </Typography>
            </Box>
          ) : (
            Object.entries(displayCategories).map(([category, items]) => (
              <Box key={category} className="card-animate-in faq-section" sx={{ mb: 5 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
                  {category}
                </Typography>
                {items.map((item, i) => (
                  <Accordion
                    key={i}
                    sx={{
                      mb: 1,
                      bgcolor: '#FEFCF9',
                      border: '1px solid rgba(0,0,0,0.04)',
                      '&::before': { display: 'none' },
                      borderRadius: '8px !important',
                      '&:first-of-type': { borderRadius: '8px !important' },
                      '&:last-of-type': { borderRadius: '8px !important' },
                    }}
                    disableGutters
                  >
                    <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 3, py: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {item.q}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 3, pb: 3 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                        {item.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            ))
          )}
        </Box>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 6, py: 6, bgcolor: '#FAF8F5', borderRadius: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
            Still have questions?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
            We're here to help! Reach out and we'll get back to you as soon as possible.
          </Typography>
          <Button component={Link} to="/contact" variant="contained" size="large" sx={{ px: 4 }}>
            Contact Us
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQPage;
