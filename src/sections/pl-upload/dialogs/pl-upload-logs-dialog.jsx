import { DataGrid } from '@mui/x-data-grid';
import { Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { PlLogsColumn } from './pl-activity-logs-column';

export function PlUploadLogsDialog({ open, onClose, pl, logs, loading }) {
  const columns = PlLogsColumn();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Filename: {pl.filename}</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <DataGrid
            rows={logs}
            columns={columns}
            loading={loading}
            showToolbar={false}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: {
                  page: 0,
                  pageSize: 5,
                },
              },
            }}
            disableRowSelectionOnClick
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
