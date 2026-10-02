import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

export function WorkspaceDropdown() {
  const environments = [
    { id: 'SCP', name: 'SCP' },
    { id: 'LSP', name: 'LSP' },
  ];
  const [workspace, setWorkspace] = useState(environments[0]);
  const [openPopover, setOpenPopover] = useState(null);
  const handleOpen = (event) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClose = () => {
    setOpenPopover(null);
  };
  const handleChangeWorkspace = useCallback((newValue) => {
    setWorkspace(newValue);
    handleClose();
  }, []);
  const buttonBg = {
    height: 1,
    zIndex: -1,
    opacity: 0,
    content: "''",
    borderRadius: 1,
    position: 'absolute',
    visibility: 'hidden',
    bgcolor: 'action.hover',
    width: 'calc(100% + 8px)',
    transition: (theme) =>
      theme.transitions.create(['opacity', 'visibility'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
    ...(openPopover && { opacity: 1, visibility: 'visible' }),
  };
  return (
    <>
      <ButtonBase
        disableRipple
        onClick={handleOpen}
        sx={{ py: 0.5, px: 0, gap: 1, position: 'relative', '&::before': buttonBg }}
      >
        <Box component="span" sx={{ typography: 'subtitle2' }}>
          {workspace.name}
        </Box>
        <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: 'text.disabled' }} />{' '}
      </ButtonBase>
      <CustomPopover
        open={Boolean(openPopover)}
        anchorEl={openPopover}
        onClose={handleClose}
        slotProps={{
          arrow: { placement: 'top-left' },
          paper: { sx: { mt: 0.5 } },
        }}
      >
        <MenuList>
          {environments.map((option) => (
            <MenuItem
              key={option.id}
              selected={option.id === workspace.id}
              onClick={() => handleChangeWorkspace(option)}
              sx={{ height: 48 }}
            >
              <Typography
                noWrap
                component="span"
                variant="body2"
                sx={{ flexGrow: 1, fontWeight: 'fontWeightMedium' }}
              >
                {option.name}
              </Typography>
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </>
  );
}
