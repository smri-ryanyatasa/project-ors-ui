'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { Box, Stack, Button, Backdrop, Typography, CircularProgress } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { useBranch } from '../hooks/use-branch';
import { BranchTable } from '../table/branch-table';

export function BranchListView({ title = 'Blank', sx }) {
  const {
    refresh,
    loading,
    branches,
    total,
    paginationModel,
    setPaginationModel,
    filterModel,
    handleFilterModelChange,
    sortModel,
    setSortModel,
    csvExport,
    excelExport,
    triggerBranchInterface,
  } = useBranch();

  const [triggerLoading, setTriggerLoading] = useState(false);

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

  const handleTriggerBranch = async () => {
    try {
      setTriggerLoading(true);
      await triggerBranchInterface();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to download the file.');
    } finally {
      setTimeout(async () => {
        setTriggerLoading(false);
        await refresh();
      }, 4000);
      //   setTriggerLoading(false);
    }
  };

  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 3,
          width: 1,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0px 8px 24px rgba(171, 179, 188, 0.12)',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <BranchTable
        loading={loading}
        branches={branches}
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
          label: 'MMS Masterfile',
        },
        {
          label: 'Branch',
        },
      ]}
      action={
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            color="primary"
            loading={triggerLoading}
            startIcon={
              <SvgColor
                src="/assets/icons/solar/mdi--settings-sync.svg"
                sx={{ width: 20, height: 20 }}
              />
            }
            onClick={handleTriggerBranch}
          >
            Trigger Branch Interface
          </Button>
        </Stack>
      }
    />
  );

  const loader = () => (
    <Backdrop
      open={triggerLoading}
      sx={{
        position: 'absolute',
        zIndex: (theme) => theme.zIndex.modal + 1,
        color: '#fff',
        flexDirection: 'column',
        borderRadius: 1,
      }}
    >
      <CircularProgress color="inherit" sx={{ mb: 2 }} />

      <Typography color="inherit" variant="subtitle1">
        Interface is in Progress ...
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        Please wait while we process your request.
      </Typography>
    </Backdrop>
  );

  return (
    <>
      {renderPageHeader()}
      <DashboardContent maxWidth="xl">
        {renderContent()}
        {loader()}
      </DashboardContent>
    </>
  );
}
