'use client';

// import { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

// import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { SummaryCard } from '../cards/summary-card';

export function PlReceivingApprovalListView({ title = 'Blank', sx }) {
  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 3,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <SummaryCard />
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
          label: 'Maitenance',
        },
        {
          label: 'PL Receiving Approval',
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
