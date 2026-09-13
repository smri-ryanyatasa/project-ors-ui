import { useState, useEffect, useCallback } from 'react';

import { Card, Stack, TextField, Typography, CardContent, Autocomplete } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function PlUploadFilter({ sx, branches, onBranchChange }) {
  const [form, setForm] = useState({
    branches: '',
  });

  const handleBranchChange = useCallback(
    (branchCode) => {
      const selectedBranch = branches.find(
        (branch) => String(branch.branch_code) === String(branchCode)
      );

      setForm((prev) => ({
        ...prev,
        branches: selectedBranch || null,
      }));

      onBranchChange(branchCode);
    },
    [branches, onBranchChange]
  );

  useEffect(() => {
    if (branches.length === 1 && !form.branches?.branch_code) {
      handleBranchChange(branches[0].branch_code);
    }
  }, [branches, form.branches?.branch_code, handleBranchChange]);

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

          <Autocomplete
            fullWidth
            options={branches}
            value={
              branches.find(
                (branch) => String(branch.branch_code) === String(form.branches?.branch_code || '')
              ) || null
            }
            getOptionLabel={(option) => `${option.branch_code} - ${option.branch_name.trim()}`}
            isOptionEqualToValue={(option, value) =>
              String(option.branch_code) === String(value.branch_code)
            }
            onChange={(_, value) => {
              handleBranchChange(value?.branch_code || '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Branches" placeholder="Search branch..." />
            )}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
