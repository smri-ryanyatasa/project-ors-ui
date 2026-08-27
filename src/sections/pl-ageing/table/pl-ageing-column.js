// import { Chip, Stack, Typography } from '@mui/material';

export const PlAgeingTableColumns = () => [
  {
    field: 'filename',
    headerName: 'PL Filename',
    width: 270,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'line_items',
    headerName: 'Line Items',
    width: 70,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'current_status',
    headerName: 'Current Status',
    width: 140,
  },
  {
    field: 'uploaded_date',
    headerName: 'Upload Date',
    width: 120,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'available_date',
    headerName: 'Available Date',
    width: 120,
  },
  {
    field: 'aging_upload_available',
    headerName: 'Ageing (Days) from Upload to Available',
    width: 120,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'initial_receipt_date',
    headerName: 'Initial Receipt Date',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'aging_available_initial',
    headerName: 'Ageing (Days) from Available to Initial Receipt',
    width: 140,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'approved_receipt_date',
    headerName: 'Approved Receipt Date',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'aging_initial_approve',
    headerName: 'Ageing (Days) from Initial Receipt to Approved Receipt',
    width: 150,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'po_generated_date',
    headerName: 'MMS PO Generated Date',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'aging_approve_po_gen',
    headerName: 'Ageing (Days) from Approved Receipt to MMS PO Creation',
    width: 160,
    headerClassName: 'wrapped-header',
  },
];
