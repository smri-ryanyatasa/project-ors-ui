import { Box, Stack } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export const FinalPlReceivingTableColumns = () => [
  {
    field: 'material_code',
    headerName: 'Material Code',
    width: 120,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header wrapped-header',
  },
  {
    field: 'material_name',
    headerName: 'Material Description',
    width: 230,
  },
  {
    field: 'mms_sku_code',
    headerName: 'MMS SKU Code',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'mms_sku_name',
    headerName: 'MMS SKU Name',
    width: 130,
  },
  {
    field: 'size',
    headerName: 'Size/ Dim',
    width: 60,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'uom',
    headerName: 'UOM',
    width: 60,
  },
  {
    field: 'pl_qty',
    headerName: 'PL Qty',
    width: 50,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'initial_qty',
    headerName: 'Initial Received Qty',
    width: 90,
    type: 'number',
    editable: true,
    headerClassName: 'wrapped-header',
    renderCell: (params) => {
      const value = params.value;

      let backgroundColor = null;
      let color = null;

      if (value === 0) {
        backgroundColor = '#eb834f';
        color = '#ffffff';
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
    field: 'pl_initial_discrepancy',
    headerName: 'PL-Initial Dicrepancy',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'final_qty',
    headerName: 'Final Received Qty',
    width: 90,
    type: 'number',
    editable: true,
    headerClassName: 'wrapped-header',
    renderCell: (params) => {
      const value = params.value;

      let backgroundColor = null;
      let color = '#ffffff';

      value === 0 ? (backgroundColor = '#eb834f') : (backgroundColor = '#ffc000');

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
    field: 'initial_final_discrepancy',
    headerName: 'Initial-Final Dicrepancy',
    width: 100,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'initial_received_by',
    headerName: 'Initial Received By',
    width: 130,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'initial_received_date',
    headerName: 'Date/Time Initially Received',
    width: 180,
  },
  {
    field: 'final_received_by',
    headerName: 'Final Received Qty Updated By',
    width: 160,
    headerClassName: 'wrapped-header',
  },
  {
    field: 'final_received_date',
    headerName: 'Date/Time Final Received Qty',
    width: 160,
  },
];
