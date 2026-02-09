/**
 * Reusable section title component with optional subtitle.
 * Uses CSS animation instead of GSAP for reliable rendering.
 */
import React from 'react';
import { Box, Typography } from '@mui/material';

const SectionTitle = ({ title, subtitle, align = 'center', light = false }) => {
  return (
    <Box
      className="card-animate-in"
      sx={{ textAlign: align, mb: { xs: 4, md: 6 } }}
    >
      <Typography
        variant="h2"
        sx={{
          color: light ? '#fff' : 'text.primary',
          mb: 2,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: light ? 'rgba(255,255,255,0.8)' : 'text.secondary',
            maxWidth: 600,
            mx: align === 'center' ? 'auto' : 0,
            fontSize: '1.1rem',
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;
