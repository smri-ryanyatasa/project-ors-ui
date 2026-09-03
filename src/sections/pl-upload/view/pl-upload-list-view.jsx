'use client';

import { toast } from 'sonner';
import { useState, useEffect } from 'react';

import { Box, Grid, Stack, Button, Backdrop, Typography, CircularProgress } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { PlUploadFilter } from './pl-upload-filter';
import { usePlUpload } from '../hooks/use-pl-upload';
import { PlUploadTable } from '../table/pl-upload-table';
import { FileUploadedCard } from '../cards/file-upload-card';
import { PlUploadDialog } from '../dialogs/pl-upload-dialog';
import { FileRejectedCard } from '../cards/file-rejected-card';
import { PlUploadLogsDialog } from '../dialogs/pl-upload-logs-dialog';
import { PlUploadDeleteDialog } from '../dialogs/pl-upload-delete-dialog';
import { PlUploadExceptionDialog } from '../dialogs/pl-upload-exception-dialog';

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
    plUpload,
    plReUpload,
  } = usePlUpload();

  const [selectedPl, setSelectedPl] = useState([]);
  const [logs, setLogs] = useState([]);
  const [plUploadLogsOpen, setPlUploadLogsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [uploadButton, setUploadButton] = useState(true);
  const [branch, setBranch] = useState();
  const [exportLoading, setExportLoading] = useState(false);
  const [plUploadExceptionOpen, setPlUploadExceptionOpen] = useState(false);

  useEffect(() => {
    if (exportLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [exportLoading]);

  const handleBranchChange = async (selectedBranch) => {
    setSelectedBranch(selectedBranch);
    setBranch(selectedBranch);
    setUploadButton(selectedBranch ? false : true);
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

  const handlePlUploadException = async (file) => {
    setPlUploadExceptionOpen(true);
    setSelectedPl(file);
  };

  const handlePlExceptionsExcelExport = async (file) => {
    setExportLoading(true);
    await plUploadExceptions(file);
    toast.success('PL Exceptions file downloaded successfully.');
    setExportLoading(false);
  };

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

  const handleDelete = async (file) => {
    try {
      await deletePlFile(file);
      await refresh();
      toast.success('PL File deleted successfully');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Something went wrong. Please contact your Administrator.'
      );
    }
  };

  const handleImport = async (file) => {
    await plUpload(file);
    await refresh();
    toast.success('PL File uploaded successfully');
  };

  const handleExceptionImport = async (file) => {
    await plReUpload(file);
    await refresh();
    toast.success('Re-Upload PL File uploaded successfully');
  };

  const onDownloadTemplate = () => {
    console.log('sdasdad');
    const link = document.createElement('a');

    link.href = '/assets/templates/Vendor Code_Sales Invoice_Branch Code.xlsx';
    link.download = 'Vendor Code_Sales Invoice_Branch Code.xlsx';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <Backdrop
        open={exportLoading}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 1,
          color: '#fff',
          position: 'fixed',
          inset: 0,
          flexDirection: 'column',
          gap: 2,
          borderRadius: 1,
        }}
      >
        <CircularProgress color="inherit" />

        <Typography color="inherit" variant="subtitle1">
          Downloading file, please wait...
        </Typography>
      </Backdrop>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
        {/* Filter */}
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },
          }}
        >
          <PlUploadFilter branches={branches} onBranchChange={handleBranchChange} />
        </Box>

        {/* Status Cards */}
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },
          }}
        >
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
              <FileRejectedCard
                loading={loading}
                reject={plsUplaodStatus?.[0]?.total_pl_errors ?? 0}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex' }}>
              <FileUploadedCard
                loading={loading}
                uploaded={plsUplaodStatus?.[0]?.total_available ?? 0}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>

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
        onPlReUpload={handlePlUploadException}
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
            color="primary"
            startIcon={
              <SvgColor
                src="/assets/icons/solar/material-symbols--add.svg"
                sx={{ width: 20, height: 20 }}
              />
            }
            onClick={() => setBulkUploadOpen(true)}
            disabled={uploadButton}
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
      <PlUploadDialog
        open={bulkUploadOpen}
        onClose={() => setBulkUploadOpen(false)}
        onImport={handleImport}
        onDownloadTemplate={onDownloadTemplate}
        branch={branch}
      />
      <PlUploadExceptionDialog
        open={plUploadExceptionOpen}
        pl={selectedPl}
        onClose={() => setPlUploadExceptionOpen(false)}
        onImport={handleExceptionImport}
        onDownloadTemplate={onDownloadTemplate}
        branch={branch}
      />
    </>
  );
}
