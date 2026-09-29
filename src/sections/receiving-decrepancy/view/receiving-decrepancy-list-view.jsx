'use client';

import { toast } from 'sonner';

import { Box } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { PageHeader } from 'src/components/page-header/page-header';

import { usePlUpload } from 'src/sections/pl-upload/hooks/use-pl-upload';

import { SummaryCard } from '../cards/summary-card';
import { ReceivingDecrepancyFilter } from './receiving-decrepancy-filter';
import { useReceivingDecrepancyReport } from '../hooks/use-receiving-report';
import { ReceivingDecrepancyTable } from '../table/receiving-decrepancy-table';

export function ReceivingDecrepancyListView({ title = 'Blank', sx }) {
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
    setBranch,
    setInitialReceiptStartDate,
    setInitialReceiptEndDate,
    setFinalReceiptStartDate,
    setFinalReceiptEndDate,
    customFilterModel,
    handleCustomFilterModelChange,
    saveFilter,
    getSaveFilter,
    deleteSaveFilter,
    updateSaveFilter,
  } = useReceivingDecrepancyReport();

  const { branches } = usePlUpload();

  const handleCsvExport = async () => {
    await csvExport();
    toast.success('CSV file downloaded successfully.');
  };

  const handleExcelExport = async () => {
    await excelExport();
    toast.success('Excel file downloaded successfully.');
  };

  const handleDateFilter = async (filter) => {
    setBranch(filter.branches);
    setInitialReceiptStartDate(formatDate(filter.initialReceiptDate.startDate));
    setInitialReceiptEndDate(formatDate(filter.initialReceiptDate.endDate));
    setFinalReceiptStartDate(formatDate(filter.finalReceiptDate.startDate));
    setFinalReceiptEndDate(formatDate(filter.finalReceiptDate.endDate));
  };

  const formatDate = (date) => {
    if (!date) return 'All';

    const [year, month, day] = date.split('-');

    return `${month}/${day}/${year}`;
  };

  const handleSaveFilter = async (filter) => {
    try {
      await saveFilter(filter);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleDeteleSavedFilter = async (filter) => {
    try {
      await deleteSaveFilter(filter);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
  };

  const handleUpdateSavedFilter = async (filter) => {
    try {
      await updateSaveFilter(filter);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
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
      <ReceivingDecrepancyFilter branches={branches} onFilter={handleDateFilter} />
      <SummaryCard summary={status} />
      <ReceivingDecrepancyTable
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
        customFilterModel={customFilterModel}
        onCustomFilterModelChange={handleCustomFilterModelChange}
        onSaveFilter={handleSaveFilter}
        getSaveFilter={getSaveFilter}
        onDeleteSavedFilter={handleDeteleSavedFilter}
        onUpdateSavedFilter={handleUpdateSavedFilter}
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
