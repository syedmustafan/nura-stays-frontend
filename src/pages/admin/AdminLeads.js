/**
 * Admin Leads (contact submissions) management page.
 * Lists leads from the API with search, filter, view detail, and mark read/unread.
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Card, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, IconButton, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, InputAdornment, Select, MenuItem,
  FormControl, InputLabel, Alert, Snackbar, CircularProgress,
} from '@mui/material';
import { Visibility, MarkEmailRead, MarkEmailUnread, Search } from '@mui/icons-material';
import { adminLeadsAPI } from '../../services/api';

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [search, setSearch] = useState('');
  const [isReadFilter, setIsReadFilter] = useState('');

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (isReadFilter !== '') params.is_read = isReadFilter;
      const { data } = await adminLeadsAPI.getAll(params);
      setLeads(data.results || data);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setSnackbar({ open: true, message: 'Error loading leads.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, [search, isReadFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const openDetail = (lead) => {
    setSelectedLead(lead);
    setDetailOpen(true);
  };

  const toggleRead = async (lead) => {
    try {
      await adminLeadsAPI.update(lead.id, { is_read: !lead.is_read });
      setSnackbar({
        open: true,
        message: lead.is_read ? 'Marked as unread.' : 'Marked as read.',
        severity: 'success',
      });
      fetchLeads();
      if (selectedLead?.id === lead.id) {
        setSelectedLead((prev) => (prev ? { ...prev, is_read: !prev.is_read } : null));
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Error updating lead.', severity: 'error' });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Leads
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            size="small"
            placeholder="Search by name, email, message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 220 }}
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={isReadFilter}
              label="Status"
              onChange={(e) => setIsReadFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="false">Unread</MenuItem>
              <MenuItem value="true">Read</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Subject</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {lead.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" component="a" href={`mailto:${lead.email}`} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                      {lead.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{lead.phone || '—'}</TableCell>
                  <TableCell sx={{ maxWidth: 160 }}>{lead.subject ? lead.subject.substring(0, 30) + (lead.subject.length > 30 ? '...' : '') : '—'}</TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {formatDate(lead.created_at)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={lead.is_read ? 'Read' : 'Unread'}
                      size="small"
                      color={lead.is_read ? 'default' : 'primary'}
                      variant={lead.is_read ? 'outlined' : 'filled'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => openDetail(lead)} title="View">
                      <Visibility fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => toggleRead(lead)}
                      title={lead.is_read ? 'Mark unread' : 'Mark read'}
                    >
                      {lead.is_read ? <MarkEmailUnread fontSize="small" /> : <MarkEmailRead fontSize="small" />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {leads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      No leads yet. Contact form submissions will appear here.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onClose={() => setDetailOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Lead Details</DialogTitle>
        <DialogContent>
          {selectedLead && (
            <Box sx={{ pt: 0 }}>
              <Typography variant="subtitle2" color="text.secondary">Name</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{selectedLead.name}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Email</Typography>
              <Typography variant="body1" component="a" href={`mailto:${selectedLead.email}`} sx={{ display: 'block', mb: 2, color: 'primary.main' }}>{selectedLead.email}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{selectedLead.phone || '—'}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Subject</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{selectedLead.subject || '—'}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Date received</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{formatDate(selectedLead.created_at)}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Message</Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                {selectedLead.message}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          {selectedLead && (
            <Button
              startIcon={selectedLead.is_read ? <MarkEmailUnread /> : <MarkEmailRead />}
              onClick={() => toggleRead(selectedLead)}
            >
              {selectedLead.is_read ? 'Mark unread' : 'Mark read'}
            </Button>
          )}
          <Button onClick={() => setDetailOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminLeads;
