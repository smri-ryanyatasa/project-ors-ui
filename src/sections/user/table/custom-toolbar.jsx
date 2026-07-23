import { Box } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { DownloadButton } from './download-button';

export function CustomToolbar(props) {
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
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <DownloadButton
          onDownloadCsv={props.onDownloadCsv}
          onDownloadExcel={props.onDownloadExcel}
        />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    </Box>
  );
}
