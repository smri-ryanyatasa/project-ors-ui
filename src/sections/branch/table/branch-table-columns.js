import { Box, Chip, Stack, Avatar, Tooltip, Typography, IconButton } from '@mui/material';

import { _mock } from 'src/_mock';

import { SvgColor } from 'src/components/svg-color';

export const BranchTableColumns = () => [
  {
    field: 'branch_code',
    headerName: 'Branch Code',
    flex: 1,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'branch_name',
    headerName: 'Branch Name',
    flex: 1,
  },
  {
    field: 'warehouse_code',
    headerName: 'Warehouse Code',
    flex: 1,
  },
  {
    field: 'warehouse_name',
    headerName: 'Warehouse Name',
    flex: 1,
  },
  {
    field: 'store_type',
    headerName: 'Store Type',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1} sx={{ height: '100%' }}>
        <Chip label={params.value} size="small" variant="outlined" />
      </Stack>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1} sx={{ height: '100%' }}>
        <Chip
          label={params.value.trim() == 'A' ? 'Active' : 'Inactive'}
          color={params.value.trim() == 'A' ? 'success' : 'error'}
          size="small"
        />
      </Stack>
    ),
  },
];
