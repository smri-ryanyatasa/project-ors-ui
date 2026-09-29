import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { ReceivingDecrepancyTableColumns } from './receiving-decrepancy-column';

export function ReceivingDecrepancyTable(props) {
  const FIELD_OPTIONS = [
    { value: 'filename', label: 'PL Filename' },
    { value: 'si_number', label: 'SI Number' },
    { value: 'branch_code', label: 'Branch Code' },
    { value: 'branch_name', label: 'Branch Name' },
    { value: 'material_code', label: 'Material Code' },
    { value: 'material_name', label: 'Material Name' },
    { value: 'mms_sku_code', label: 'MMS SKU Code' },
    { value: 'mms_sku_name', label: 'MMS SKU Name' },
    { value: 'vendor_code', label: 'Vendor Code' },
    { value: 'vendor_name', label: 'Vendor Name' },
    { value: 'size', label: 'Size/ Dime' },
    { value: 'uom', label: 'UOM' },
    { value: 'pl_qty', label: 'PL Qty' },
    { value: 'initial_qty', label: 'Initial Received Qty' },
    { value: 'pl_initial_discrepancy', label: 'PL-Initial Discrepancy' },
    { value: 'final_qty', label: 'Final Received Qty' },
    { value: 'initial_final_discrepancy', label: 'Initial-Final Discrepancy' },
    { value: 'initial_received_by', label: 'Initially Received By' },
    { value: 'initial_received_date', label: 'Date/Time Initially Received' },
    { value: 'confirmed_receipt_by', label: 'Initia Receipt Confirmed By' },
    { value: 'confirmed_receipt_date', label: 'Date/Time Initial Receipt Confirmed' },
    { value: 'final_received_by', label: 'Finale Received Qty Updated By' },
    { value: 'final_received_date', label: 'Date/Time of Uploaded Final Received Qty' },
    { value: 'approved_receipt_by', label: 'Final Receipt Approved By' },
    { value: 'approved_receipt_date', label: 'Date/Time of Final Receipt Approved' },
  ];

  const columns = ReceivingDecrepancyTableColumns();

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
              gridKey: 'receiving_discrepancy',
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
              lineHeight: '1.4',
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
