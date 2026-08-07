import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { BranchTableColumns } from './branch-table-columns';

export function BranchTable(props) {
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
