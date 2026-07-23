import { Box, Chip, Stack, Avatar, Tooltip, Typography, IconButton } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export const RoleTableColumns = ({ onUpdate, onDelete }) => [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 180,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1.5,
    minWidth: 250,
  },
  {
    field: 'level',
    headerName: 'Level',
    width: 100,
  },
  {
    field: 'default_dashboard',
    headerName: 'Default Dashboard',
    flex: 1,
    minWidth: 200,
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
