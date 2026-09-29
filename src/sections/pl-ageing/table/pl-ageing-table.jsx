import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { PlAgeingTableColumns } from './pl-ageing-column';

export function PlAgeingTable(props) {
  const FIELD_OPTIONS = [
    { value: 'filename', label: 'PL Filename' },
    { value: 'line_items', label: 'Line Items' },
    { value: 'current_status', label: 'Current Status' },
    { value: 'uploaded_date', label: 'Upload Date' },
    { value: 'available_date', label: 'Available Date' },
    { value: 'aging_upload_available', label: 'Ageing (Days) from Upload to Available' },
    { value: 'initial_receipt_date', label: 'Initial Receipt Date' },
    { value: 'aging_available_initial', label: 'Ageing (Days) from Available to Initial Receipt' },
    { value: 'approved_receipt_date', label: 'Approved Receipt Date' },
    {
      value: 'aging_initial_approve',
      label: 'Ageing (Days) from Initial Receipt to Approved Receipt',
    },
    { value: 'po_generated_date', label: 'MMS PO Generated Date' },
    {
      value: 'aging_approve_po_gen',
      label: 'Ageing (Days) from Approved Receipt to MMS PO Creation',
    },
  ];

  const columns = PlAgeingTableColumns();

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          loading={props.loading}
          rows={props.rows}
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
              gridKey: 'pl_ageing',
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
            '& .MuiDataGrid-scrollbar': {
              scrollbarWidth: 'thin',
            },

            '& .MuiDataGrid-scrollbar::-webkit-scrollbar': {
              width: 6,
              height: 6,
            },

            '& .MuiDataGrid-scrollbar::-webkit-scrollbar-thumb': {
              backgroundColor: '#cdd3d9',
              borderRadius: 999,
            },

            '& .MuiDataGrid-scrollbar::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '& .editable-cell': {
              textDecoration: 'underline dashed',
              textUnderlineOffset: '3px',
              cursor: 'pointer',
            },
            '& .wrapped-header .MuiDataGrid-columnHeaderTitle': {
              whiteSpace: 'normal',
              lineHeight: 1.2,
            },
          }}
        />
      </Box>
    </Card>
  );
}
