'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { Box, Stack, Button, Backdrop, Typography, CircularProgress } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { useItem } from '../hooks/use-item';
import { ItemTable } from '../table/item-table';

// ----------------------------------------------------------------------

export function ItemListView({ title = 'Blank', sx }) {
  const {
    refresh,
    loading,
    items,
    total,
    paginationModel,
    setPaginationModel,
    filterModel,
    handleFilterModelChange,
    sortModel,
    setSortModel,
    csvExport,
    excelExport,
    itemRowsUpdate,
    triggerItemInterface,
  } = useItem();

  const [editedRows, setEditedRows] = useState({});
  const [triggerLoading, setTriggerLoading] = useState(false);

  const handleRowUpdate = async (newRow) => {
    const originalRow = items.find((item) => item.id === newRow.id);
    if (!originalRow) {
      return newRow;
    }

    const originalAltVendorCode = originalRow.alt_vendor_code ?? '';
    const newAltVendorCode = newRow.alt_vendor_code ?? '';

    const originalAltVendorName = originalRow.alt_vendor_name ?? '';
    const newAltVendorName = newRow.alt_vendor_name ?? '';

    const hasChanges =
      newAltVendorCode !== originalAltVendorCode || originalAltVendorName !== newAltVendorName;

    setEditedRows((prev) => {
      const next = { ...prev };

      if (hasChanges) {
        next[newRow.id] = newRow;
      } else {
        delete next[newRow.id];
      }

      return next;
    });

    return newRow;
  };

  const handleSave = async () => {
    await itemRowsUpdate(editedRows);
    await refresh();

    setEditedRows({});

    toast.success('Item rows updated successfully.');
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

  const handleTriggerItem = async () => {
    try {
      setTriggerLoading(true);
      await triggerItemInterface();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to download the file.');
    } finally {
      setTriggerLoading(false);
      await refresh();
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
      <ItemTable
        loading={loading}
        items={items}
        rowCount={total}
        hasRowChanges={Object.keys(editedRows).length > 0}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onFilterModelChange={handleFilterModelChange}
        filterModel={filterModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        onDownloadCsv={handleCsvExport}
        onDownloadExcel={handleExcelExport}
        onRowUpdate={handleRowUpdate}
        onSave={handleSave}
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
          label: 'Item',
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
            onClick={handleTriggerItem}
          >
            Trigger Item Interface
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
