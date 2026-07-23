import { useState, useEffect } from 'react';

import {
  Grid,
  Dialog,
  Button,
  MenuItem,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Alert,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

export function RoleEditDialog({ open, role, menus, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedMenuIds, setSelectedMenuIds] = useState([]);
  const [alert, setAlert] = useState('');
  const [form, setForm] = useState({
    name: '',
    description: '',
    level: '',
    default_dashboard: '',
  });

  const validate = () => {
    const newErrors = {};
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (role) {
      setForm({
        name: role.name,
        description: role.description ?? '',
        level: role.level ?? '',
        default_dashboard: role.default_dashboard ?? '',
      });

      setSelectedMenuIds(role.menu_ids ? role.menu_ids.split(',').map(Number) : []);
    }
  }, [role]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === 'level' ? Number(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      await onSave({
        ...role,
        ...form,
        menu_ids: selectedMenuIds,
      });

      setForm({
        name: '',
        description: '',
        level: '',
        default_dashboard: '',
        menu_ids: [],
      });

      onClose();
    } catch (error) {
      const responseData = error.response?.data;

      const message = responseData?.detail || responseData?.message;

      if (message === 'Role already exists.') {
        setErrors((prev) => ({
          ...prev,
          name: message,
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

      if (message) {
        setAlert(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const MenuTree = ({ menu, level = 0, parentMenu = null }) => {
    const hasChildren = menu.children?.length > 0;

    const isChecked = selectedMenuIds.includes(menu.id);

    const handleChange = (event) => {
      const checked = event.target.checked;

      setSelectedMenuIds((prev) => {
        if (checked) {
          const idsToAdd = [menu.id];

          // Automatically check parent
          if (parentMenu) {
            idsToAdd.push(parentMenu.id);
          }

          return [...new Set([...prev, ...idsToAdd])];
        }

        let newSelectedIds = prev.filter((id) => id !== menu.id);

        if (parentMenu) {
          const hasSelectedChild = parentMenu.children?.some((child) =>
            newSelectedIds.includes(child.id)
          );

          if (!hasSelectedChild) {
            newSelectedIds = newSelectedIds.filter((id) => id !== parentMenu.id);
          }
        }

        return newSelectedIds;
      });
    };

    return (
      <Box sx={{ ml: level * 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 1,
            mb: 0.5,
          }}
        >
          <Checkbox size="small" checked={isChecked} onChange={handleChange} />

          <Typography variant="body2">{menu.name}</Typography>
        </Box>

        {hasChildren &&
          menu.children.map((child) => (
            <MenuTree key={child.id} menu={child} level={level + 1} parentMenu={menu} />
          ))}
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleUpdate,
        },
      }}
    >
      <DialogTitle>Update Role</DialogTitle>

      <DialogContent dividers>
        {alert && (
          <Alert
            severity="error"
            sx={{
              alignItems: 'flex-start',
              '& .MuiAlert-message': {
                width: '100%',
                minWidth: 0,
                maxHeight: 300,
                overflowY: 'auto',
                pr: 1,
                whiteSpace: 'pre-line',
              },
              mb: '20px',
            }}
          >
            {alert}
          </Alert>
        )}
        <Grid container spacing={3} sx={{ mt: 0.5 }}>
          {/* LEFT SIDE - Role Information */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12 }}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12 }}>
                <TextField
                  select
                  fullWidth
                  required
                  label="Level"
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  error={!!errors.level}
                  helperText={errors.level}
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 12 }}>
                <TextField
                  fullWidth
                  label="Default Dashboard"
                  name="default_dashboard"
                  value={form.default_dashboard}
                  onChange={handleChange}
                  error={!!errors.default_dashboard}
                  helperText={errors.default_dashboard}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* RIGHT SIDE - Navigations & Permissions */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                bgcolor: 'grey.100',
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography variant="h6">Navigations & Permissions</Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select one or more permissions or navigation to be added in the role
              </Typography>

              {menus
                .filter((menu) => menu.parent_id === 0)
                .map((menu) => (
                  <Accordion
                    key={menu.id}
                    defaultExpanded
                    elevation={0}
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      '&:before': {
                        display: 'none',
                      },
                      overflow: 'hidden',
                      mb: 2,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<Iconify icon="eva:chevron-down-fill" />}
                      sx={{
                        px: 2,
                        minHeight: 56,
                        '& .MuiAccordionSummary-content': {
                          my: 0,
                        },
                      }}
                    >
                      <Typography fontWeight={600}>{menu.name}</Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ px: 1.5, pb: 1.5 }}>
                      {menu.children?.map((child) => (
                        <MenuTree key={child.id} menu={child} />
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Box>
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
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
