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
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await props.onSave();
    } finally {
      setLoading(false);
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
            bgcolor: '#0030ff',
            '&:hover': {
              bgcolor: '#032ad8',
            },
            color: 'white !important',
          }}
          startIcon={
            <SvgColor
              src="/assets/icons/solar/line-md--check-all.svg"
              sx={{ width: 20, height: 20 }}
            />
          }
          disabled={props.onRowsCount ? false : true}
          onClick={props.onApprovedReceipt}
        >
          Approved Receipt
        </Button>
        <Button
          variant="outlined"
          startIcon={
            <SvgColor
              src="/assets/icons/solar/lucide-lab--save.svg"
              sx={{ width: 20, height: 20 }}
            />
          }
          loading={loading}
          disabled={props.onRowChanges ? false : true}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          startIcon={
            <SvgColor
              src="/assets/icons/solar/material-symbols--close.svg"
              sx={{ width: 20, height: 20 }}
            />
          }
          disabled={props.onRowChanges ? false : true}
          onClick={props.onDiscard}
        >
          Discard
        </Button>
        <Button
          variant="outlined"
          startIcon={
            <SvgColor
              src="/assets/icons/solar/material-symbols--undo-rounded.svg"
              sx={{ width: 20, height: 20 }}
            />
          }
          disabled={props.onRowChanges ? false : true}
          onClick={props.onUndo}
        >
          Undo
        </Button>
        <Button
          variant="outlined"
          startIcon={
            <SvgColor
              src="/assets/icons/solar/material-symbols--redo-rounded.svg"
              sx={{ width: 20, height: 20 }}
            />
          }
          disabled={props.onRowChanges ? false : true}
          onClick={props.onRedo}
        >
          Redo
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
