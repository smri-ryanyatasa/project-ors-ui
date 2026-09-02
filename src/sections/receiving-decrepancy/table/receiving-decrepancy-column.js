import dayjs from 'dayjs';

import { Typography } from '@mui/material';

export const ReceivingDecrepancyTableColumns = () => [
  {
    field: 'filename',
    headerName: 'PL Filename',
    width: 130,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'si_number',
    headerName: 'Sales Invoice',
    width: 120,
  },
  {
    field: 'branch_code',
    headerName: 'Branch Code',
    width: 70,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'branch_name',
    headerName: 'Branch Name',
    width: 150,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'material_code',
    headerName: 'Material Code',
    width: 120,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'material_name',
    headerName: 'Material Name',
    width: 120,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'mms_sku_code',
    headerName: 'MMS SKU Code',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'mms_sku_name',
    headerName: 'MMS SKU Name',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'vendor_code',
    headerName: 'Vendor Code',
    width: 70,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'vendor_name',
    headerName: 'Vendor Name',
    width: 150,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'size',
    headerName: 'Size/ Dim',
    width: 60,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'uom',
    headerName: 'UOM',
    width: 60,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'pl_qty',
    headerName: 'PL Qty',
    width: 60,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'initial_qty',
    headerName: 'Initial Received Qty',
    width: 80,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'pl_initial_discrepancy',
    headerName: 'PL-Initial Discrepancy',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'final_qty',
    headerName: 'Final Received Qty',
    width: 80,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'initial_final_discrepancy',
    headerName: 'Initial-Final Discrepancy',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'initial_received_by',
    headerName: 'Initially Received By',
    width: 150,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'initial_received_date',
    headerName: 'Date/Time Initially Received',
    width: 150,
    headerClassName: 'wrapped-header',
    renderCell: (params) => {
      const date = params.value;
      return (
        <Typography variant="body2">
          {date ? dayjs(date).format('DD MMMM YYYY hh:mm A') : ''}
        </Typography>
      );
    },
  },
  {
    field: 'confirmed_receipt_by',
    headerName: 'Initial Receipt Confirmed By',
    width: 150,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'confirmed_receipt_date',
    headerName: 'Date/Time Initial Receipt Confirmed',
    width: 150,
    headerClassName: 'wrapped-header',
    renderCell: (params) => {
      const date = params.value;
      return (
        <Typography variant="body2">
          {date ? dayjs(date).format('DD MMMM YYYY hh:mm A') : ''}
        </Typography>
      );
    },
  },
  {
    field: 'final_received_by',
    headerName: 'Final Received Qty Uploaded By',
    width: 150,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'final_received_date',
    headerName: 'Date/Time of Uploaded Final Received Qty',
    width: 150,
    headerClassName: 'wrapped-header',
    renderCell: (params) => {
      const date = params.value;
      return (
        <Typography variant="body2">
          {date ? dayjs(date).format('DD MMMM YYYY hh:mm A') : ''}
        </Typography>
      );
    },
  },
  {
    field: 'approved_receipt_by',
    headerName: 'Final Receipt Approved By',
    width: 150,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'approved_receipt_date',
    headerName: 'Date/Time of Final Receipt Approved',
    width: 150,
    headerClassName: 'wrapped-header',
    renderCell: (params) => {
      const date = params.value;
      return (
        <Typography variant="body2">
          {date ? dayjs(date).format('DD MMMM YYYY hh:mm A') : ''}
        </Typography>
      );
    },
  },
];
