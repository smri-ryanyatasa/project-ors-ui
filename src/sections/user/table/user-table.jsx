import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { UserTableColumns } from './user-table-columns';

export function UserTable(props) {
  const columns = UserTableColumns({
    onDelete: props.onDelete,
    onUpdate: props.onUpdate,
    onChangePassword: props.onChangePassword,
    onActivityLog: props.onActivityLog,
  });

  return (
    <DataGrid
      rows={props.users}
      loading={props.loading}
      columns={columns}
      getRowId={(row) => row.user_id}
      rowHeight={66}
      checkboxSelection
      disableRowSelectionOnClick
      // server-side
      paginationMode="server"
      filterMode="server"
      rowCount={props.rowCount}
      pageSizeOptions={[5, 10, 25]}
      // pagination
      paginationModel={props.paginationModel}
      onPaginationModelChange={props.onPaginationModelChange}
      // server-side sorting
      onFilterModelChange={props.onFilterModelChange}
      filterModel={props.filterModel}
      // sort
      sortingMode="server"
      sortModel={props.sortModel}
      onSortModelChange={props.onSortModelChange}
      slots={{
        toolbar: CustomToolbar,
      }}
      slotProps={{
        toolbar: {
          onDownloadCsv: props.onDownloadCsv,
          onDownloadExcel: props.onDownloadExcel,
        },
      }}
    />
  );
}
