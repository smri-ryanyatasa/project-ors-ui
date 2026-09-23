import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';

export function SearchToolbar(props) {
  return (
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
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}
