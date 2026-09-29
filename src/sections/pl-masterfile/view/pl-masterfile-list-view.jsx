'use client';

import { toast } from 'sonner';

import { Box } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { PageHeader } from 'src/components/page-header/page-header';

import { SummaryCard } from '../cards/summary-card';
import { usePlMasterfile } from '../hooks/use-pl-masterfile';
import { PlMasterfileTable } from '../table/pl-masterfile-table';

export function PlMasterfileListView({ title = 'Blank', sx }) {
  const {
    loading,
    plsMasterfile,
    summary,
    total,
    paginationModel,
    setPaginationModel,
    filterModel,
    handleFilterModelChange,
    sortModel,
    setSortModel,
    csvExport,
    excelExport,
    customFilterModel,
    handleCustomFilterModelChange,
    saveFilter,
    getSaveFilter,
    deleteSaveFilter,
    updateSaveFilter,
  } = usePlMasterfile();

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
      <SummaryCard loading={loading} summary={summary} />
      <PlMasterfileTable
        loading={loading}
        pls={plsMasterfile}
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
