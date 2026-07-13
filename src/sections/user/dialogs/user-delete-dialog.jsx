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

export function UserDeleteDialog({ open, user, onClose, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await onDelete(user);

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete User</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Are you sure you want to delete <strong>{user?.full_name || user?.user_name}</strong>?
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

UserDeleteDialog.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.object,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};
