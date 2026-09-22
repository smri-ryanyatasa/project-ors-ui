import { useRef, useState, useEffect } from 'react';

import {
  Box,
  Stack,
  Button,
  Popover,
  MenuItem,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function MultipleFilter(props) {
  const FIELD_OPTIONS = [
    { value: 'user_name', label: 'Username' },
    { value: 'full_name', label: 'Fullname' },
    { value: 'email_address', label: 'Email' },
    { value: 'status', label: 'Status' },
    { value: 'role_name', label: 'Role Name' },
    { value: 'position', label: 'Position' },
  ];

  const OPERATOR_OPTIONS = [
    { value: 'contains', label: 'contains' },
    { value: 'doesNotContain', label: 'does not contain' },
    { value: 'equals', label: 'equals' },
    { value: 'doesNotEqual', label: 'does not equal' },
    { value: 'startsWith', label: 'starts with' },
    { value: 'endsWith', label: 'ends with' },
    { value: 'isEmpty', label: 'is empty' },
    { value: 'isNotEmpty', label: 'is not empty' },
  ];

  const valueInputRef = useRef(null);
  const [filterAnchor, setFilterAnchor] = useState(null);

  const [filters, setFilters] = useState([
    { id: Date.now(), field: 'user_name', operator: 'contains', value: '' },
  ]);

  const filterOpen = Boolean(filterAnchor);

  const handleFilterClick = (event) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const addFilter = () => {
    setFilters((prev) => [
      ...prev,
      { id: Date.now(), field: 'user_name', operator: 'contains', value: '' },
    ]);
  };

  const removeFilter = (id) => {
    setFilters((prev) => prev.filter((filter) => filter.id !== id));
  };

  const updateFilter = (id, key, value) => {
    setFilters((prev) =>
      prev.map((filter) => (filter.id === id ? { ...filter, [key]: value } : filter))
    );
  };

  const applyFilters = () => {
    const items = filters
      .filter((filter) => filter.value.trim() !== '')
      .map((filter) => ({
        id: String(filter.id),
        field: filter.field,
        operator: filter.operator,
        value: filter.value,
      }));
    console.log(items);
    props.onFilterModelChange?.({
      items,
      logicOperator: 'and',
    });
    handleFilterClose();
  };

  const clearFilters = () => {
    setFilters([]);
    props.onFilterChange?.({ items: [], logicOperator: 'and' });
  };

  useEffect(() => {
    if (filterOpen) {
      requestAnimationFrame(() => {
        valueInputRef.current?.focus();
      });
    }
  }, [filterOpen, filters.length]);

  return (
    <>
      <Button
        startIcon={<Iconify icon="solar:filter-bold" />}
        onClick={handleFilterClick}
        sx={{ color: '#637381', fontWeight: 500 }}
        size="small"
      >
        <Typography sx={{ fontSize: '14px', fontWeight: 700, lineHeight: '9px' }}>
          Filters
        </Typography>
      </Button>

      {/* FILTER POPOVER */}
      <Popover
        open={filterOpen}
        anchorEl={filterAnchor}
        onClose={handleFilterClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 650,
              maxWidth: 'calc(100vw - 32px)',
              borderRadius: 1.5,
              boxShadow: (theme) => theme.customShadows?.z20 || theme.shadows[10],
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* HEADER */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Filters</Typography>
            {filters.length > 0 && (
              <Button size="small" color="error" onClick={clearFilters}>
                Clear all
              </Button>
            )}
          </Stack>
          <Stack spacing={1} sx={{ mt: 2, maxHeight: 350, overflowY: 'auto' }}>
            {filters.map((filter) => (
              <Stack key={filter.id} direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
                {/* FIELD */}
                <TextField
                  select
                  size="small"
                  label="Columns"
                  value={filter.field}
                  onChange={(event) => updateFilter(filter.id, 'field', event.target.value)}
                  sx={{ width: 400 }}
                >
                  {FIELD_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {/* OPERATOR */}
                <TextField
                  select
                  size="small"
                  label="Operator"
                  value={filter.operator}
                  onChange={(event) => updateFilter(filter.id, 'operator', event.target.value)}
                  sx={{ width: 300 }}
                >
                  {OPERATOR_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                {/* VALUE */}
                {filter.field === 'status' ? (
                  <TextField
                    select
                    size="small"
                    label="Value"
                    fullWidth
                    value={filter.value}
                    onChange={(event) => updateFilter(filter.id, 'value', event.target.value)}
                  >
                    <MenuItem value="Y">Active</MenuItem>
                    <MenuItem value="N">Inactive</MenuItem>
                  </TextField>
                ) : (
                  <TextField
                    size="small"
                    label="Value"
                    inputRef={valueInputRef}
                    fullWidth
                    value={filter.value}
                    onChange={(event) => updateFilter(filter.id, 'value', event.target.value)}
                    placeholder="Value"
                  />
                )}
                {/* DELETE */}
                <IconButton size="small" color="error" onClick={() => removeFilter(filter.id)}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          {/* FOOTER */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addFilter}
            >
              Add filter
            </Button>
            <Stack direction="row" spacing={1}>
              <Button size="small" onClick={handleFilterClose}>
                Cancel
              </Button>
              <Button variant="contained" size="small" onClick={applyFilters}>
                Apply
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}

// Chat GPT Linkg - https://chatgpt.com/c/6aa6626f-9dac-83ec-bf46-c668f4fb3e19
