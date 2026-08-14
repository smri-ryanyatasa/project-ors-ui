export const FinalPlReceivingTableColumns = () => [
  {
    field: 'uploaded_at',
    headerName: 'Material Code',
    width: 190,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'filename',
    headerName: 'Material Description',
    width: 220,
  },
  {
    field: 'branch',
    headerName: 'MMS SKU Code',
    width: 100,
  },
  {
    field: 'vendor_code',
    headerName: 'MMS SKU Name',
    width: 130,
  },
  {
    field: 'vendor_name',
    headerName: 'Size/Dim',
    width: 200,
  },
  {
    field: 'total_items',
    headerName: 'UOM',
    width: 120,
    type: 'number',
  },
  {
    field: 'processed_items',
    headerName: 'PL Qty',
    width: 120,
    type: 'number',
  },
  {
    field: 'failed_items',
    headerName: 'Initial Received',
    width: 100,
    type: 'number',
  },
  {
    field: 'uploaded_by',
    headerName: 'Actual Received',
    width: 160,
  },
  {
    field: 'status',
    headerName: 'Initial-Final Decrepancy',
    width: 130,
  },
  {
    field: 'uploaded_by',
    headerName: 'Initial Received By',
    width: 160,
  },
  {
    field: 'uploaded_by',
    headerName: 'Date/Time Initially Received',
    width: 160,
  },
  {
    field: 'uploaded_by',
    headerName: 'Final Received Qty Updated By',
    width: 160,
  },
  {
    field: 'uploaded_by',
    headerName: 'Date/Time Final Received Qty',
    width: 160,
  },
];
