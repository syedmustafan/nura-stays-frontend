/**
 * Admin reviews management page with CRUD operations.
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Button, Card, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Grid,
  Rating, Alert, Snackbar, CircularProgress, Select, MenuItem,
  FormControl, InputLabel, Switch, FormControlLabel,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { adminReviewAPI, adminPropertyAPI } from '../../services/api';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    guest_name: '', rating: 5, review_text: '', property: '', is_approved: true,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [reviewsRes, propsRes] = await Promise.all([
        adminReviewAPI.getAll(),
        adminPropertyAPI.getAll(),
      ]);
      setReviews(reviewsRes.data.results || reviewsRes.data);
      setProperties(propsRes.data.results || propsRes.data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setEditingReview(null);
    setFormData({ guest_name: '', rating: 5, review_text: '', property: '', is_approved: true });
    setDialogOpen(true);
  };

  const openEdit = (review) => {
    setEditingReview(review);
    setFormData({
      guest_name: review.guest_name,
      rating: review.rating,
      review_text: review.review_text,
      property: review.property || '',
      is_approved: review.is_approved,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const submitData = { ...formData };
      if (!submitData.property) submitData.property = null;
      if (editingReview) {
        await adminReviewAPI.update(editingReview.id, submitData);
        setSnackbar({ open: true, message: 'Review updated!', severity: 'success' });
      } else {
        await adminReviewAPI.create(submitData);
        setSnackbar({ open: true, message: 'Review created!', severity: 'success' });
      }
      setDialogOpen(false);
      fetchData();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error saving review.', severity: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await adminReviewAPI.delete(selectedReview.id);
      setSnackbar({ open: true, message: 'Review deleted!', severity: 'success' });
      setDeleteDialogOpen(false);
      fetchData();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error deleting review.', severity: 'error' });
    }
  };

  const toggleApproved = async (review) => {
    try {
      await adminReviewAPI.update(review.id, { ...review, is_approved: !review.is_approved });
      fetchData();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Reviews</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openCreate}>
          Add Review
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Card} sx={{ border: '1px solid rgba(0,0,0,0.06)' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#FAFAFA' }}>
                <TableCell sx={{ fontWeight: 700 }}>Guest</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Rating</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Property</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Review</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{review.guest_name}</TableCell>
                  <TableCell>
                    <Rating value={review.rating} readOnly size="small" />
                  </TableCell>
                  <TableCell>{review.property_name || '—'}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography variant="body2" noWrap>{review.review_text}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={review.is_approved ? 'Approved' : 'Hidden'}
                      color={review.is_approved ? 'success' : 'default'}
                      size="small"
                      onClick={() => toggleApproved(review)}
                      sx={{ cursor: 'pointer' }}
                    />
                  </TableCell>
                  <TableCell>{new Date(review.created_at).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openEdit(review)}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => { setSelectedReview(review); setDeleteDialogOpen(true); }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {reviews.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>No reviews yet.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingReview ? 'Edit Review' : 'Add New Review'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Guest Name" required
                value={formData.guest_name} onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Property</InputLabel>
                <Select value={formData.property} label="Property"
                  onChange={(e) => setFormData({ ...formData, property: e.target.value })}>
                  <MenuItem value="">None (General)</MenuItem>
                  {properties.map((p) => (
                    <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ mb: 1 }}>Rating</Typography>
              <Rating
                value={formData.rating}
                onChange={(e, v) => setFormData({ ...formData, rating: v })}
                size="large"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Review Text" required multiline rows={4}
                value={formData.review_text} onChange={(e) => setFormData({ ...formData, review_text: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Switch checked={formData.is_approved}
                  onChange={(e) => setFormData({ ...formData, is_approved: e.target.checked })} />}
                label="Approved (visible on site)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingReview ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Review</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this review by <strong>{selectedReview?.guest_name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminReviews;
