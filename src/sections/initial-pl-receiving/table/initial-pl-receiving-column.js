// import { Chip, Stack, Typography } from '@mui/material';

export const InitialPlReceivingTableColumns = () => [
  {
    field: 'uploaded_at',
    headerName: 'Uploaded Date & Time',
    width: 190,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'filename',
    headerName: 'Filename',
    width: 220,
  },
  {
    field: 'branch',
    headerName: 'Branch',
    width: 100,
  },
  {
    field: 'vendor_code',
    headerName: 'Vendor Code',
    width: 130,
  },
  {
    field: 'vendor_name',
    headerName: 'Vendor Name',
    width: 200,
  },
  {
    field: 'total_items',
    headerName: 'Total Items',
    width: 120,
    type: 'number',
  },
  {
    field: 'processed_items',
    headerName: 'Processed',
    width: 120,
    type: 'number',
  },
  {
    field: 'failed_items',
    headerName: 'Failed',
    width: 100,
    type: 'number',
  },
  {
    field: 'uploaded_by',
    headerName: 'Uploaded By',
    width: 160,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
  },
];
