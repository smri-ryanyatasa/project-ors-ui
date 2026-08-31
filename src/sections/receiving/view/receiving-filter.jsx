import { useState } from 'react';

import {
  Box,
  Grid,
  MenuItem,
  Accordion,
  TextField,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

import { DateRangeFilter } from './date';

export function ReceivingFilter({ sx, branches, onFilter }) {
  const [filters, setFilters] = useState({
    branches: '',
    initialReceiptDate: {
      type: 'all',
      startDate: '',
      endDate: '',
    },

    finalReceiptDate: {
      type: 'all',
      startDate: '',
      endDate: '',
    },
  });

  const handleFilterChange = async (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(newFilters);
    await onFilter(newFilters);
  };

  return (
    <Accordion
      sx={[
        (theme) => ({
          mb: 2,
          width: 1,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0px 8px 24px rgba(171, 179, 188, 0.12)',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AccordionSummary expandIcon={<Iconify icon="eva:chevron-down-fill" />}>
        <Box display="flex" alignItems="center" gap={1}>
          <SvgColor
            src="/assets/icons/solar/ri--equalizer-line.svg"
            sx={{ width: 20, height: 20, color: '#637381' }}
          />

          <Typography fontWeight={600}>Advance Filter</Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              Branches
            </Typography>
            <Autocomplete
              fullWidth
              options={branches}
              value={
                branches.find(
                  (branch) => String(branch.branch_code) === String(filters.branches)
                ) || null
              }
              getOptionLabel={(option) => `${option.branch_code} - ${option.branch_name}`}
              isOptionEqualToValue={(option, value) =>
                String(option.branch_code) === String(value.branch_code)
              }
              onChange={(_, value) => {
                const newBranch = value?.branch_code || '';

                handleFilterChange('branches', newBranch);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Branch" placeholder="Search branch..." />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <DateRangeFilter
              label="Initial Receipt"
              textFieldLabel="Start & End Date"
              value={filters.initialReceiptDate}
              onChange={(value) => handleFilterChange('initialReceiptDate', value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DateRangeFilter
              label="Final Receipt"
              textFieldLabel="Start & End Date"
              value={filters.finalReceiptDate}
              onChange={(value) => handleFilterChange('finalReceiptDate', value)}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
