import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { POLogsTableColumns } from './po-logs-column';

export function POLogsTable(props) {
  const columns = POLogsTableColumns();

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          loading={props.loading}
          rows={props.rows}
          columns={columns}
          disableRowSelectionOnClick
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
