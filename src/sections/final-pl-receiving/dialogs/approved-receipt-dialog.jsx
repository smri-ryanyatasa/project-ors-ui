import { useState } from 'react';

import {
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export function ApprovedReceiptDialog({ open, hasZero, onApproved, onClose }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onApproved();

      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>Approved Receipt</DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {hasZero
            ? 'Some items have zero quantity. Do you want to proceed?'
            : 'Are you sure you want to proceed?'}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading} color="inherit">
          No
        </Button>

        <Button variant="contained" loading={loading} onClick={handleConfirm} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
