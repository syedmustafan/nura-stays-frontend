/**
 * Properties listing page with search, filters, and grid/list view.
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Container, Grid, Typography, TextField, Select, MenuItem,
  FormControl, InputLabel, Button, ToggleButton,
  ToggleButtonGroup, Pagination, InputAdornment, Collapse,
} from '@mui/material';
import {
  Search, GridView, ViewList, Clear, TuneOutlined,
} from '@mui/icons-material';
import PropertyCard from '../components/common/PropertyCard';
import { PropertyGridSkeleton } from '../components/common/LoadingSkeleton';
import { propertyAPI } from '../services/api';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Filters state
  const [filters, setFilters] = useState({
    search: '',
    property_type: '',
    min_bedrooms: '',
    max_price: '',
    min_price: '',
    ordering: '-created_at',
    page: 1,
  });

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.property_type) params.property_type = filters.property_type;
      if (filters.min_bedrooms) params.min_bedrooms = filters.min_bedrooms;
      if (filters.min_price) params.min_price = filters.min_price;
      if (filters.max_price) params.max_price = filters.max_price;
      if (filters.ordering) params.ordering = filters.ordering;
      params.page = filters.page;

      const { data } = await propertyAPI.getAll(params);
      setProperties(data.results || data);
      if (data.count) {
        setTotalPages(Math.ceil(data.count / 12));
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      property_type: '',
      min_bedrooms: '',
      max_price: '',
      min_price: '',
      ordering: '-created_at',
      page: 1,
    });
  };

  const hasActiveFilters =
    filters.search || filters.property_type || filters.min_bedrooms || filters.min_price || filters.max_price;

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: 'linear-gradient(135deg, #FFF8F3 0%, #F5E6D3 100%)',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Box className="content-animate-in">
          <Typography
            variant="h1"
            sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Our Properties
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 4 }}>
            Find your perfect stay from our collection of premium short-term rentals.
          </Typography>
          </Box>

          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search by location or property name..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 600,
              bgcolor: '#fff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': { borderRadius: 2 },
            }}
          />
        </Container>
      </Box>

      {/* Filters & Results */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Toolbar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={<TuneOutlined />}
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? 'contained' : 'outlined'}
              size="small"
            >
              Filters
            </Button>
            {hasActiveFilters && (
              <Button startIcon={<Clear />} onClick={clearFilters} size="small" color="error">
                Clear Filters
              </Button>
            )}
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {properties.length} properties found
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.ordering}
                label="Sort By"
                onChange={(e) => handleFilterChange('ordering', e.target.value)}
              >
                <MenuItem value="-created_at">Newest First</MenuItem>
                <MenuItem value="price_per_night">Price: Low to High</MenuItem>
                <MenuItem value="-price_per_night">Price: High to Low</MenuItem>
                <MenuItem value="name">Name A-Z</MenuItem>
              </Select>
            </FormControl>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, v) => v && setViewMode(v)}
              size="small"
            >
              <ToggleButton value="grid"><GridView /></ToggleButton>
              <ToggleButton value="list"><ViewList /></ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Filter Panel */}
        <Collapse in={showFilters}>
          <Box
            sx={{
              p: 3,
              mb: 3,
              bgcolor: '#FAF8F5',
              borderRadius: 2,
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    value={filters.property_type}
                    label="Property Type"
                    onChange={(e) => handleFilterChange('property_type', e.target.value)}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="apartment">Apartment</MenuItem>
                    <MenuItem value="house">House</MenuItem>
                    <MenuItem value="studio">Studio</MenuItem>
                    <MenuItem value="villa">Villa</MenuItem>
                    <MenuItem value="cottage">Cottage</MenuItem>
                    <MenuItem value="penthouse">Penthouse</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Min Bedrooms</InputLabel>
                  <Select
                    value={filters.min_bedrooms}
                    label="Min Bedrooms"
                    onChange={(e) => handleFilterChange('min_bedrooms', e.target.value)}
                  >
                    <MenuItem value="">Any</MenuItem>
                    <MenuItem value="1">1+</MenuItem>
                    <MenuItem value="2">2+</MenuItem>
                    <MenuItem value="3">3+</MenuItem>
                    <MenuItem value="4">4+</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Min Price (£)"
                  type="number"
                  value={filters.min_price}
                  onChange={(e) => handleFilterChange('min_price', e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Max Price (£)"
                  type="number"
                  value={filters.max_price}
                  onChange={(e) => handleFilterChange('max_price', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </Collapse>

        {/* Property Grid */}
        {loading ? (
          <PropertyGridSkeleton count={6} />
        ) : properties.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>No properties found</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              Try adjusting your filters or search criteria.
            </Typography>
            <Button onClick={clearFilters} variant="contained">Clear Filters</Button>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {properties.map((property, index) => (
                <Grid
                  item
                  xs={12}
                  sm={viewMode === 'list' ? 12 : 6}
                  md={viewMode === 'list' ? 12 : 4}
                  key={property.id}
                >
                  <PropertyCard property={property} index={index} />
                </Grid>
              ))}
            </Grid>
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Pagination
                  count={totalPages}
                  page={filters.page}
                  onChange={(e, page) => setFilters((prev) => ({ ...prev, page }))}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default PropertiesPage;
