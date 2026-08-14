'use client';

// import { toast } from 'sonner';
// import { useState, useEffect } from 'react';

import { Box, Grid } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

// import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { UniqueSkuReceivedCard } from '../cards/unique-sku-received';
import { InitialPlReceivingFilter } from './initial-pl-receiving-filter';
import { InitialPlReceivingTable } from '../table/initial-pl-receiving-table';
import { ActualReceivedQuantityCard } from '../cards/actual-received-quantity';

export function InitialPlReceivingListView({ title = 'Blank', sx }) {
  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 3,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <InitialPlReceivingFilter />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <UniqueSkuReceivedCard />

        <ActualReceivedQuantityCard />
      </Grid>
      <InitialPlReceivingTable />
    </Box>
  );

  const renderPageHeader = () => (
    <PageHeader
      title={title}
      breadcrumbs={[
        {
          label: 'Dashboard',
          href: '/dashboard',
        },
        {
          label: 'PL Receiving',
        },
        {
          label: 'Initial PL Receiving',
        },
      ]}
    />
  );

  return (
    <>
      {renderPageHeader()}
      <DashboardContent maxWidth="xl">{renderContent()}</DashboardContent>
    </>
  );
}
