export const POLogsTableColumns = () => [
  {
    field: 'uploaded_at',
    headerName: 'PL Filenam',
    width: 190,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'filename',
    headerName: 'Sales Invoice',
    width: 220,
  },
  {
    field: 'branch',
    headerName: 'Branch',
    width: 100,
  },
  {
    field: 'vendor_code',
    headerName: 'Line Items',
    width: 130,
  },
  {
    field: 'vendor_name',
    headerName: 'D/T of Time Approved Rcpt.',
    width: 200,
  },
  {
    field: 'total_items',
    headerName: 'D/T of Failed PO Generation',
    width: 120,
    type: 'number',
  },
  {
    field: 'processed_items',
    headerName: 'D/T of Successful Gen. PO',
    width: 120,
    type: 'number',
  },
  {
    field: 'failed_items',
    headerName: 'Aging (Mins) - Approval to Gen. PO',
    width: 100,
    type: 'number',
  },
  {
    field: 'uploaded_by',
    headerName: 'User',
    width: 160,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
  },
];
