'use client';

import { toast } from 'sonner';
// import { useState, useEffect } from 'react';

import { Box, Grid } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

// import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { usePlUpload } from 'src/sections/pl-upload/hooks/use-pl-upload';

import { UniqueSkuReceivedCard } from '../cards/unique-sku-received';
import { InitialPlReceivingFilter } from './initial-pl-receiving-filter';
import { useInitialPLReceiving } from '../hooks/use-initial-pl-receiving';
import { InitialPlReceivingTable } from '../table/initial-pl-receiving-table';
import { ActualReceivedQuantityCard } from '../cards/actual-received-quantity';

export function InitialPlReceivingListView({ title = 'Blank', sx }) {
  const { branches } = usePlUpload();
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
    getPlsFiles,
    files,
    setBranch,
    setFilename,
    setVendorCode,
    setSiNumber,
  } = useInitialPLReceiving();

  const handleCsvExport = async () => {
    await csvExport();
    toast.success('CSV file downloaded successfully.');
  };

  const handleExcelExport = async () => {
    await excelExport();
    toast.success('Excel file downloaded successfully.');
  };

  const handleGetFiles = async (branch) => {
    await getPlsFiles(branch);
  };

  const handleFilterChange = async (form) => {
    setBranch(form.branches);
    setFilename(form.filename);
    setVendorCode(form.vendor_code.split(' - ')[0]);
    setSiNumber(form.si_number);
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
      <InitialPlReceivingFilter
        branches={branches}
        onGetFiles={handleGetFiles}
        files={files}
        onFilterChange={handleFilterChange}
      />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <UniqueSkuReceivedCard status={status?.[0]?.total_uq_sku_received ?? 0} />

        <ActualReceivedQuantityCard status={status?.[0]?.total_actual_qty_received ?? 0} />
      </Grid>
      <InitialPlReceivingTable
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
    />
  );

  return (
    <>
      {renderPageHeader()}
      <DashboardContent maxWidth="xl">{renderContent()}</DashboardContent>
    </>
  );
}
