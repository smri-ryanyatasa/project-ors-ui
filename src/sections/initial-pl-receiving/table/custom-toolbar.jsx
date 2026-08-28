import { useState } from 'react';

import { Box, Button } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { SvgColor } from 'src/components/svg-color';

import { DownloadButton } from './download-button';

export function CustomToolbar(props) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleConfirmReceipt = async () => {
    try {
      setConfirmLoading(true);
      await props.onConfirmReceipt();
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <GridToolbarContainer
        sx={{
          '& .MuiButtonBase-root': {
            color: '#637381',
          },

          '& .MuiButtonBase-root svg': {
            color: '#637381',
          },
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: props.onRowsCount ? '#0030ff !important' : '#1C1C1C',
            '&:hover': {
              bgcolor: '#032ad8 !important',
            },
            color: 'white !important',
          }}
          loading={confirmLoading}
          disabled={props.onRowsCount ? false : true}
          startIcon={
            <SvgColor
              src="/assets/icons/solar/solar--check-circle-broken.svg"
              sx={{ width: 20, height: 20 }}
            />
          }
          onClick={handleConfirmReceipt}
        >
          Confirm Receipt
        </Button>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <DownloadButton
            onDownloadCsv={props.onDownloadCsv}
            onDownloadExcel={props.onDownloadExcel}
          />
          <GridToolbarQuickFilter />
        </Box>
      </GridToolbarContainer>
    </Box>
  );
}
