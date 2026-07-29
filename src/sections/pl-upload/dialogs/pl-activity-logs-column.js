import { Chip, Stack, Typography } from '@mui/material';

export const PlLogsColumn = () => [
  {
    field: 'uploaded_date',
    headerName: 'Date & Time',
    flex: 1.5,
  },
  {
    field: 'uploaded_by',
    headerName: 'User',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
        <Typography variant="body2">{params.row.uploaded_by}</Typography>
      </Stack>
    ),
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
          color={params.value == 'Available' ? 'success' : 'error'}
          size="small"
        />
      </Stack>
    ),
  },
  {
    field: 'result',
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
          sx={{ color: params.row.status == 'Available' ? 'green' : 'red' }}
        >
          {params.value}
        </Typography>
      </Stack>
    ),
  },
];
