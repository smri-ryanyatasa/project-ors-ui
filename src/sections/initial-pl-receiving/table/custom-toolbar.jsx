import { useState } from 'react';

import { Box, Button } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { SvgColor } from 'src/components/svg-color';

import { MultipleFilter } from 'src/sections/user/table/multiple-filter';

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
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Button
        variant="contained"
        color="primary"
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
      <GridToolbarContainer
        sx={{
          ml: 'auto',
          '& .MuiButtonBase-root': {
            color: '#637381',
          },

          '& .MuiButtonBase-root svg': {
            color: '#637381',
          },
        }}
      >
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center' }}>
          <GridToolbarColumnsButton />
          {/* <GridToolbarFilterButton /> */}
          <MultipleFilter
            filterModel={props.filterModel}
            onFilterModelChange={props.onFilterModelChange}
            onSaveFilter={props.onSaveFilter}
            getSaveFilter={props.getSaveFilter}
            onDeleteSavedFilter={props.onDeleteSavedFilter}
            onUpdateSavedFilter={props.onUpdateSavedFilter}
            fieldOptions={props.fieldOptions}
            gridKey={props.gridKey}
          />
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
