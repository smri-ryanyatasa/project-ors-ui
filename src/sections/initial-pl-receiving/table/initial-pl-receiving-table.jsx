import { Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { CustomToolbar } from './custom-toolbar';
import { InitialPlReceivingTableColumns } from './initial-pl-receiving-column';

export function InitialPlReceivingTable(props) {
  const columns = InitialPlReceivingTableColumns();
  const rows = [
    {
      id: 1,
      uploaded_at: '2026-08-12 08:15:32',
      filename: 'PL_20260812_001.xlsx',
      branch: '001',
      vendor_code: 'V000123',
      vendor_name: 'ABC Trading Corp.',
      total_items: 1250,
      processed_items: 1200,
      failed_items: 50,
      status: 'Completed',
    },
    {
      id: 2,
      uploaded_at: '2026-08-12 09:02:18',
      filename: 'PL_20260812_002.xlsx',
      branch: '002',
      vendor_code: 'V000456',
      vendor_name: 'XYZ Supplies Inc.',
      total_items: 850,
      processed_items: 850,
      failed_items: 0,
      status: 'Completed',
    },
    {
      id: 3,
      uploaded_at: '2026-08-12 09:45:07',
      filename: 'PL_20260812_003.xlsx',
      branch: '003',
      vendor_code: 'V000789',
      vendor_name: 'Metro Distribution',
      total_items: 2300,
      processed_items: 1800,
      failed_items: 500,
      status: 'Failed',
    },
    {
      id: 4,
      uploaded_at: '2026-08-12 10:12:44',
      filename: 'PL_20260812_004.xlsx',
      branch: '004',
      vendor_code: 'V000321',
      vendor_name: 'Global Merchandising',
      total_items: 640,
      processed_items: 0,
      failed_items: 0,
      status: 'Processing',
    },
    {
      id: 5,
      uploaded_at: '2026-08-12 10:38:21',
      filename: 'PL_20260812_005.xlsx',
      branch: '005',
      vendor_code: 'V000654',
      vendor_name: 'Prime Retail Solutions',
      total_items: 1500,
      processed_items: 1500,
      failed_items: 0,
      status: 'Completed',
    },
    {
      id: 6,
      uploaded_at: '2026-08-12 11:05:13',
      filename: 'PL_20260812_006.xlsx',
      branch: '006',
      vendor_code: 'V000987',
      vendor_name: 'Pacific Wholesale',
      total_items: 920,
      processed_items: 700,
      failed_items: 220,
      status: 'Failed',
    },
    {
      id: 7,
      uploaded_at: '2026-08-12 11:32:56',
      filename: 'PL_20260812_007.xlsx',
      branch: '007',
      vendor_code: 'V000111',
      vendor_name: 'Sunrise Trading',
      total_items: 3100,
      processed_items: 2100,
      failed_items: 1000,
      status: 'Processing',
    },
    {
      id: 8,
      uploaded_at: '2026-08-12 12:01:39',
      filename: 'PL_20260812_008.xlsx',
      branch: '008',
      vendor_code: 'V000222',
      vendor_name: 'North Star Supplies',
      total_items: 450,
      processed_items: 450,
      failed_items: 0,
      status: 'Completed',
    },
  ];

  return (
    <Card>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          loading={props.loading}
          rows={rows}
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
