'use client';

import { toast } from 'sonner';
// import { useState, useEffect } from 'react';

import { Box, Grid, Stack, Button } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { POLogsTable } from '../table/po-logs-table';
import { PlsPendingProcessingCard } from '../cards/pls-pending-processing';
import { PlsPendingReTriggeringCard } from '../cards/pls-pending-re-triggering';
import { PlsSuccessfulPOgenerationCard } from '../cards/pls-successful-po-generation';
import { usePOLogs } from '../hooks/use-po-logs';

export function POLogsListView({ title = 'Blank', sx }) {
  const {
    loading,
    pls,
    status,
    total,
    paginationModel,
    setPaginationModel,
    filterModel,
    handleFilterModelChange,
    sortModel,
    setSortModel,
    csvExport,
    excelExport,
  } = usePOLogs();

  const handleCsvExport = async () => {
    await csvExport();
    toast.success('CSV file downloaded successfully.');
  };

  const handleExcelExport = async () => {
    await excelExport();
    toast.success('Excel file downloaded successfully.');
  };

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
        <PlsPendingProcessingCard
          loading={loading}
          status={status?.[0]?.total_pl_pending_process ?? 0}
        />
        <PlsPendingReTriggeringCard
          loading={loading}
          status={status?.[0]?.total_pl_pending_reproccess ?? 0}
        />
        <PlsSuccessfulPOgenerationCard
          loading={loading}
          status={status?.[0]?.total_pl_po_generated ?? 0}
        />
      </Grid>
      <POLogsTable
        loading={loading}
        rows={pls}
        rowCount={total}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onFilterModelChange={handleFilterModelChange}
        filterModel={filterModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        onDownloadCsv={handleCsvExport}
        onDownloadExcel={handleExcelExport}
      />
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
            color="primary"
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
