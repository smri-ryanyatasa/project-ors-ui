import { DataGrid } from '@mui/x-data-grid';

import { RoleTableColumns } from './role-table-column';

export function RoleTable(props) {
  const columns = RoleTableColumns({
    onUpdate: props.onUpdate,
    onDelete: props.onDelete,
  });
  return (
    <DataGrid
      rows={props.roles}
      columns={columns}
      getRowId={(row) => row.id}
      disableRowSelectionOnClick
      checkboxSelection
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
            page: 0,
          },
        },
      }}
    />
  );
}
