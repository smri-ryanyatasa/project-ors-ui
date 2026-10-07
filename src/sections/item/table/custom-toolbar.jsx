import { Box } from '@mui/material';
import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { MultipleFilter } from 'src/sections/user/table/multiple-filter';

import { DownloadButton } from './download-button';

export function CustomToolbar(props) {
  //   const [loading, setLoading] = useState(false);

  //   const handleSave = async () => {
  //     try {
  //       setLoading(true);
  //       await props.onSave();
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {/* <Button
        variant="contained"
        loading={loading}
        color="primary"
        startIcon={
          <SvgColor src="/assets/icons/solar/lucide-lab--save.svg" sx={{ width: 20, height: 20 }} />
        }
        disabled={props.onRowChanges ? false : true}
        onClick={handleSave}
      >
        Save
      </Button> */}
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
