import { useState } from 'react';

import { Box, Card, Grid, Stack, Switch, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function SummaryCard() {
  const [locationType, setLocationType] = useState('store');

  const handleChange = (type) => {
    setLocationType(type);
  };

  return (
    <Grid container spacing={2}>
      {/* Store */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card
          sx={{
            minHeight: 180,
            p: 3,
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: locationType === 'store' ? 'primary.main' : 'divider',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: 1 }}
          >
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Switch checked={locationType === 'store'} onChange={() => handleChange('store')} />

                <Typography variant="h6">Store</Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Manage and view inventory available in your stores.
              </Typography>
            </Stack>

            <Box
              sx={{
                width: 72,
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                bgcolor: 'primary.lighter',
                flexShrink: 0,
              }}
            >
              <Iconify icon="solar:shop-2-bold-duotone" width={40} sx={{ color: 'primary.main' }} />
            </Box>
          </Stack>
        </Card>
      </Grid>

      {/* Warehouse */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Card
          sx={{
            minHeight: 180,
            p: 3,
            display: 'flex',
            alignItems: 'center',
            border: '1px solid',
            borderColor: locationType === 'warehouse' ? 'primary.main' : 'divider',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ width: 1 }}
          >
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Switch
                  checked={locationType === 'warehouse'}
                  onChange={() => handleChange('warehouse')}
                />

                <Typography variant="h6">Warehouse</Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Manage and view inventory stored in your warehouses.
              </Typography>
            </Stack>

            <Box
              sx={{
                width: 72,
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                bgcolor: 'warning.lighter',
                flexShrink: 0,
              }}
            >
              <Iconify
                icon="solar:buildings-2-bold-duotone"
                width={40}
                sx={{ color: 'warning.main' }}
              />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
