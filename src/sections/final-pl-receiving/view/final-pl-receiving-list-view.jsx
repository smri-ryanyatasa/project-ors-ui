'use client';

// import { toast } from 'sonner';
// import { useState, useEffect } from 'react';

import { Box, Grid } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

// import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { TotalPlQuantityCard } from '../cards/total-pl-quantity';
import { FinalPlReceivingFilter } from './final-pl-receiving-filter';
import { FinalPlReceivingTable } from '../table/final-pl-receiving-table';
import { TotalFinalReceivedQuantityCard } from '../cards/total-final-received-quantity';
import { TotalInitialReceivedQuantityCard } from '../cards/total-initial-received-quantity';

export function FinalPlReceivingListView({ title = 'Blank', sx }) {
  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 3,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <FinalPlReceivingFilter />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <TotalPlQuantityCard />
        <TotalInitialReceivedQuantityCard />
        <TotalFinalReceivedQuantityCard />
      </Grid>
      <FinalPlReceivingTable />
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
