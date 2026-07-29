import { useState } from 'react';

import {
  Box,
  MenuItem,
  Accordion,
  TextField,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

export function PlUploadFilter({ sx, branches, onBranchChange }) {
  const [form, setForm] = useState({
    branches: '',
  });

  const handleBranchChange = (event) => {
    const branchCode = event.target.value;

    const selectedBranch = branches.find((branch) => branch.branch_code === branchCode);

    setForm((prev) => ({
      ...prev,
      branches: selectedBranch,
    }));

    onBranchChange(branchCode);
  };

  return (
    <Accordion
      defaultExpanded
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
        <TextField
          select
          fullWidth
          label="Branches"
          value={form.branches?.branch_code || ''}
          onChange={handleBranchChange}
        >
          <MenuItem value="">
            <em>Select Branch</em>
          </MenuItem>
          {branches.map((branch) => (
            <MenuItem key={branch.branch_code} value={branch.branch_code}>
              {branch.branch_code} - {branch.branch_name}
            </MenuItem>
          ))}
        </TextField>
      </AccordionDetails>
    </Accordion>
  );
}
