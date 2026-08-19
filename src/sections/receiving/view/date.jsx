import { useRef, useState } from 'react';

import { Box, Stack, Button, Popover, MenuItem, TextField, Typography } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function DateRangeFilter({
  label = 'Date',
  textFieldLabel = 'Start & End Date',
  value,
  onChange,
}) {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [tempStart, setTempStart] = useState(value.startDate || '');

  const [tempEnd, setTempEnd] = useState(value.endDate || '');

  const handleSelect = (event) => {
    const selected = event.target.value;

    if (selected === 'all') {
      onChange({
        type: 'all',
        startDate: '',
        endDate: '',
      });

      setOpen(false);
      return;
    }

    // Custom
    setTempStart(value.startDate || '');
    setTempEnd(value.endDate || '');
    setOpen(true);
  };

  const handleApply = () => {
    if (!tempStart || !tempEnd) return;

    onChange({
      type: 'custom',
      startDate: tempStart,
      endDate: tempEnd,
    });

    setOpen(false);
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return `${day} ${months[Number(month) - 1]} ${year}`;
  };

  return (
    <>
      <Box ref={anchorRef}>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {label}
        </Typography>

        <TextField
          select
          fullWidth
          label={textFieldLabel}
          value={value.type}
          onChange={handleSelect}
          slotProps={{
            select: {
              IconComponent: () => (
                <SvgColor
                  src="/assets/icons/solar/solar--calendar-mark-bold-duotone.svg"
                  sx={{ right: 8, color: 'text.secondary', mr: '10px' }}
                />
              ),
              renderValue: () => {
                if (value.type === 'custom' && value.startDate && value.endDate) {
                  return `${formatDate(value.startDate)} to ${formatDate(value.endDate)}`;
                }

                return 'All';
              },
            },
          }}
        >
          <MenuItem value="all">All</MenuItem>

          <MenuItem
            value="custom"
            onClick={() => {
              setTempStart(value.startDate || '');
              setTempEnd(value.endDate || '');
              setOpen(true);
            }}
          >
            Custom
          </MenuItem>
        </TextField>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: 320 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={tempStart}
              onChange={(e) => setTempStart(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={tempEnd}
              onChange={(e) => setTempEnd(e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>

              <Button variant="contained" disabled={!tempStart || !tempEnd} onClick={handleApply}>
                Apply
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Popover>
    </>
  );
}
