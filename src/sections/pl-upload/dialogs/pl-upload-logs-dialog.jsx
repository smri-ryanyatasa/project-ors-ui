import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Stack,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { PlLogsColumn } from './pl-activity-logs-column';

export function PlUploadLogsDialog({ open, onClose, pl, logs, loading }) {
  const columns = PlLogsColumn();

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>PL Upload Logs</DialogTitle>

      <DialogContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            p: 1.5,
            mb: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              component="img"
              src="/assets/icons/solar/excel.svg"
              sx={{
                width: 48,
                height: 48,
              }}
            />
            <Stack>
              <Typography variant="body2">{pl.filename}</Typography>
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(pl.file_size)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

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
