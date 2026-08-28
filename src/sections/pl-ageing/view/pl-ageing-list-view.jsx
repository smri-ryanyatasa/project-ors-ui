'use client';

import { toast } from 'sonner';

import { Box } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { PageHeader } from 'src/components/page-header/page-header';

import { PlAgeingFilter } from './pl-ageing-filter';
import { SummaryCard } from '../cards/summary-card';
import { PlAgeingTable } from '../table/pl-ageing-table';
import { usePlAgeingReport } from '../hooks/use-pl-ageing-report';

export function PlAgeingListView({ title = 'Blank', sx }) {
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
    setUploadedStarDate,
    setUploadedEndDate,
    setApprovedReceiptStartDate,
    setApprovedReceiptEndDate,
    setInitialReceiptStartDate,
    setInitialReceiptEndDate,
    setPoGeneratedStartDate,
    setPoGeneratedEndDate,
  } = usePlAgeingReport();

  const handleCsvExport = async () => {
    try {
      await csvExport();
      toast.success('CSV file downloaded successfully.');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to download the file.');
    }
  };

  const handleExcelExport = async () => {
    try {
      await excelExport();
      toast.success('Excel file downloaded successfully.');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to download the file.');
    }
  };

  const handleDateFilter = async (dates) => {
    setUploadedStarDate(formatDate(dates.uploadedDate.startDate));
    setUploadedEndDate(formatDate(dates.uploadedDate.endDate));
    setApprovedReceiptStartDate(formatDate(dates.approvedReceiptDate.startDate));
    setApprovedReceiptEndDate(formatDate(dates.approvedReceiptDate.endDate));
    setInitialReceiptStartDate(formatDate(dates.initialReceiptDate.startDate));
    setInitialReceiptEndDate(formatDate(dates.initialReceiptDate.endDate));
    setPoGeneratedStartDate(formatDate(dates.poGeneratedDate.startDate));
    setPoGeneratedEndDate(formatDate(dates.poGeneratedDate.endDate));

    console.log(formatDate(dates.approvedReceiptDate.startDate));
  };

  const formatDate = (date) => {
    if (!date) return 'All';

    const [year, month, day] = date.split('-');

    return `${month}/${day}/${year}`;
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
      <PlAgeingFilter onFilter={handleDateFilter} />
      <SummaryCard loading={loading} summary={status} />
      <PlAgeingTable
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
          label: 'Reports',
        },
        {
          label: 'PL Ageing',
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
