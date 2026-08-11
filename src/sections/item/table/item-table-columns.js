import { Box, Chip, Stack } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export const ItemTableColumns = () => [
  {
    field: 'style_code',
    headerName: 'Style Code',
    minWidth: 100,
    flex: 1,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'style_name',
    headerName: 'Style Name',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'sku_code',
    headerName: 'SKU Code',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'sku_name',
    headerName: 'SKU Name',
    minWidth: 300,
    flex: 1,
  },
  {
    field: 'upc',
    headerName: 'UPC',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'primary_vendor_code',
    headerName: 'Primary Vendor Code',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'primary_vendor_name',
    headerName: 'Primary Vendor Name',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'alt_vendor_code',
    headerName: 'Alt Vendor Code',
    align: 'center',
    headerAlign: 'center',
    minWidth: 150,
    flex: 1,
    editable: true,
    renderCell: (params) =>
      params.value ? (
        params.value
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box size="small" sx={{ color: '#d3d7db' }}>
            <SvgColor
              src="/assets/icons/solar/solar--pen-bold.svg"
              sx={{ width: 16, height: 16 }}
            />
          </Box>
        </Box>
      ),
  },
  {
    field: 'alt_vendor_name',
    headerName: 'Alt Vendor Name',
    minWidth: 150,
    flex: 1,
    editable: true,
    renderCell: (params) =>
      params.value ? (
        params.value
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box size="small" sx={{ color: '#d3d7db' }}>
            <SvgColor
              src="/assets/icons/solar/solar--pen-bold.svg"
              sx={{ width: 16, height: 16 }}
            />
          </Box>
        </Box>
      ),
  },
  {
    field: 'dept_code',
    headerName: 'Dept Code',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'dept_name',
    headerName: 'Dept Name',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'subdept_code',
    headerName: 'Subdept Code',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'subdept_name',
    headerName: 'Subdept Name',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'class_code',
    headerName: 'Class Code',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'class_name',
    headerName: 'Class Name',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'subclass_code',
    headerName: 'Subclass Code',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'subclass_name',
    headerName: 'Subclass Name',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'buying_uom',
    headerName: 'Buying UOM',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'color',
    headerName: 'Color',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'size_dimension',
    headerName: 'Size Dimension',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'curr_regular_retail',
    headerName: 'Current Regular Retail',
    minWidth: 100,
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 100,
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={1} sx={{ height: '100%' }}>
        <Chip
          label={params.value.trim() == 'A' ? 'Active' : 'Inactive'}
          color={params.value.trim() == 'A' ? 'success' : 'error'}
          size="small"
        />
      </Stack>
    ),
  },
];
