import { useState } from 'react';

import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function UserCreateMenu({ onAddSingleUser, onBulkUpload }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        endIcon={
          <SvgColor
            src="/assets/icons/solar/solar--alt-arrow-down-line-duotone.svg"
            sx={{ width: 20, height: 20 }}
          />
        }
        onClick={handleOpen}
      >
        Create User
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <SvgColor
              src="/assets/icons/solar/solar--user-plus-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </ListItemIcon>

          <ListItemText primary="Add Single User" />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <SvgColor
              src="/assets/icons/solar/solar--upload-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </ListItemIcon>

          <ListItemText primary="Bulk Upload" />
        </MenuItem>
      </Menu>
    </>
  );
}
