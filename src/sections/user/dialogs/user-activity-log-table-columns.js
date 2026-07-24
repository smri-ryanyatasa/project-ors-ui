import { Stack, Typography } from '@mui/material';

export const UserActivityLogColumns = () => [
  {
    field: 'created_date',
    headerName: 'Date & Time',
    flex: 1.5,
  },
  {
    field: 'log_name',
    headerName: 'User',
    flex: 2,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
        <Typography variant="body2">{params.row.new_full_name}</Typography>
      </Stack>
    ),
  },
  {
    field: 'action_type',
    headerName: 'Action',
    flex: 1.5,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
        <Typography variant="body2">
          {params.row.action_type == 'I' ? 'Created' : 'Updated'}
        </Typography>
      </Stack>
    ),
  },
];
