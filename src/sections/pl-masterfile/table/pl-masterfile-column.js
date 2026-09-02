import { Chip, Stack } from '@mui/material';

export const PlMasterfileTableColumns = () => [
  {
    field: 'filename',
    headerName: 'PL File Name',
    flex: 2,
    cellClassName: 'first-column-cell',
    headerClassName: 'first-column-header',
  },
  {
    field: 'status',
    headerName: 'Status',
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => {
      const colorStatus = (status) => {
        switch (status) {
          case 'Uploaded':
            return 'error';

          case 'Initial Receipt':
            return 'warning';

          case 'Approved Receipt':
            return 'info';

          case 'MMS PO Generated':
            return 'success';

          case 'Pending':
            return 'error';

          case 'Received':
            return 'primary';

          default:
            return 'success';
        }
      };

      return (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ height: '100%' }}
        >
          <Chip label={params.value} color={colorStatus(params.value.trim())} size="small" />
        </Stack>
      );
    },
  },
  {
    field: 'si_number',
    headerName: 'SI',
    flex: 1,
  },
  {
    field: 'branch_code',
    headerName: 'Branch Code',
    flex: 1,
  },
  {
    field: 'material',
    headerName: 'Material',
    flex: 1,
  },
  {
    field: 'vendor_code',
    headerName: 'Vendor',
    flex: 1,
  },
  {
    field: 'uploaded_by',
    headerName: 'Uploaded By',
    flex: 1,
  },
  {
    field: 'uploaded_date',
    headerName: 'Uploaded Date & Time',
    flex: 1,
  },
];
