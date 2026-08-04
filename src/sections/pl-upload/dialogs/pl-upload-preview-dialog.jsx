import { DataGrid } from '@mui/x-data-grid';

export function PlUploadPreviewTable(props) {
  const columns = [
    {
      field: 'document_no',
      headerName: 'DD No',
      flex: 1,
    },
    {
      field: 'sales_invoice_no',
      headerName: 'SI',
      flex: 1,
    },
    {
      field: 'ship_to_code',
      headerName: 'Ship to Code',
      flex: 1,
    },
    {
      field: 'consignee',
      headerName: 'Consignee',
      flex: 1,
    },
    {
      field: 'uom',
      headerName: 'UOM',
      flex: 1,
    },
    {
      field: 'material',
      headerName: 'Material',
      flex: 1,
    },
    {
      field: 'size',
      headerName: 'Size',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'served_qty',
      headerName: 'Served Qty',
      flex: 1,
    },
    {
      field: 'carton_qty',
      headerName: 'Carton Qty',
      flex: 1,
    },
    {
      field: 'branch_code',
      headerName: 'Branch',
      flex: 1,
    },
    {
      field: 'vendor_code',
      headerName: 'Vendor',
      flex: 1,
    },
  ];

  const rows = props.rows.map((row, index) => ({
    document_no: row['DD No'],
    sales_invoice_no: row['SI'],
    ship_to_code: row['Ship To Code'],
    consignee: row['Consignee'],
    uom: row['UOM'],
    material: row['Material'],
    size: row['Size No'],
    description: row['Description'],
    served_qty: row['Served Qty'],
    carton_qty: row['Carton Qty'],
    branch_code: row['Branch'],
    vendor_code: row['Vendor'],
    unique_id: `${Date.now()}-${index}`,
  }));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.unique_id}
      rowHeight={66}
      showToolbar={false}
      disableRowSelectionOnClick
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: {
          paginationModel: {
            page: 0,
            pageSize: 5,
          },
        },
      }}
    />
  );
}
