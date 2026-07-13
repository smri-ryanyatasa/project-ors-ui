import { DataGrid } from '@mui/x-data-grid';

import { UserTableColumns } from './user-table-columns';

export function UserTable(props) {
  const columns = UserTableColumns({
    onDelete: props.onDelete,
  });

  return (
    <DataGrid
      rows={props.users}
      columns={columns}
      getRowId={(row) => row.user_id}
      rowHeight={66}
      checkboxSelection
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
