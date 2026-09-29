import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { PlMasterfileTableColumns } from './pl-masterfile-column';

export function PlMasterfileTable(props) {
  const FIELD_OPTIONS = [
    { value: 'filename', label: 'PL Filename' },
    { value: 'status', label: 'Status' },
    { value: 'si_number', label: 'SI Number' },
    { value: 'branch_code', label: 'Branch Code' },
    { value: 'material', label: 'Material' },
    { value: 'vendor_code', label: 'Vendor Code' },
    { value: 'uploaded_by', label: 'Uploaded By' },
    { value: 'uploaded_date', label: 'Uploaded Date' },
  ];

  const columns = PlMasterfileTableColumns();

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          loading={props.loading}
          rows={props.pls}
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
              gridKey: 'pl_masterfile',
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
