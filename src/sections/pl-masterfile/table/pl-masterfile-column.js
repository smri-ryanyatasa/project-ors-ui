import { Chip, Stack, Typography } from '@mui/material';

export const PlMasterfileTableColumns = () => [
  {
    field: 'filename',
    headerName: 'PL File Name',
    flex: 2,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'status',
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
          label={params.value}
          color={params.value.trim() == 'Available' ? 'success' : 'error'}
          size="small"
        />
      </Stack>
    ),
  },
  {
    field: 'si_number',
    headerName: 'SI',
    flex: 1,
  },
  {
    field: 'branch_code',
    headerName: 'Branch Code',
    flex: 1,
  },
  {
    field: 'material',
    headerName: 'Material',
    flex: 1,
  },
  {
    field: 'vendor_code',
    headerName: 'Vendor',
    flex: 1,
  },
  {
    field: 'uploaded_by',
    headerName: 'Uploaded By',
    flex: 1,
  },
  {
    field: 'uploaded_date',
    headerName: 'Uploaded Date & Time',
    flex: 1,
  },
];
