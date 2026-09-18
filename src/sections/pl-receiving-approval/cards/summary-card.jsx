import { useState, useEffect } from 'react';

import { Box, Card, Grid, Stack, Switch, Typography } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';

export function SummaryCard(props) {
  const [storeType, setStoreType] = useState(false);
  const [warehouseType, setWarehouseType] = useState(false);

  const onUpdate = async (isEnable, type) => {
    await props.onUpdate(isEnable, type);
    type == 'Store' ? setStoreType(isEnable) : setWarehouseType(isEnable);
  };

  useEffect(() => {
    const store = props.stores.find((s) => s.store_type.toLowerCase().includes('store'));
    store?.enable_store == 'Y' ? setStoreType(true) : setStoreType(false);

    const warehouse = props.stores.find((s) => s.store_type.toLowerCase().includes('warehouse'));
    warehouse?.enable_store == 'Y' ? setWarehouseType(true) : setWarehouseType(false);
  }, [props.stores]);

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
            borderColor: storeType ? 'primary.main' : 'divider',
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
                  checked={storeType}
                  onChange={(event) => onUpdate(event.target.checked, 'Store')}
                />

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
              <SvgColor
                src="/assets/icons/solar/solar--shop-2-bold-duotone.svg"
                sx={{ width: 40, height: 40, color: 'primary.main' }}
              />
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
            borderColor: warehouseType ? 'primary.main' : 'divider',
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
                  checked={warehouseType}
                  onChange={(event) => onUpdate(event.target.checked, 'Warehouse')}
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
              <SvgColor
                src="/assets/icons/solar/solar--buildings-2-bold-duotone.svg"
                sx={{ width: 40, height: 40, color: 'warning.main' }}
              />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
