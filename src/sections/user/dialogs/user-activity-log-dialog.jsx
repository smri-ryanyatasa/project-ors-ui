import { DataGrid } from '@mui/x-data-grid';
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export function UserActivityLogsDialog({ open, onClose, user, logs, loading }) {
  const columns = [
    {
      field: 'log_name',
      headerName: 'Activity',
      flex: 2,
    },
    {
      field: 'created_at',
      headerName: 'Date & Time',
      flex: 1.5,
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Activity Log - {user?.full_name}</DialogTitle>

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
