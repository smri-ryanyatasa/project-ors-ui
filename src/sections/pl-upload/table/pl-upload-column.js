import { Chip, Stack, Tooltip, Typography, IconButton } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export const PlUploadTableColumns = () => [
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
              src="/assets/icons/solar/solar--file-download-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Change Password">
          <IconButton size="small">
            <SvgColor
              src="/assets/icons/solar/solar--cloud-upload-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Activity Logs">
          <IconButton size="small">
            <SvgColor
              src="/assets/icons/solar/solar--eye-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton size="small" color="error">
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
