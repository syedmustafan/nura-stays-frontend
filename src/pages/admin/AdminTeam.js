/**
 * Admin team management page with CRUD operations.
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Button, Card, Grid, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField,
  Alert, Snackbar, CircularProgress, Avatar,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { adminTeamAPI } from '../../services/api';

const AdminTeam = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [photoFile, setPhotoFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '', role: '', bio: '', order_index: 0,
    linkedin: '', twitter: '', instagram: '',
  });

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await adminTeamAPI.getAll();
      setMembers(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const openCreate = () => {
    setEditingMember(null);
    setFormData({ name: '', role: '', bio: '', order_index: members.length + 1, linkedin: '', twitter: '', instagram: '' });
    setPhotoFile(null);
    setDialogOpen(true);
  };

  const openEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      order_index: member.order_index,
      linkedin: member.social_links?.linkedin || '',
      twitter: member.social_links?.twitter || '',
      instagram: member.social_links?.instagram || '',
    });
    setPhotoFile(null);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('role', formData.role);
      fd.append('bio', formData.bio);
      fd.append('order_index', formData.order_index);

      const socialLinks = {};
      if (formData.linkedin) socialLinks.linkedin = formData.linkedin;
      if (formData.twitter) socialLinks.twitter = formData.twitter;
      if (formData.instagram) socialLinks.instagram = formData.instagram;
      fd.append('social_links', JSON.stringify(socialLinks));

      if (photoFile) {
        fd.append('photo', photoFile);
      }

      if (editingMember) {
        await adminTeamAPI.update(editingMember.id, fd);
        setSnackbar({ open: true, message: 'Team member updated!', severity: 'success' });
      } else {
        await adminTeamAPI.create(fd);
        setSnackbar({ open: true, message: 'Team member added!', severity: 'success' });
      }
      setDialogOpen(false);
      fetchMembers();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error saving team member.', severity: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      await adminTeamAPI.delete(selectedMember.id);
      setSnackbar({ open: true, message: 'Team member removed!', severity: 'success' });
      setDeleteDialogOpen(false);
      fetchMembers();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error deleting team member.', severity: 'error' });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Team Members</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openCreate}>
          Add Member
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>
      ) : members.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography sx={{ color: 'text.secondary' }}>No team members yet. Add your first team member.</Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {members.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Card sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Avatar
                  src={member.photo_url}
                  sx={{
                    width: 80, height: 80, mb: 2,
                    bgcolor: 'primary.main', fontSize: '1.5rem',
                  }}
                >
                  {member.name.charAt(0)}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{member.name}</Typography>
                <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}>
                  {member.role}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.85rem' }}>
                  {member.bio?.substring(0, 100)}{member.bio?.length > 100 ? '...' : ''}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" onClick={() => openEdit(member)}><Edit fontSize="small" /></IconButton>
                  <IconButton size="small" color="error" onClick={() => { setSelectedMember(member); setDeleteDialogOpen(true); }}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingMember ? 'Edit Team Member' : 'Add Team Member'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Full Name" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Role / Title" required
                value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Bio" multiline rows={3}
                value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label" fullWidth>
                {photoFile ? photoFile.name : 'Upload Photo'}
                <input type="file" hidden accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} />
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="LinkedIn URL" size="small"
                value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Twitter URL" size="small"
                value={formData.twitter} onChange={(e) => setFormData({ ...formData, twitter: e.target.value })} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Instagram URL" size="small"
                value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Display Order" type="number"
                value={formData.order_index} onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingMember ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Remove Team Member</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove <strong>{selectedMember?.name}</strong> from the team?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Remove</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminTeam;
