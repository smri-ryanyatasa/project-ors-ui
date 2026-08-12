import { useState } from 'react';

import {
  Card,
  Stack,
  MenuItem,
  TextField,
  Typography,
  CardContent,
} from '@mui/material';

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
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <SvgColor
              src="/assets/icons/solar/ri--equalizer-line.svg"
              sx={{ width: 20, height: 20, color: '#637381' }}
            />
            <Typography variant="subtitle2" fontWeight={600}>
              Advanced Filter
            </Typography>
          </Stack>

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
        </Stack>
      </CardContent>
    </Card>
  );
}
