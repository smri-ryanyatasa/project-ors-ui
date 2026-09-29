import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { UserTableColumns } from './user-table-columns';

export function UserTable(props) {
  const FIELD_OPTIONS = [
    { value: 'user_name', label: 'Username' },
    { value: 'full_name', label: 'Fullname' },
    { value: 'email_address', label: 'Email' },
    { value: 'status', label: 'Status' },
    { value: 'role_name', label: 'Role Name' },
    { value: 'position', label: 'Position' },
  ];

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
      getRowHeight={() => 'auto'}
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
      sortingOrder={['asc', 'desc']}
      sortModel={props.sortModel}
      onSortModelChange={props.onSortModelChange}
      slots={{
        toolbar: CustomToolbar,
      }}
      slotProps={{
        toolbar: {
          onDownloadCsv: props.onDownloadCsv,
          onDownloadExcel: props.onDownloadExcel,
          filterModel: props.customFilterModel,
          onFilterModelChange: props.onCustomFilterModelChange,
          onSaveFilter: props.onSaveFilter,
          getSaveFilter: props.getSaveFilter,
          onDeleteSavedFilter: props.onDeleteSavedFilter,
          onUpdateSavedFilter: props.onUpdateSavedFilter,
          fieldOptions: FIELD_OPTIONS,
          gridKey: 'users',
        },
        columnMenu: {
          slots: {
            columnMenuFilterItem: null,
          },
        },
        loadingOverlay: {
          variant: 'linear-progress',
          noRowsVariant: 'linear-progress',
        },
      }}
      sx={{
        '& .MuiDataGrid-row': {
          minHeight: '52px !important',
        },
        '& .first-column-header': {
          pl: 2,
        },

        '& .first-column-cell': {
          pl: 2,
        },
      }}
    />
  );
}
