import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { InitialPlReceivingTableColumns } from './initial-pl-receiving-column';

export function InitialPlReceivingTable(props) {
  const columns = InitialPlReceivingTableColumns();

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
