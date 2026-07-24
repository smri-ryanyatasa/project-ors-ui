import { Box, Chip, Stack, Avatar, Tooltip, Typography, IconButton } from '@mui/material';

import { _mock } from 'src/_mock';

import { SvgColor } from 'src/components/svg-color';
import { stack } from 'src/theme/core/components/stack';

export const UserTableColumns = ({ onDelete, onUpdate, onChangePassword, onActivityLog }) => [
  {
    field: 'full_name',
    headerName: 'Name & Email',
    flex: 1.5,
    renderCell: (params) => (
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: 1 }}>
        <Avatar src={_mock.image.avatar(1 + 1)} sx={{ width: 40, height: 40 }} />

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
        <Typography variant="body2">{params.row.user_name}</Typography>
      </Stack>
    ),
  },
  {
    field: 'role_name',
    headerName: 'Role',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
        <Typography variant="body2">{params.row.role_name}</Typography>
      </Stack>
    ),
  },
  {
    field: 'position',
    headerName: 'Position',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '100%' }}>
        <Typography variant="body2">{params.row.position}</Typography>
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

          {/* <Typography variant="body2">{params.value}</Typography> */}
        </Stack>
      );
    },
  },
  {
    field: 'branches',
    headerName: 'Branch Details',
    width: 250,
    renderCell: (params) => {
      const branches = params.row.branches
        ?.split(',')
        .map((branch) => branch.trim())
        .filter(Boolean);

      return (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ height: '100%', flexWrap: 'wrap' }}
        >
          {branches.map((branch) => (
            <Box
              key={branch}
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
                sx={{
                  width: 14,
                  height: 14,
                  color: 'text.secondary',
                }}
              />

              <Typography variant="caption">{branch}</Typography>
            </Box>
          ))}
        </Stack>
      );
    },
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
          color={params.value === 'Active' ? 'success' : 'error'}
          size="small"
        />
      </Stack>
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
          <IconButton size="small" onClick={() => onUpdate(params.row)}>
            <SvgColor
              src="/assets/icons/solar/solar--pen-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Change Password">
          <IconButton size="small" onClick={() => onChangePassword(params.row)}>
            <SvgColor
              src="/assets/icons/solar/solar--shield-user-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Activity Logs">
          <IconButton size="small" onClick={() => onActivityLog(params.row)}>
            <SvgColor
              src="/assets/icons/solar/solar--clock-circle-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton size="small" color="error" onClick={() => onDelete(params.row)}>
            <SvgColor
              src="/assets/icons/solar/solar--trash-bin-2-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];
