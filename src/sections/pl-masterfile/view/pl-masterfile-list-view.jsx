'use client';

import { Box } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { PageHeader } from 'src/components/page-header/page-header';

import { SummaryCard } from '../cards/summary-card';
import { PlMasterfileTable } from '../table/pl-masterfile-table';

export function PlMasterfileListView({ title = 'Blank', sx }) {
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
      <PlMasterfileTable />
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
          label: 'Packing List',
        },
        {
          label: 'PL Masterfile',
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
