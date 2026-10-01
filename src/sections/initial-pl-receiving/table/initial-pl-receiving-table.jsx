import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { InitialPlReceivingTableColumns } from './initial-pl-receiving-column';

export function InitialPlReceivingTable(props) {
  const FIELD_OPTIONS = [
    { value: 'material_code', label: 'Material Code' },
    { value: 'material_name', label: 'Material Description' },
    { value: 'mms_sku_code', label: 'MMS SKU Code' },
    { value: 'mms_sku_name', label: 'MMS SKU Name' },
    { value: 'size', label: 'Size' },
    { value: 'uom', label: 'UOM' },
    { value: 'received_by', label: 'Received By' },
    { value: 'actual_received', label: 'Actual Received' },
    { value: 'received_date', label: 'Date & Time Received' },
    { value: 'status', label: 'Status' },
  ];

  const columns = InitialPlReceivingTableColumns();

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          loading={props.loading}
          rows={props.rows}
          columns={columns}
          disableRowSelectionOnClick
          processRowUpdate={props.onRowUpdate}
          onProcessRowUpdateError={(error) => {
            console.error('Row update failed:', error);
          }}
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
              onConfirmReceipt: props.onConfirmReceipt,
              onPending: props.onPending,
              onRowsCount: props.rows.length,
              filterModel: props.customFilterModel,
              onFilterModelChange: props.onCustomFilterModelChange,
              onSaveFilter: props.onSaveFilter,
              getSaveFilter: props.getSaveFilter,
              onDeleteSavedFilter: props.onDeleteSavedFilter,
              onUpdateSavedFilter: props.onUpdateSavedFilter,
              fieldOptions: FIELD_OPTIONS,
              gridKey: 'initial_pl_receiving',
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
            '& .MuiDataGrid-cell': {
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              lineHeight: '1.5',
              py: 1,
            },

            '& .MuiDataGrid-columnHeaderTitle': {
              whiteSpace: 'nowrap',
            },
          }}
        />
      </Box>
    </Card>
  );
}
