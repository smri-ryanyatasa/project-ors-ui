import { Box, Stack } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export const InitialPlReceivingTableColumns = () => [
  {
    field: 'material_code',
    headerName: 'Material Code',
    cellClassName: 'first-column-cell',
    width: 120,
    headerClassName: 'first-column-header wrapped-header',
  },
  {
    field: 'material_name',
    headerName: 'Material Description',
    width: 150,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'mms_sku_code',
    headerName: 'MMS SKU Code',
    width: 120,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'mms_sku_name',
    headerName: 'MMS SKU Name',
    width: 130,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'size',
    headerName: 'Size/ Dim',
    width: 70,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'uom',
    headerName: 'UOM',
    width: 70,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'received_by',
    headerName: 'Received By',
    width: 150,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'actual_received',
    headerName: 'Actual Received',
    align: 'center',
    headerAlign: 'center',
    width: 90,
    headerClassName: 'wrapped-header',
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
    width: 140,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
  },
];
