import { useState } from 'react';

import {
  Box,
  Grid,
  Alert,
  Dialog,
  Button,
  MenuItem,
  Checkbox,
  TextField,
  Accordion,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function RoleCreateDialog({ open, menus, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedMenuIds, setSelectedMenuIds] = useState([]);
  const [alert, setAlert] = useState('');

  const validate = () => {
    const newErrors = {};

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const [form, setForm] = useState({
    name: 'Vendor',
    description: 'Vendor',
    level: '',
    default_dashboard: '/home',
  });

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

  const handleSave = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        menu_ids: selectedMenuIds,
      };

      await onSave(payload);

      setForm({
        name: '',
        description: '',
        level: '',
        default_dashboard: '',
      });

      onClose();
    } catch (err) {
      const responseData = err.response?.data;

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

    const handleChangeMenus = (event) => {
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

        // Remove current menu
        let newSelectedIds = prev.filter((id) => id !== menu.id);

        // If parent exists, check if any sibling is still selected
        if (parentMenu) {
          const hasSelectedChild = parentMenu.children?.some((child) =>
            newSelectedIds.includes(child.id)
          );

          // No children selected -> uncheck parent
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
          <Checkbox size="small" checked={isChecked} onChange={handleChangeMenus} />

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
          onSubmit: handleSave,
        },
      }}
    >
      <DialogTitle>Add New Role</DialogTitle>

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
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
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

              <Grid size={{ xs: 12 }}>
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
          sx={{
            bgcolor: '#0030ff',
            '&:hover': {
              bgcolor: '#032ad8',
            },
          }}
          loading={loading}
          type="submit"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
