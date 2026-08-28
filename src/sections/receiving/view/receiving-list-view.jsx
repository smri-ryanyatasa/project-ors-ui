'use client';

// import { useState, useEffect } from 'react';

import { toast } from 'sonner';

import { Box } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

// import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { SummaryCard } from '../cards/summary-card';
import { ReceivingFilter } from './receiving-filter';
import { ReceivingTable } from '../table/receiving-table';
import { useReceivingReport } from '../hooks/use-receiving-report';

export function ReceivingListView({ title = 'Blank', sx }) {
  const {
    loading,
    receivingPls,
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
    setApprovedReceiptStartDate,
    setApprovedReceiptEndDate,
    setInitialReceiptStartDate,
    setInitialReceiptEndDate,
  } = useReceivingReport();

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
      <ReceivingFilter />
      <SummaryCard />
      <ReceivingTable
        loading={loading}
        rows={receivingPls}
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
