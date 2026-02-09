/**
 * Admin properties management page with CRUD operations.
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Button, Card, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Grid,
  Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel,
  Alert, Snackbar, CircularProgress,
} from '@mui/material';
import { Add, Edit, Delete, Image } from '@mui/icons-material';
import { adminPropertyAPI } from '../../services/api';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    name: '', location: '', description: '', short_description: '',
    price_per_night: '', bedrooms: 1, bathrooms: 1, max_guests: 2,
    property_type: 'apartment', amenities: [], house_rules: '',
    cancellation_policy: '', is_active: true, is_featured: false,
  });
  const [amenityInput, setAmenityInput] = useState('');

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminPropertyAPI.getAll();
      setProperties(data.results || data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const openCreate = () => {
    setEditingProperty(null);
    setFormData({
      name: '', location: '', description: '', short_description: '',
      price_per_night: '', bedrooms: 1, bathrooms: 1, max_guests: 2,
      property_type: 'apartment', amenities: [], house_rules: '',
      cancellation_policy: '', is_active: true, is_featured: false,
    });
    setDialogOpen(true);
  };

  const openEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      name: property.name,
      location: property.location,
      description: property.description,
      short_description: property.short_description || '',
      price_per_night: property.price_per_night,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      max_guests: property.max_guests,
      property_type: property.property_type,
      amenities: property.amenities || [],
      house_rules: property.house_rules || '',
      cancellation_policy: property.cancellation_policy || '',
      is_active: property.is_active,
      is_featured: property.is_featured,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingProperty) {
        await adminPropertyAPI.update(editingProperty.id, formData);
        setSnackbar({ open: true, message: 'Property updated successfully!', severity: 'success' });
      } else {
        await adminPropertyAPI.create(formData);
        setSnackbar({ open: true, message: 'Property created successfully!', severity: 'success' });
      }
      setDialogOpen(false);
      fetchProperties();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error saving property. Please try again.', severity: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await adminPropertyAPI.delete(selectedProperty.id);
      setSnackbar({ open: true, message: 'Property deleted successfully!', severity: 'success' });
      setDeleteDialogOpen(false);
      fetchProperties();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error deleting property.', severity: 'error' });
    }
  };

  const toggleActive = async (property) => {
    try {
      await adminPropertyAPI.update(property.id, { ...property, is_active: !property.is_active, amenities: property.amenities || [] });
      fetchProperties();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const addAmenity = () => {
    if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
      setFormData((prev) => ({ ...prev, amenities: [...prev.amenities, amenityInput.trim()] }));
      setAmenityInput('');
    }
  };

  const removeAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleImageUpload = async (propertyId, files) => {
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append('images', f));
      await adminPropertyAPI.uploadImages(propertyId, fd);
      setSnackbar({ open: true, message: 'Images uploaded!', severity: 'success' });
      fetchProperties();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error uploading images.', severity: 'error' });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Properties</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openCreate}>
          Add Property
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Card} sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                <TableCell sx={{ fontWeight: 700 }}>Property</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Price/Night</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Beds</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {property.name}
                    </Typography>
                    {property.is_featured && (
                      <Chip label="Featured" size="small" color="primary" sx={{ mt: 0.5, height: 20, fontSize: '0.7rem' }} />
                    )}
                  </TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{property.property_type}</TableCell>
                  <TableCell>£{Number(property.price_per_night).toFixed(0)}</TableCell>
                  <TableCell>{property.bedrooms}</TableCell>
                  <TableCell>
                    <Chip
                      label={property.is_active ? 'Active' : 'Inactive'}
                      color={property.is_active ? 'success' : 'default'}
                      size="small"
                      onClick={() => toggleActive(property)}
                      sx={{ cursor: 'pointer' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      component="label"
                      title="Upload Images"
                    >
                      <Image fontSize="small" />
                      <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(property.id, e.target.files)}
                      />
                    </IconButton>
                    <IconButton size="small" onClick={() => openEdit(property)} title="Edit">
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => { setSelectedProperty(property); setDeleteDialogOpen(true); }}
                      title="Delete"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {properties.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      No properties yet. Click "Add Property" to get started.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingProperty ? 'Edit Property' : 'Add New Property'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Property Name" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Location" required
                value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Short Description" multiline rows={2}
                value={formData.short_description} onChange={(e) => setFormData({ ...formData, short_description: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Full Description" required multiline rows={4}
                value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth label="Price/Night (£)" type="number" required
                value={formData.price_per_night} onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value })} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth label="Bedrooms" type="number"
                value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 1 })} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth label="Bathrooms" type="number"
                value={formData.bathrooms} onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 1 })} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField fullWidth label="Max Guests" type="number"
                value={formData.max_guests} onChange={(e) => setFormData({ ...formData, max_guests: parseInt(e.target.value) || 2 })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select value={formData.property_type} label="Property Type"
                  onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}>
                  {['apartment', 'house', 'studio', 'villa', 'cottage', 'penthouse'].map((t) => (
                    <MenuItem key={t} value={t} sx={{ textTransform: 'capitalize' }}>{t}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField fullWidth label="Add Amenity" value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())} />
                <Button onClick={addAmenity} variant="outlined">Add</Button>
              </Box>
            </Grid>
            {formData.amenities.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {formData.amenities.map((a) => (
                    <Chip key={a} label={a} onDelete={() => removeAmenity(a)} size="small" />
                  ))}
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField fullWidth label="House Rules" multiline rows={2}
                value={formData.house_rules} onChange={(e) => setFormData({ ...formData, house_rules: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Cancellation Policy" multiline rows={2}
                value={formData.cancellation_policy} onChange={(e) => setFormData({ ...formData, cancellation_policy: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Switch checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />}
                label="Active"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={<Switch checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} />}
                label="Featured"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProperty ? 'Update Property' : 'Create Property'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Property</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{selectedProperty?.name}</strong>?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminProperties;
