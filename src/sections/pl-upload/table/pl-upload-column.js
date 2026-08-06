import { Chip, Stack, Tooltip, Typography, IconButton } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export const PlUploadTableColumns = ({
  onPlUploadLog,
  onPlUploadException,
  onDelete,
  onPlReUpload,
}) => [
  {
    field: 'filename',
    headerName: 'PL File Name',
    flex: 1.5,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'uploaded_date',
    headerName: 'Date & Time Uploaded',
    flex: 1,
    renderCell: (params) => {
      const date = new Date(params.value);

      return date.toLocaleString('en-PH', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    },
  },
  {
    field: 'uploaded_by',
    headerName: 'User',
    flex: 1,
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
        // justifyContent="center"
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
        <Tooltip title="Download PL Exception">
          <span>
            <IconButton
              size="small"
              disabled={params.row.status == 'Available' ? true : false}
              onClick={() => onPlUploadException(params.row)}
            >
              <SvgColor
                src="/assets/icons/solar/solar--file-download-bold.svg"
                sx={{ width: 20, height: 20 }}
              />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Reupload Packing List">
          <span>
            <IconButton
              size="small"
              disabled={params.row.status == 'Available' ? true : false}
              onClick={() => onPlReUpload(params.row)}
            >
              <SvgColor
                src="/assets/icons/solar/solar--cloud-upload-bold.svg"
                sx={{ width: 20, height: 20 }}
              />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="View Logs">
          <IconButton size="small" onClick={() => onPlUploadLog(params.row)}>
            <SvgColor
              src="/assets/icons/solar/solar--eye-bold.svg"
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
