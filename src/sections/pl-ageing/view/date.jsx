import dayjs from 'dayjs';
import { useRef, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Stack, Button, Popover, MenuItem, TextField, Typography } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function DateRangeFilter({
  label = 'Date',
  textFieldLabel = 'Start & End Date',
  value,
  onChange,
}) {
  const anchorRef = useRef(null);
  const startDateRef = useRef(null);

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
      'JAN',
      'FEV',
      'MAR',
      'APR',
      'MAY',
      'JUNE',
      'JULY',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
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

              setTimeout(() => {
                startDateRef.current?.showPicker?.();
              }, 100);
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
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction="row">
                <Box>
                  <Typography sx={{ px: 1, pt: 1 }}>Start Date</Typography>

                  <DateCalendar
                    value={tempStart ? dayjs(tempStart) : null}
                    onChange={(date) => {
                      setTempStart(date?.format('YYYY-MM-DD') || '');
                    }}
                  />
                </Box>

                <Box>
                  <Typography sx={{ px: 1, pt: 1 }}>End Date</Typography>

                  <DateCalendar
                    value={tempEnd ? dayjs(tempEnd) : null}
                    onChange={(date) => {
                      setTempEnd(date?.format('YYYY-MM-DD') || '');
                    }}
                  />
                </Box>
              </Stack>
            </LocalizationProvider>

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
