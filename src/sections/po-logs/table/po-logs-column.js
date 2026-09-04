export const POLogsTableColumns = () => [
  {
    field: 'filename',
    headerName: 'PL Filename',
    width: 190,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'si_number',
    headerName: 'Sales Invoice',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'branch_code',
    headerName: 'Branch',
    width: 70,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'line_items',
    headerName: 'Line Items',
    width: 70,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'approved_receipt_date',
    headerName: 'Date and Time in Approved Receipt Status',
    width: 190,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'failed_date',
    headerName: 'Date and Time of Failed PO Generation',
    width: 190,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'po_generated_date',
    headerName: 'Date and Time of Successfully Generated PO',
    width: 200,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'aging',
    headerName: 'Aging (Mins) from Approved Receipt to Successfully Generated PO',
    width: 200,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'mms_po_number',
    headerName: 'MMS PO Number',
    width: 100,
    headerClassName: 'wrapped-header',
  },
];
