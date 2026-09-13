
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export function VendorListDialog({ open, data, onClose }) {
  const result = data.map((item) => {
    const [code, ...nameParts] = item.split('-');

    return {
      code: code.trim(),
      name: nameParts.join('-').trim(),
    };
  });

  const columns = [
    {
      field: 'code',
      headerName: 'Vendor Code',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Vendor Name',
      flex: 1,
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Alternative Vendor Code & Name</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <DataGrid
            rows={result}
            columns={columns}
            showToolbar={false}
            getRowId={(row) => row.code}
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
