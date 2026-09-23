import { useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { SearchToolbar } from './custom-toolbar/search-toolbar';

const columns = [
  {
    field: 'user_name',
    headerName: 'User IDs',
    flex: 1,
  },
];

export function MMSUserDialog({ open, users, onSave, onClose }) {
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const isDisabled = users.length > 0 ? false : true;

  const handleInsertMmsUser = async () => {
    try {
      setLoading(true);
      await onSave(selectedRows);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectionChange = (selection) => {
    const selectedIds = selection.ids;

    const rows = users.filter((row) => selectedIds.has(row.id));

    setSelectedRows(rows);
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="sm">
      <DialogTitle>Select Users from MMS</DialogTitle>

      <DialogContent>
        <DataGrid
          rows={users}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          slots={{
            toolbar: SearchToolbar,
          }}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 10,
              },
            },
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancel
        </Button>

        <Button
          color="primary"
          variant="contained"
          disabled={isDisabled}
          loading={loading}
          onClick={handleInsertMmsUser}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
