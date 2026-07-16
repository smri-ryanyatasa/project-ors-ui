import { DataGrid } from '@mui/x-data-grid';

export function UserBulkUploadPreviewTable(props) {
  const columns = [
    {
      field: 'user_name',
      headerName: 'Username',
      flex: 1,
    },
    {
      field: 'full_name',
      headerName: 'Full Name',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
    },
    {
      field: 'position',
      headerName: 'Position',
      flex: 1,
    },
    {
      field: 'email_address',
      headerName: 'Email Address',
      flex: 1,
    },
    {
      field: 'branches',
      headerName: 'Branch Details',
      flex: 1,
    },
    {
      field: 'user_status',
      headerName: 'Status',
      flex: 1,
    },
  ];

  const rows = props.rows.map((row) => ({
    user_name: row['User ID'],
    full_name: row['Full Name'],
    email_address: row['Email Address'],
    from_mms: row['From MMS'],
    role: row['Role'],
    position: row['Position'],
    branches: row['Branch Details'],
    user_status: row['Status'],
  }));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.user_name}
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
