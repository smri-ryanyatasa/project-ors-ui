'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { Box, Grid } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

// import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { usePlUpload } from 'src/sections/pl-upload/hooks/use-pl-upload';

import { UniqueSkuReceivedCard } from '../cards/unique-sku-received';
import { InitialPlReceivingFilter } from './initial-pl-receiving-filter';
import { ConfirmReceiptDialog } from '../dialogs/confirm-receipt-dialog';
import { useInitialPLReceiving } from '../hooks/use-initial-pl-receiving';
import { InitialPlReceivingTable } from '../table/initial-pl-receiving-table';
import { ActualReceivedQuantityCard } from '../cards/actual-received-quantity';

export function InitialPlReceivingListView({ title = 'Blank', sx }) {
  const {
    refresh,
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
    rowsUpdate,
    hasZero,
    zero,
    toConfirm,
  } = useInitialPLReceiving();

  const { branches } = usePlUpload();
  const [editedRows, setEditedRows] = useState({});
  const [confirmReceiptOpen, setConfirmReceiptOpen] = useState(false);
  const [packingList, setPackingList] = useState([]);

  const handleOpenConfirmReceipt = async () => {
    const result = await hasZero();

    setPackingList(result.packingList);

    if (result.hasPending) {
      toast.warning('Some items are still on Pending.');
      return;
    }
    setConfirmReceiptOpen(true);
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

  const handleGetFiles = async (branch) => {
    await getPlsFiles(branch);
  };

  const handleFilterChange = async (form) => {
    setBranch(form.branches);
    setFilename(form.filename);
    setVendorCode(form.vendor_code.split(' - ')[0]);
    setSiNumber(form.si_number);
  };

  const handleRowUpdate = async (newRow) => {
    const originalRow = pls.find((item) => item.id === newRow.id);
    if (!originalRow) {
      return newRow;
    }

    const originalValue = originalRow.actual_received ?? '';
    const newValue = newRow.actual_received ?? '';

    const hasChanges = newValue !== originalValue;

    setEditedRows((prev) => {
      const next = { ...prev };

      if (hasChanges) {
        next[newRow.id] = newRow;
      } else {
        delete next[newRow.id];
      }

      return next;
    });

    if (hasChanges) {
      try {
        await rowsUpdate(newRow);
        await refresh();
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to save.');
      }
    }

    return newRow;
  };

  const handleToConfirm = async () => {
    await toConfirm(packingList);
    await refresh();
    toast.success('Successfully updated.');
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
        onConfirmReceipt={handleOpenConfirmReceipt}
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
      <ConfirmReceiptDialog
        open={confirmReceiptOpen}
        hasZero={zero}
        onConfirm={handleToConfirm}
        onClose={() => setConfirmReceiptOpen(false)}
      />
    </>
  );
}
