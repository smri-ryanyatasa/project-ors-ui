import { Chip, Stack, Tooltip, Typography, IconButton } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export const PlMasterfileTableColumns = () => [
  {
    field: 'file_name',
    headerName: 'PL File Name',
    flex: 2,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'file_type',
    headerName: 'Date & Time Uploaded',
    flex: 1,
  },
  {
    field: 'uploaded_by',
    headerName: 'User',
    flex: 1,
  },
  {
    field: 'uploaded_date',
    headerName: 'Status',
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ height: '100%' }}
      >
        <Chip
          label={params.value == '2' ? 'Available' : 'Uploaded'}
          color={params.value == '2' ? 'success' : 'error'}
          size="small"
        />
      </Stack>
    ),
  },
  {
    field: 'status',
    headerName: 'Result',
    flex: 2,
    renderCell: (params) => (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ height: '100%' }}
      >
        <Typography
          variant="body2"
          sx={{ color: params.row.uploaded_date == '2' ? 'green' : 'red' }}
        >
          {params.value}
        </Typography>
      </Stack>
    ),
  },
];
