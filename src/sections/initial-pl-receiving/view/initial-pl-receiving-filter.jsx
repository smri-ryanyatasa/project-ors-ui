import { useState } from 'react';

import {
  Box,
  Grid,
  Accordion,
  TextField,
  Typography,
  Autocomplete,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

export function InitialPlReceivingFilter({ sx, branches, onGetFiles, files = [], onFilterChange }) {
  const [form, setForm] = useState({
    branches: '',
    filename: '',
    si_number: null,
    vendor_code: '',
  });

  const handleBranchChange = async (branch) => {
    if (!branch) {
      return;
    }

    await onGetFiles(branch);
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Autocomplete
              fullWidth
              options={branches}
              value={
                branches.find((branch) => String(branch.branch_code) === String(form.branches)) ||
                null
              }
              getOptionLabel={(option) => `${option.branch_code} - ${option.branch_name}`}
              isOptionEqualToValue={(option, value) =>
                String(option.branch_code) === String(value.branch_code)
              }
              onChange={(_, value) => {
                const newBranch = value?.branch_code || '';

                if (String(form.branches) !== String(newBranch)) {
                  // Branch actually changed
                  handleBranchChange(newBranch);
                }

                setForm((prev) => ({
                  ...prev,
                  branches: newBranch,
                  filename: '',
                  si_number: null,
                  vendor_code: '',
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Branches" placeholder="Search branch..." />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Vendor"
              name="vendor_code"
              value={form.vendor_code}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Autocomplete
              fullWidth
              options={files}
              value={files.find((file) => file.filename === form.filename) || null}
              getOptionLabel={(option) => String(option.filename)}
              isOptionEqualToValue={(option, value) => option.filename === value.filename}
              onChange={async (_, newValue) => {
                const newFilename = newValue?.filename || '';
                const newSINumber = newValue?.sales_invoice_no || '';
                const newVendorCode =
                  newValue?.vendor_code == null && newValue?.vendor_name == null
                    ? ''
                    : `${newValue?.vendor_code ?? ''} - ${newValue?.vendor_name ?? ''}`;

                const updatedForm = {
                  ...form,
                  filename: newFilename,
                  si_number: newSINumber,
                  vendor_code: newVendorCode,
                };

                setForm(updatedForm);

                await onFilterChange(updatedForm);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Filename" placeholder="Select filename..." />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Autocomplete
              fullWidth
              options={files}
              value={files.find((file) => file.sales_invoice_no === form.si_number) || null}
              getOptionLabel={(option) => String(option.sales_invoice_no)}
              isOptionEqualToValue={(option, value) =>
                option.sales_invoice_no === value.sales_invoice_no
              }
              onChange={async (_, newValue) => {
                const newFilename = newValue?.filename || '';
                const newSINumber = newValue?.sales_invoice_no || '';
                const newVendorCode =
                  newValue?.vendor_code == null && newValue?.vendor_name == null
                    ? ''
                    : `${newValue?.vendor_code ?? ''} - ${newValue?.vendor_name ?? ''}`;

                const updatedForm = {
                  ...form,
                  filename: newFilename,
                  si_number: newSINumber,
                  vendor_code: newVendorCode,
                };

                setForm(updatedForm);

                await onFilterChange(updatedForm);
              }}
              renderInput={(params) => (
                <TextField {...params} label="SI Number" placeholder="Select si number..." />
              )}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
