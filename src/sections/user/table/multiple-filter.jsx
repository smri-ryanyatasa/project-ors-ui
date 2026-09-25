import { useRef, useState, useEffect, useCallback } from 'react';

import {
  Box,
  Menu,
  Stack,
  Badge,
  Button,
  Dialog,
  Popover,
  MenuItem,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  ListItemText,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function MultipleFilter(props) {
  const {
    gridKey = 'users',
    onFilterModelChange,
    onSaveFilter,
    getSaveFilter,
    onDeleteSavedFilter,
    onUpdateSavedFilter,
  } = props;

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

  // ---------------------------------------------------------------------------
  // CURRENT FILTERS
  // ---------------------------------------------------------------------------

  const [filters, setFilters] = useState([
    {
      id: Date.now(),
      field: 'user_name',
      operator: 'contains',
      value: '',
    },
  ]);

  const [appliedFilters, setAppliedFilters] = useState([]);

  // ---------------------------------------------------------------------------
  // SAVED FILTERS
  // ---------------------------------------------------------------------------

  const [savedFilters, setSavedFilters] = useState([]);

  const [selectedSavedFilter, setSelectedSavedFilter] = useState(null);

  const [savedFilterAnchor, setSavedFilterAnchor] = useState(null);

  // Save dialog
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveFilterName, setSaveFilterName] = useState('');

  // Rename dialog
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameFilterName, setRenameFilterName] = useState('');

  const [editingFilter, setEditingFilter] = useState(null);

  const filterOpen = Boolean(filterAnchor);

  // ---------------------------------------------------------------------------
  // LOCAL STORAGE KEY
  // ---------------------------------------------------------------------------

  //   const storageKey = `saved-filters-${gridKey}`;

  // ---------------------------------------------------------------------------
  // LOAD SAVED FILTERS
  // ---------------------------------------------------------------------------

  const loadSavedFilters = useCallback(async () => {
    try {
      const res = await getSaveFilter(gridKey);

      if (!Array.isArray(res)) {
        setSavedFilters([]);
        return;
      }

      const parsedFilters = res.map((item) => ({
        ...item,
        filters: typeof item.filters === 'string' ? JSON.parse(item.filters) : item.filters || [],
      }));

      setSavedFilters(parsedFilters);
    } catch (error) {
      console.error('Failed to load saved filters:', error);
    }
  }, [getSaveFilter, gridKey]);

  useEffect(() => {
    loadSavedFilters();
  }, [loadSavedFilters]);

  // ---------------------------------------------------------------------------
  // SAVE SAVED FILTERS TO LOCAL STORAGE
  // ---------------------------------------------------------------------------

  //   useEffect(() => {
  //     try {
  //       localStorage.setItem(storageKey, JSON.stringify(savedFilters));
  //     } catch (error) {
  //       console.error('Failed to save filters:', error);
  //     }
  //   }, [savedFilters, storageKey]);

  // ---------------------------------------------------------------------------
  // FILTER POPOVER
  // ---------------------------------------------------------------------------

  const handleFilterClick = (event) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  // ---------------------------------------------------------------------------
  // FILTER FUNCTIONS
  // ---------------------------------------------------------------------------

  const addFilter = () => {
    setFilters((prev) => [
      ...prev,
      {
        id: Date.now(),
        field: 'user_name',
        operator: 'contains',
        value: '',
      },
    ]);
  };

  const removeFilter = (id) => {
    setFilters((prev) => prev.filter((filter) => filter.id !== id));
  };

  const updateFilter = (id, key, value) => {
    setFilters((prev) =>
      prev.map((filter) =>
        filter.id === id
          ? {
              ...filter,
              [key]: value,
            }
          : filter
      )
    );
  };

  // ---------------------------------------------------------------------------
  // APPLY FILTERS
  // ---------------------------------------------------------------------------

  const applyFilters = () => {
    const items = filters
      .filter(
        (filter) =>
          filter.operator === 'isEmpty' ||
          filter.operator === 'isNotEmpty' ||
          filter.value.trim() !== ''
      )
      .map((filter) => ({
        id: String(filter.id),
        field: filter.field,
        operator: filter.operator,
        value: filter.value,
      }));

    setAppliedFilters(items);

    onFilterModelChange?.({
      items,
      logicOperator: 'and',
    });

    handleFilterClose();
  };

  // ---------------------------------------------------------------------------
  // CLEAR FILTERS
  // ---------------------------------------------------------------------------

  const clearFilters = () => {
    setFilters([
      {
        id: Date.now(),
        field: 'user_name',
        operator: 'contains',
        value: '',
      },
    ]);

    setAppliedFilters([]);

    setSelectedSavedFilter(null);

    onFilterModelChange?.({
      items: [],
      logicOperator: 'and',
    });

    handleFilterClose();
  };

  // ---------------------------------------------------------------------------
  // SAVE CURRENT FILTER
  // ---------------------------------------------------------------------------

  const openSaveDialog = () => {
    const hasFilters = filters.some(
      (filter) =>
        filter.operator === 'isEmpty' ||
        filter.operator === 'isNotEmpty' ||
        filter.value.trim() !== ''
    );

    if (!hasFilters) {
      return;
    }

    setSaveFilterName('');
    setSaveDialogOpen(true);
  };

  const closeSaveDialog = () => {
    setSaveDialogOpen(false);
    setSaveFilterName('');
  };

  const saveCurrentFilter = async () => {
    const name = saveFilterName.trim();

    if (!name) {
      return;
    }

    const items = filters
      .filter(
        (filter) =>
          filter.operator === 'isEmpty' ||
          filter.operator === 'isNotEmpty' ||
          filter.value.trim() !== ''
      )
      .map((filter) => ({
        field: filter.field,
        operator: filter.operator,
        value: filter.value,
      }));

    if (items.length === 0) {
      return;
    }

    const newSavedFilter = {
      id: Date.now(),
      name,
      gridKey,
      filters: items,
    };

    await onSaveFilter(newSavedFilter);
    setSavedFilters((prev) => [...prev, newSavedFilter]);
    setSelectedSavedFilter(newSavedFilter);

    await loadSavedFilters();

    closeSaveDialog();
  };

  // ---------------------------------------------------------------------------
  // LOAD SAVED FILTER
  // ---------------------------------------------------------------------------

  const loadSavedFilter = (savedFilter) => {
    const restoredFilters = savedFilter.filters.map((filter) => ({
      id: Date.now() + Math.random(),
      field: filter.field,
      operator: filter.operator,
      value: filter.value || '',
    }));

    setFilters(restoredFilters);

    setAppliedFilters(
      restoredFilters.map((filter) => ({
        id: String(filter.id),
        field: filter.field,
        operator: filter.operator,
        value: filter.value,
      }))
    );

    setSelectedSavedFilter(savedFilter);

    onFilterModelChange?.({
      items: restoredFilters.map((filter) => ({
        id: String(filter.id),
        field: filter.field,
        operator: filter.operator,
        value: filter.value,
      })),
      logicOperator: 'and',
    });

    setSavedFilterAnchor(null);
  };

  // ---------------------------------------------------------------------------
  // RENAME SAVED FILTER
  // ---------------------------------------------------------------------------

  const openRenameDialog = (event, savedFilter) => {
    event.stopPropagation();

    setEditingFilter(savedFilter);
    setRenameFilterName(savedFilter.name);
    setRenameDialogOpen(true);
  };

  const closeRenameDialog = () => {
    setRenameDialogOpen(false);
    setRenameFilterName('');
    setEditingFilter(null);
  };

  const renameSavedFilter = async () => {
    const name = renameFilterName.trim();

    if (!name || !editingFilter) {
      return;
    }

    await onUpdateSavedFilter({ id: editingFilter.id, name });

    setSavedFilters((prev) =>
      prev.map((filter) =>
        filter.id === editingFilter.id
          ? {
              ...filter,
              name,
            }
          : filter
      )
    );

    setSelectedSavedFilter((prev) =>
      prev?.id === editingFilter.id
        ? {
            ...prev,
            name,
          }
        : prev
    );

    closeRenameDialog();
  };

  // ---------------------------------------------------------------------------
  // DELETE SAVED FILTER
  // ---------------------------------------------------------------------------

  const deleteSavedFilter = async (event, id) => {
    event.stopPropagation();

    setSavedFilters((prev) => prev.filter((filter) => filter.id !== id));

    if (selectedSavedFilter?.id === id) {
      setSelectedSavedFilter(null);
    }

    await onDeleteSavedFilter(id);
  };

  // ---------------------------------------------------------------------------
  // AUTO FOCUS
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (filterOpen) {
      requestAnimationFrame(() => {
        valueInputRef.current?.focus();
      });
    }
  }, [filterOpen, filters.length]);

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <>
      {/* FILTER BUTTON */}
      <Button
        onClick={handleFilterClick}
        sx={{
          color: '#637381',
          fontWeight: 500,
        }}
        size="small"
      >
        <Badge
          badgeContent={appliedFilters.length}
          color="primary"
          invisible={appliedFilters.length === 0}
          sx={{
            '& .MuiBadge-badge': {
              right: -2,
              minWidth: 18,
              height: 18,
              fontSize: '10px',
            },
          }}
        >
          <Iconify icon="solar:filter-bold" />
        </Badge>

        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '9px',
            ml: 1,
          }}
        >
          Filters
        </Typography>
      </Button>

      {/* FILTER POPOVER */}
      <Popover
        open={filterOpen}
        anchorEl={filterAnchor}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
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
            <Stack direction="row" alignItems="center" spacing={1}>
              {/* SAVED FILTER DROPDOWN */}
              <Button
                size="small"
                onClick={(event) => {
                  setSavedFilterAnchor(event.currentTarget);
                }}
                endIcon={<Iconify icon="eva:chevron-down-fill" />}
                sx={{
                  color: 'text.primary',
                  fontWeight: 700,
                  px: 1,
                }}
              >
                {selectedSavedFilter?.name || 'New Filter'}
              </Button>

              {/* SAVED FILTER MENU */}
              <Menu
                anchorEl={savedFilterAnchor}
                open={Boolean(savedFilterAnchor)}
                onClose={() => setSavedFilterAnchor(null)}
                slotProps={{
                  paper: {
                    sx: {
                      minWidth: 260,
                    },
                  },
                }}
              >
                {savedFilters.length === 0 ? (
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      No saved filters
                    </Typography>
                  </MenuItem>
                ) : (
                  savedFilters.map((savedFilter) => (
                    <MenuItem
                      key={savedFilter.id}
                      selected={selectedSavedFilter?.id === savedFilter.id}
                      onClick={() => loadSavedFilter(savedFilter)}
                      sx={{
                        pr: 1,
                      }}
                    >
                      <ListItemText
                        primary={savedFilter.name}
                        primaryTypographyProps={{
                          noWrap: true,
                        }}
                      />

                      {/* RENAME */}
                      <IconButton
                        size="small"
                        onClick={(event) => openRenameDialog(event, savedFilter)}
                        sx={{
                          ml: 1,
                        }}
                      >
                        <Iconify icon="solar:pen-bold" />
                      </IconButton>

                      {/* DELETE */}
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(event) => deleteSavedFilter(event, savedFilter.id)}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </MenuItem>
                  ))
                )}
              </Menu>
            </Stack>

            {filters.length > 0 && (
              <Button size="small" color="error" onClick={clearFilters}>
                Clear all
              </Button>
            )}
          </Stack>

          {/* FILTER ROWS */}
          <Stack
            spacing={1}
            sx={{
              mt: 2,
              maxHeight: 350,
              overflowY: 'auto',
            }}
          >
            {filters.map((filter) => {
              const noValueOperator =
                filter.operator === 'isEmpty' || filter.operator === 'isNotEmpty';

              return (
                <Stack
                  key={filter.id}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    mt: 2,
                  }}
                >
                  {/* FIELD */}
                  <TextField
                    select
                    size="small"
                    label="Columns"
                    value={filter.field}
                    onChange={(event) => updateFilter(filter.id, 'field', event.target.value)}
                    sx={{
                      width: 400,
                    }}
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
                    sx={{
                      width: 300,
                    }}
                  >
                    {OPERATOR_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  {/* VALUE */}
                  {!noValueOperator &&
                    (filter.field === 'status' ? (
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
                    ))}

                  {/* DELETE */}
                  <IconButton size="small" color="error" onClick={() => removeFilter(filter.id)}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Stack>
              );
            })}
          </Stack>

          {/* FOOTER */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              mt: 3,
            }}
          >
            {/* ADD FILTER */}
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addFilter}
            >
              Add filter
            </Button>

            <Stack direction="row" spacing={1}>
              {/* CANCEL */}
              <Button size="small" onClick={handleFilterClose}>
                Cancel
              </Button>

              {/* SAVE */}
              <Button
                size="small"
                startIcon={<Iconify icon="solar:diskette-bold" />}
                onClick={openSaveDialog}
                disabled={appliedFilters.length === 0}
                variant="outlined"
              >
                Save
              </Button>

              {/* APPLY */}
              <Button variant="contained" size="small" onClick={applyFilters} color="primary">
                Apply
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>

      {/* ------------------------------------------------------------------ */}
      {/* SAVE FILTER DIALOG */}
      {/* ------------------------------------------------------------------ */}

      <Dialog open={saveDialogOpen} onClose={closeSaveDialog} fullWidth maxWidth="xs">
        <DialogTitle>Save Filter</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            label="Filter name"
            placeholder="e.g. Active Users"
            value={saveFilterName}
            onChange={(event) => setSaveFilterName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                saveCurrentFilter();
              }
            }}
            sx={{
              mt: 1,
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeSaveDialog}>Cancel</Button>

          <Button
            variant="contained"
            onClick={saveCurrentFilter}
            disabled={!saveFilterName.trim()}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* ------------------------------------------------------------------ */}
      {/* RENAME FILTER DIALOG */}
      {/* ------------------------------------------------------------------ */}

      <Dialog open={renameDialogOpen} onClose={closeRenameDialog} fullWidth maxWidth="xs">
        <DialogTitle>Rename Filter</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            label="Filter name"
            value={renameFilterName}
            onChange={(event) => setRenameFilterName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                renameSavedFilter();
              }
            }}
            sx={{
              mt: 1,
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeRenameDialog}>Cancel</Button>

          <Button
            variant="contained"
            onClick={renameSavedFilter}
            disabled={!renameFilterName.trim()}
            color="primary"
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
