import { useState } from 'react';

import {
  Grid,
  Dialog,
  Button,
  MenuItem,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function UserCreateDialog({
  open,
  onClose,
  onSave,
  roles = [],
  businessUnits = [],
  branches = [],
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => {
    if (!email) return true; // Optional field

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (form.email_address && !isValidEmail(form.email_address)) {
      newErrors.email_address = 'Please enter a valid email address.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [form, setForm] = useState({
    user_name: 'json123',
    password: 'password',
    full_name: 'Jason Derulo',
    env: 'WTA',
    position: 'Chief Snatcher',
    email_address: 'jason.derulo@sample.com',
    role_id: 1,
    business_unit: 'Watcher',
    branches: 'Science',
    status: 'Active',
    description: 'Best in science',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      await onSave(form);

      setForm({
        user_name: '',
        password: '',
        full_name: '',
        env: 'WTA',
        position: '',
        email_address: '',
        role_id: '',
        business_unit: '',
        branches: '',
        status: '',
        description: '',
      });

      onClose();
    } catch (error) {
      const responseData = error.response?.data;

      const message = responseData?.detail || responseData?.message;

      if (message === 'Username already exists.') {
        setErrors((prev) => ({
          ...prev,
          user_name: message,
        }));

        return;
      }

      const fieldErrors = responseData?.data?.fieldErrors;

      if (fieldErrors) {
        setErrors((prev) => ({
          ...prev,
          ...fieldErrors,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSave,
        },
      }}
    >
      <DialogTitle>Create User</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {/* ---------------- Account Information ---------------- */}

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="Username"
              name="user_name"
              value={form.user_name}
              onChange={handleChange}
              error={!!errors.user_name}
              helperText={errors.user_name}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              required
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                        <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              required
              label="Role"
              name="role_id"
              value={form.role_id}
              onChange={handleChange}
            >
              <MenuItem value={1}>Administrator</MenuItem>
              <MenuItem value={2}>Merchandising</MenuItem>
              <MenuItem value={3}>Business Analyst</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              select
              fullWidth
              required
              label="Environment"
              name="env"
              value={form.env}
              onChange={handleChange}
            >
              <MenuItem value="WTA">WTA</MenuItem>
              <MenuItem value="PUP">PUP</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <TextField
              select
              fullWidth
              required
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>

          {/* ---------------- Personal Information ---------------- */}

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              required
              label="Full Name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              name="email_address"
              value={form.email_address}
              onChange={handleChange}
              error={Boolean(errors.email_address)}
              helperText={errors.email_address}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Position"
              name="position"
              value={form.position}
              onChange={handleChange}
            />
          </Grid>

          {/* ---------------- Organization ---------------- */}

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Business Unit"
              name="business_unit"
              value={form.business_unit}
              onChange={handleChange}
            >
              <MenuItem value="Bag man">Bag man</MenuItem>
              <MenuItem value="Watcher">Watcher</MenuItem>
              <MenuItem value="Queue">Queue</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Branch"
              name="branches"
              value={form.branches}
              onChange={handleChange}
            >
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Mathematics">Mathematics</MenuItem>
            </TextField>
          </Grid>

          {/* ---------------- Additional Information ---------------- */}

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          loading={loading}
          type="submit"
          sx={{
            bgcolor: '#0030ff',
            '&:hover': {
              bgcolor: '#032ad8',
            },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
