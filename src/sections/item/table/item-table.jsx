import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { ItemTableColumns } from './item-table-columns';

export function ItemTable(props) {
  const FIELD_OPTIONS = [
    { value: 'style_code', label: 'Style Code' },
    { value: 'style_name', label: 'Style Name' },
    { value: 'sku_code', label: 'SKU Code' },
    { value: 'sku_name', label: 'SKU Name' },
    { value: 'upc', label: 'UPC' },
    { value: 'primary_vendor_code', label: 'Primary Vendor Code' },
    { value: 'primary_vendor_name', label: 'Primary Vendor Name' },
    { value: 'alt_vendor_name', label: 'Alt Vendor Name' },
    { value: 'dept_code', label: 'Dept Code' },
    { value: 'dept_name', label: 'Dept Name' },
    { value: 'subdept_code', label: 'Sub-dept Code' },
    { value: 'subdept_name', label: 'Sub-dept Name' },
    { value: 'class_code', label: 'Class Code' },
    { value: 'class_name', label: 'Class Name' },
    { value: 'subclass_code', label: 'Sub-class Code' },
    { value: 'subclass_name', label: 'Sub-class Name' },
    { value: 'buying_uom', label: 'Buying UOM' },
    { value: 'color', label: 'Color' },
    { value: 'size_dimension', label: 'Size Dimension' },
    { value: 'curr_regular_retail', label: 'Current Regular Retail' },
    { value: 'status', label: 'Status' },
  ];

  const columns = ItemTableColumns({
    onOpenValues: props.onOpenValues,
    onOpenUPCValues: props.onOpenUPCValues,
  });

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          loading={props.loading}
          rows={props.items}
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
              onRowChanges: props.hasRowChanges,
              onSave: props.onSave,
              filterModel: props.customFilterModel,
              onFilterModelChange: props.onCustomFilterModelChange,
              onSaveFilter: props.onSaveFilter,
              getSaveFilter: props.getSaveFilter,
              onDeleteSavedFilter: props.onDeleteSavedFilter,
              onUpdateSavedFilter: props.onUpdateSavedFilter,
              fieldOptions: FIELD_OPTIONS,
              gridKey: 'item',
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
          }}
        />
      </Box>
    </Card>
  );
}
