'use client';

// import { useState, useEffect } from 'react';

import { Box } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

// import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

// import { usePlUpload } from 'src/sections/pl-upload/hooks/use-pl-upload';

// import { UniqueSkuReceivedCard } from '../cards/unique-sku-received';
// import { InitialPlReceivingFilter } from './initial-pl-receiving-filter';
// import { useInitialPLReceiving } from '../hooks/use-initial-pl-receiving';
// import { InitialPlReceivingTable } from '../table/initial-pl-receiving-table';
// import { ActualReceivedQuantityCard } from '../cards/actual-received-quantity';

export function ReceivingListView({ title = 'Blank', sx }) {
  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 3,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
     />
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
          label: 'Reports',
        },
        {
          label: 'Receiving',
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
