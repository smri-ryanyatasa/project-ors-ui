import { Box, Stack } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export const InitialPlReceivingTableColumns = () => [
  {
    field: 'material_code',
    headerName: 'Material Code',
    flex: 1,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'material_name',
    headerName: 'Material Description',
    flex: 1,
  },
  {
    field: 'mms_sku_code',
    headerName: 'MMS SKU Code',
    flex: 1,
  },
  {
    field: 'size',
    headerName: 'Size/Dim',
    flex: 1,
  },
  {
    field: 'uom',
    headerName: 'UOM',
    flex: 1,
  },
  {
    field: 'received_by',
    headerName: 'Received By',
    flex: 1,
    type: 'number',
  },
  {
    field: 'actual_received',
    headerName: 'Actual Received',
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    type: 'number',
    editable: true,
    renderCell: (params) => {
      const value = params.value;

      let backgroundColor = null;
      let color = null;

      if (value === 0) {
        backgroundColor = '#eb834f';
        color = '#ffffff';
      } else if (value === null || value === undefined || value === '') {
        backgroundColor = '#ffc000';
      }

      return (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            sx={{
              minWidth: 50,
              height: 40,
              px: 1,
              backgroundColor,
              color,
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
            }}
          >
            {value || value === 0 ? (
              value
            ) : (
              <SvgColor
                src="/assets/icons/solar/solar--pen-bold.svg"
                sx={{ width: 16, height: 16, color: '#ffffff' }}
              />
            )}
          </Box>
        </Stack>
      );
    },
  },
  {
    field: 'received_date',
    headerName: 'Date & Time Uploaded',
    flex: 1,
    type: 'number',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
  },
];
