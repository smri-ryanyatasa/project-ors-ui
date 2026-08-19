import { useState } from 'react';

import { Menu, Button, MenuItem, Typography, ListItemIcon, ListItemText } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function DownloadButton({ onDownloadCsv, onDownloadExcel }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadCSV = (event) => {
    handleClose();
    // Your CSV download function
    onDownloadCsv();
  };

  const handleDownloadExcel = () => {
    handleClose();
    // Your Excel download function
    onDownloadExcel();
  };

  return (
    <>
      <Button
        size="small"
        onClick={handleClick}
        startIcon={
          <SvgColor
            src="/assets/icons/solar/solar--download-bold.svg"
            sx={{ width: 20, height: 20 }}
          />
        }
        sx={{
          color: 'text.secondary',
          textTransform: 'none',
          marginBottom: '4px',
        }}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: 700, lineHeight: '9px' }}>
          Download
        </Typography>
      </Button>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleDownloadCSV();
          }}
        >
          <ListItemIcon>
            <SvgColor
              src="/assets/icons/solar/solar--user-plus-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </ListItemIcon>

          <ListItemText primary="Download CSV" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleDownloadExcel();
          }}
        >
          <ListItemIcon>
            <SvgColor
              src="/assets/icons/solar/solar--upload-bold.svg"
              sx={{ width: 20, height: 20 }}
            />
          </ListItemIcon>

          <ListItemText primary="Download Excel" />
        </MenuItem>
      </Menu>
    </>
  );
}
