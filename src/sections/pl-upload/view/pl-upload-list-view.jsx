'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { Box, Grid, Stack, Button } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { PlUploadFilter } from './pl-upload-filter';
import { usePlUpload } from '../hooks/use-pl-upload';
import { PlUploadTable } from '../table/pl-upload-table';
import { FileUploadedCard } from '../cards/file-upload-card';
import { FileRejectedCard } from '../cards/file-rejected-card';
import { PlUploadLogsDialog } from '../dialogs/pl-upload-logs-dialog';
import { PlUploadDeleteDialog } from '../dialogs/pl-upload-delete-dialog';

export function PlUploadListView({ title = 'Blank', sx }) {
  const {
    refresh,
    loading,
    plsUplaod,
    plsUplaodStatus,
    branches,
    setSelectedBranch,
    total,
    paginationModel,
    setPaginationModel,
    filterModel,
    handleFilterModelChange,
    sortModel,
    setSortModel,
    csvExport,
    excelExport,
    plLogs,
    plUploadExceptions,
    deletePlFile,
  } = usePlUpload();

  const [selectedPl, setSelectedPl] = useState([]);
  const [logs, setLogs] = useState([]);
  const [plUploadLogsOpen, setPlUploadLogsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleBranchChange = async (selectedBranch) => {
    setSelectedBranch(selectedBranch);
  };

  const handleOpenDelete = async (file) => {
    setDeleteOpen(true);
    setSelectedPl(file);
  };

  const handleOpenPlUploadLog = async (file) => {
    setLogs([]);
    setPlUploadLogsOpen(true);
    setSelectedPl(file);

    const getLogs = await plLogs(file);
    setLogs(getLogs);
  };

  const handlePlExceptionsExcelExport = async (file) => {
    await plUploadExceptions(file);
    toast.success('PL Exceptions file downloaded successfully.');
  };

  const handleCsvExport = async () => {
    await csvExport();
    toast.success('CSV file downloaded successfully.');
  };

  const handleExcelExport = async () => {
    await excelExport();
    toast.success('Excel file downloaded successfully.');
  };

  const handleDelete = async (file) => {
    await deletePlFile(file);
    await refresh();
    toast.success('PL File deleted successfully');
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
      <PlUploadFilter branches={branches} onBranchChange={handleBranchChange} />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <FileRejectedCard loading={loading} reject={plsUplaodStatus?.[0]?.total_pl_errors ?? 0} />
        <FileUploadedCard loading={loading} uploaded={plsUplaodStatus?.[0]?.total_available ?? 0} />
      </Grid>
      <PlUploadTable
        loading={loading}
        pls={plsUplaod}
        rowCount={total}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onFilterModelChange={handleFilterModelChange}
        filterModel={filterModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        onDownloadCsv={handleCsvExport}
        onDownloadExcel={handleExcelExport}
        onPlUploadLog={handleOpenPlUploadLog}
        onPlUploadException={handlePlExceptionsExcelExport}
        onDelete={handleOpenDelete}
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
          label: 'PL Upload',
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
                src="/assets/icons/solar/material-symbols--add.svg"
                sx={{ width: 20, height: 20 }}
              />
            }
          >
            Upload Packing List
          </Button>
        </Stack>
      }
    />
  );

  return (
    <>
      {renderPageHeader()}
      <DashboardContent maxWidth="xl">{renderContent()}</DashboardContent>
      <PlUploadLogsDialog
        open={plUploadLogsOpen}
        pl={selectedPl}
        logs={logs}
        onClose={() => setPlUploadLogsOpen(false)}
      />
      <PlUploadDeleteDialog
        open={deleteOpen}
        pl={selectedPl}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
