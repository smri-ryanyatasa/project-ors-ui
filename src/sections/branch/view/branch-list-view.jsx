'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { Box, Stack, Button } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { useBranch } from '../hooks/use-branch';
import { BranchTable } from '../table/branch-table';

// ----------------------------------------------------------------------

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
  } = useBranch();

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
            variant="outlined"
            sx={{ color: 'text.secondary' }}
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
            Trigger Branch Interface
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
