import { useState } from 'react';

import {
  Stack,
  Button,
  Dialog,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function UserChangePassowordDialog({ open, user, onClose, onSave }) {
  const [form, setForm] = useState({
    new_password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setError] = useState('');

  const handleChange = (field) => (event) => {
    const { value } = event.target;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (form.new_password !== form.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      setLoading(true);

      await onSave({
        user_id: user.user_id,
        new_password: form.new_password,
      });

      setForm({
        new_password: '',
        confirm_password: '',
      });

      onClose();
    } catch (error) {
      const message = error.response?.data?.detail || error.response?.data?.message;
      console.log(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Change Password - {user.full_name}</DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="New Password"
            name="new_password"
            onChange={handleChange('new_password')}
            type={showPassword ? 'text' : 'password'}
            value={form.new_password}
            error={!!errors}
            helperText={errors}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            name="confirm_password"
            onChange={handleChange('confirm_password')}
            type={showPassword ? 'text' : 'password'}
            value={form.confirm_password}
            error={!!errors}
            helperText={errors}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleChangePassword}
          loading={loading}
          sx={{
            bgcolor: '#0030ff',
            '&:hover': {
              backgroundColor: '#0025c7',
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
