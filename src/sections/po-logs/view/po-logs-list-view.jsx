'use client';

// import { toast } from 'sonner';
// import { useState, useEffect } from 'react';

import { Box, Grid, Stack, Button } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { POLogsTable } from '../table/po-logs-table';
import { PlsPendingProcessingCard } from '../cards/pls-pending-processing';
import { PlsPendingReTriggeringCard } from '../cards/pls-pending-re-triggering';
import { PlsSuccessfulPOgenerationCard } from '../cards/pls-successful-po-generation';

export function POLogsListView({ title = 'Blank', sx }) {
  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 3,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <PlsPendingProcessingCard />
        <PlsPendingReTriggeringCard />
        <PlsSuccessfulPOgenerationCard />
      </Grid>
      <POLogsTable />
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
      action={
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#0030ff',
              '&:hover': {
                bgcolor: '#032ad8',
              },
            }}
            startIcon={
              <SvgColor
                src="/assets/icons/solar/mdi--settings-sync.svg"
                sx={{ width: 20, height: 20 }}
              />
            }
            onClick={() => {
              // Import from MMS
            }}
          >
            Re-Trigger PO Generation
          </Button>
        </Stack>
      }
    />
  );

  return (
    <>
      {renderPageHeader()}
      <DashboardContent maxWidth="xl">{renderContent()}</DashboardContent>
    </>
  );
}
