import { useState } from 'react';

import {
  Box,
  Grid,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

import { DateRangeFilter } from './date';

export function PlAgeingFilter({ sx }) {
  const [filters, setFilters] = useState({
    uploadedDate: {
      type: 'all',
      startDate: '',
      endDate: '',
    },

    approvedDate: {
      type: 'all',
      startDate: '',
      endDate: '',
    },

    rejectedDate: {
      type: 'all',
      startDate: '',
      endDate: '',
    },

    completedDate: {
      type: 'all',
      startDate: '',
      endDate: '',
    },
  });

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
          <Grid size={{ xs: 12, md: 6 }}>
            <DateRangeFilter
              label="Upload Date"
              textFieldLabel="Start & End Date"
              value={filters.uploadedDate}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  uploadedDate: value,
                }))
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DateRangeFilter
              label="Initial Receipt"
              textFieldLabel="Start & End Date"
              value={filters.approvedDate}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  approvedDate: value,
                }))
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DateRangeFilter
              label="Approved Receipt"
              textFieldLabel="Start & End Date"
              value={filters.rejectedDate}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  rejectedDate: value,
                }))
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <DateRangeFilter
              label="PO Generated"
              textFieldLabel="Start & End Date"
              value={filters.completedDate}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  completedDate: value,
                }))
              }
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
