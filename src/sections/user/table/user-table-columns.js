import { Chip, Avatar, Stack, Typography, Box, Tooltip, IconButton } from '@mui/material';

import { _mock } from 'src/_mock';
import { SvgColor } from 'src/components/svg-color';

export const UserTableColumns = [
  {
    field: 'full_name',
    headerName: 'Name & Email',
    flex: 1.5,
    renderCell: (params) => (
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: 1 }}>
        <Avatar src={_mock.image.avatar(1 + 1)} sx={{ width: 40, height: 40 }}></Avatar>

        <Stack spacing={0}>
          <Typography variant="body2" fontWeight={600} noWrap>
            {params.row.full_name}
          </Typography>

          <Typography variant="caption" color="text.secondary" noWrap>
            {params.row.email_address}
          </Typography>
        </Stack>
      </Stack>
    ),
  },
  {
    field: 'user_name',
    headerName: 'Username',
    flex: 1,
  },
  {
    field: 'auth_domain',
    headerName: 'Role',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
        <Typography variant="body2">Administrator</Typography>
      </Stack>
    ),
  },
  {
    field: 'position',
    headerName: 'Position',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
        <Typography variant="body2">Merchandising</Typography>
      </Stack>
    ),
  },
  {
    field: 'mms',
    headerName: 'From MMS?',
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => {
      const active = 1;
      return (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ height: '100%' }}
        >
          <SvgColor
            src={
              active
                ? '/assets/icons/solar/solar--check-circle-bold.svg'
                : '/assets/icons/solar/solar--close-circle-bold.svg'
            }
            sx={{ color: active ? 'success.main' : 'error.main', width: 20, height: 20 }}
          />

          <Typography variant="body2">{params.value}</Typography>
        </Stack>
      );
    },
  },
  {
    field: 'branches',
    headerName: 'Branch Details',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1,
            py: 0.5,
            borderRadius: 1,
            bgcolor: 'grey.100',
          }}
        >
          <SvgColor
            src="/assets/icons/solar/solar--map-point-bold.svg"
            sx={{ width: 14, height: 14, color: 'text.secondary' }}
          />

          <Typography variant="caption">Branch 1</Typography>
        </Box>
      </Stack>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'Active' ? 'success' : 'error'}
        size="small"
      />
    ),
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', height: '100%' }}
      >
        <Tooltip title="Edit">
          <IconButton size="small">
            <SvgColor
              src="/assets/icons/solar/solar--pen-bold.svg"
              sx={{ width: 18, height: 18 }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Change Password">
          <IconButton size="small">
            <SvgColor
              src="/assets/icons/solar/solar--shield-user-bold.svg"
              sx={{ width: 18, height: 18 }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Activity Logs">
          <IconButton size="small">
            <SvgColor
              src="/assets/icons/solar/solar--clock-circle-bold.svg"
              sx={{ width: 18, height: 18 }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton size="small" color="error">
            <SvgColor
              src="/assets/icons/solar/solar--trash-bin-2-bold.svg"
              sx={{ width: 18, height: 18 }}
            />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];
