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
import { useState } from 'react';

export function CustomToolbar(props) {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await props.onSave();
    } catch (error) {
      throw error;
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
        {props.onRowChanges && (
          <Button
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: '#0030ff',
              '&:hover': {
                bgcolor: '#032ad8',
              },
              color: 'white !important',
            }}
            startIcon={
              <SvgColor
                src="/assets/icons/solar/lucide-lab--save.svg"
                sx={{ width: 20, height: 20 }}
              />
            }
            onClick={handleSave}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        )}

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
