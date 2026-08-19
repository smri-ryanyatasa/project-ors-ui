// import { Chip, Stack, Typography } from '@mui/material';

export const InitialPlReceivingTableColumns = () => [
  {
    field: 'material_code',
    headerName: 'Material Code',
    flex: 1,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'material_name',
    headerName: 'Material Description',
    flex: 1,
  },
  {
    field: 'mms_sku_code',
    headerName: 'MMS SKU Code',
    flex: 1,
  },
  {
    field: 'size',
    headerName: 'Size/Dim',
    flex: 1,
  },
  {
    field: 'uom',
    headerName: 'UOM',
    flex: 1,
  },
  {
    field: 'received_by',
    headerName: 'Received By',
    flex: 1,
    type: 'number',
  },
  {
    field: 'actual_received',
    headerName: 'Actual Received',
    flex: 1,
    type: 'number',
  },
  {
    field: 'vendor_code',
    headerName: 'Date & Time Uploaded',
    flex: 1,
    type: 'number',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
  },
];
