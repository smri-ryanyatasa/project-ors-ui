import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { BranchTableColumns } from './branch-table-columns';

export function BranchTable(props) {
  const FIELD_OPTIONS = [
    { value: 'branch_code', label: 'Branch Code' },
    { value: 'branch_name', label: 'Branch Name' },
    { value: 'warehouse_code', label: 'Warehouse Code' },
    { value: 'warehouse_name', label: 'Warehouse Name' },
    { value: 'store_type', label: 'Store Type' },
    { value: 'status', label: 'Status' },
  ];

  const columns = BranchTableColumns();

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          loading={props.loading}
          rows={props.branches}
          columns={columns}
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
              gridKey: 'branch',
            },
            loadingOverlay: {
              variant: 'linear-progress',
              noRowsVariant: 'linear-progress',
            },
          }}
          sx={{
            '& .first-column-header': {
              pl: 2,
            },

            '& .first-column-cell': {
              pl: 2,
            },
          }}
        />
      </Box>
    </Card>
  );
}
