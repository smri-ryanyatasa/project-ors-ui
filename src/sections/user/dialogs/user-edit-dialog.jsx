import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import {
  Dialog,
  Button,
  TextField,
  DialogTitle,
  Autocomplete,
  DialogContent,
  DialogActions,
} from '@mui/material';

export function UserEditDialog({ open, user, roles, branches, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const environments = [
    { value: 'LSP', label: 'LSP' },
    { value: 'SCP', label: 'SCP' },
  ];

  const [form, setForm] = useState({
    user_id: '',
    user_name: '',
    full_name: '',
    env: [],
    position: '',
    email_address: '',
    role_id: '',
    business_unit: '',
    branches: [],
    status: '',
    description: '',
  });

  useEffect(() => {
    if (user) {
      const userBranches = Array.isArray(user.branches)
        ? user.branches
        : user.branches
            ?.split(',')
            .map((branch) => branch.trim())
            .filter(Boolean) || [];

      const userEnv = Array.isArray(user.assigned_env)
        ? user.assigned_env
        : user.assigned_env
            ?.split(',')
            .map((env) => env.trim())
            .filter(Boolean) || [];

      setForm({
        user_id: user.user_id,
        user_name: user.user_name ?? '',
        full_name: user.full_name ?? '',
        env: userEnv,
        position: user.position ?? '',
        email_address: user.email_address ?? '',
        role_id: user.role_id ?? '',
        business_unit: user.business_unit ?? '',
        branches: userBranches,
        status: user.status ?? '',
        description: user.description ?? '',
      });
    }
  }, [user]);

  const handleChange = (field) => (event) => {
    const { value } = event.target;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await onSave({
        ...user,
        ...form,
      });

      onClose();
    } catch (error) {
      const message = error.response?.data?.detail || error.response?.data?.message;

      if (message === 'Username already exists') {
        setErrors((prev) => ({
          ...prev,
          user_name: 'Username already exists.',
        }));
        return;
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
          onSubmit: handleUpdate,
        },
      }}
    >
      <DialogTitle>Update User</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {/* ---------------- Account Information ---------------- */}

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              disabled
              label="Username"
              name="user_name"
              value={form.user_name}
              onChange={handleChange('user_name')}
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
              onChange={handleChange('role_id')}
            >
              <MenuItem value="">
                <em>Select Role</em>
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              required
              label="Full Name"
              name="full_name"
              value={form.full_name}
              onChange={handleChange('full_name')}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              required
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange('status')}
            >
              <MenuItem value="">
                <em>Select Status</em>
              </MenuItem>
              <MenuItem value="Y">Active</MenuItem>
              <MenuItem value="N">Inactive</MenuItem>
            </TextField>
          </Grid>

          {/* ---------------- Personal Information ---------------- */}

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              name="email_address"
              value={form.email_address}
              onChange={handleChange('email_address')}
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
              onChange={handleChange('position')}
            />
          </Grid>

          {/* ---------------- Organization ---------------- */}

          {/* <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              fullWidth
              label="Business Unit"
              name="business_unit"
              value={form.business_unit}
              onChange={handleChange('business_unit')}
            >
              <MenuItem value="">
                <em>Select Business Unit</em>
              </MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Watcher">Watcher</MenuItem>
              <MenuItem value="Queue">Queue</MenuItem>
            </TextField>
          </Grid> */}

          {/* ---------------- Additional Information ---------------- */}

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange('description')}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Autocomplete
              multiple
              filterSelectedOptions
              options={environments}
              getOptionLabel={(option) => option.label}
              value={environments.filter((env) => form.env.includes(env.value))}
              onChange={(event, newValue) => {
                setForm((prev) => ({
                  ...prev,
                  env: newValue.map((env) => env.value),
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Environment" placeholder="Select environment" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Autocomplete
              multiple
              filterSelectedOptions
              options={branches}
              getOptionLabel={(option) => `${option.branch_code} - ${option.branch_name}`}
              value={branches.filter((branch) => form.branches.includes(branch.branch_code))}
              onChange={(event, newValue) => {
                setForm((prev) => ({
                  ...prev,
                  branches: newValue.map((branch) => branch.branch_code),
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Branches" placeholder="Search branch" />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" loading={loading} type="submit" color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
