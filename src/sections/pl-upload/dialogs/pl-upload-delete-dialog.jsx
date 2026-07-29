import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export function PlUploadDeleteDialog({ open, pl, onClose, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await onDelete(pl);

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete Packing List File</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Are you sure you want to delete <strong>{pl.filename}</strong>?
        </Typography>

        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancel
        </Button>

        <Button color="error" variant="contained" loading={loading} onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PlUploadDeleteDialog.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.object,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};
