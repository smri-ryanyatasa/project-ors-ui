import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { PlUploadTableColumns } from './pl-upload-column';

const rows = [
  {
    id: 1,
    file_name: 'users-january-07252026.xlsx',
    file_type: '2026-07-25',
    uploaded_by: 'John Doe',
    uploaded_date: '1',
    status: '2 out of 8 lines have errors',
  },
  {
    id: 2,
    file_name: 'users-february-07252026.xlsx',
    file_type: '2026-07-24',
    uploaded_by: 'Jane Smith',
    uploaded_date: '2',
    status: 'Successfully uploaded with no error',
  },
  {
    id: 3,
    file_name: 'users-march-07252026.csv',
    file_type: '2026-07-23',
    uploaded_by: 'Mark Wilson',
    uploaded_date: '2',
    status: 'Successfully uploaded with no error',
  },
];

export function PlUploadTable() {
  const columns = PlUploadTableColumns();

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          slots={{
            toolbar: CustomToolbar,
          }}
          sx={{
            '& .first-column-header': {
              pl: 2,
            },

            '& .first-column-cell': {
              pl: 2,
            },
          }}
        />
      </Box>
    </Card>
  );
}
