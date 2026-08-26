'use client';

import { toast } from 'sonner';
import { useState, useEffect } from 'react';

import { Box, Grid } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { PageHeader } from 'src/components/page-header/page-header';

import { usePlUpload } from 'src/sections/pl-upload/hooks/use-pl-upload';
import { useInitialPLReceiving } from 'src/sections/initial-pl-receiving/hooks/use-initial-pl-receiving';

import { TotalPlQuantityCard } from '../cards/total-pl-quantity';
import { FinalPlReceivingFilter } from './final-pl-receiving-filter';
import { useFinalPLReceiving } from '../hooks/use-final-pl-receiving';
import { FinalPlReceivingTable } from '../table/final-pl-receiving-table';
import { ApprovedReceiptDialog } from '../dialogs/approved-receipt-dialog';
import { TotalFinalReceivedQuantityCard } from '../cards/total-final-received-quantity';
import { TotalInitialReceivedQuantityCard } from '../cards/total-initial-received-quantity';

export function FinalPlReceivingListView({ title = 'Blank', sx }) {
  const { branches } = usePlUpload();
  const { getPlsFiles, files } = useInitialPLReceiving();
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
    setBranch,
    setFilename,
    setVendorCode,
    setSiNumber,
    rowsUpdate,
    toApproved,
  } = useFinalPLReceiving();

  const [gridRows, setGridRows] = useState(() => pls ?? []);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [editedRows, setEditedRows] = useState({});
  const [approvedReceiptOpen, setApprovedReceiptOpen] = useState(false);
  console.log(pls);
  const handleGetFiles = async (branch) => {
    const type = 3;
    await getPlsFiles(branch, type);
  };

  const handleCsvExport = async () => {
    await csvExport();
    toast.success('CSV file downloaded successfully.');
  };

  const handleExcelExport = async () => {
    await excelExport();
    toast.success('Excel file downloaded successfully.');
  };

  const handleOpenApprovedReceipt = async () => {
    setApprovedReceiptOpen(true);
  };

  const handleFilterChange = async (form) => {
    setBranch(form.branches);
    setFilename(form.filename);
    setVendorCode(form.vendor_code.split(' - ')[0]);
    setSiNumber(form.si_number);
  };

  const handleRowUpdate = async (newRow, oldRow) => {
    const oldValues = {
      initial_qty: oldRow.initial_qty ?? '',
      final_qty: oldRow.final_qty ?? '',
    };

    const newValues = {
      initial_qty: newRow.initial_qty ?? '',
      final_qty: newRow.final_qty ?? '',
    };

    const hasChanges =
      oldValues.initial_qty !== newValues.initial_qty ||
      oldValues.final_qty !== newValues.final_qty;

    if (!hasChanges) {
      return oldRow;
    }

    // Save history
    setUndoStack((prev) => [
      ...prev,
      {
        id: newRow.id,
        oldValues,
        newValues,
      },
    ]);

    // New edit invalidates redo history
    setRedoStack([]);

    // Update DataGrid rows
    setGridRows((prev) => prev.map((row) => (row.id === newRow.id ? newRow : row)));

    // Update edited rows
    setEditedRows((prev) => ({
      ...prev,
      [newRow.id]: newRow,
    }));

    return newRow;
  };

  const handleSave = async () => {
    await rowsUpdate(editedRows);
    await refresh();
    setEditedRows({});
    toast.success('Save successfully.');
  };

  const handleDiscard = async () => {
    await refresh();
    setEditedRows({});
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    const change = undoStack[undoStack.length - 1];

    let undoneRow;

    setGridRows((prev) =>
      prev.map((row) => {
        if (row.id !== change.id) {
          return row;
        }

        undoneRow = {
          ...row,
          ...change.oldValues,
        };

        return undoneRow;
      })
    );

    // Move history → redo
    setUndoStack((prev) => prev.slice(0, -1));

    setRedoStack((prev) => [...prev, change]);

    // Update edited rows
    setEditedRows((prev) => {
      const next = { ...prev };

      const originalRow = pls.find((row) => row.id === change.id);

      if (
        originalRow &&
        (undoneRow?.initial_qty ?? '') === (originalRow.initial_qty ?? '') &&
        (undoneRow?.final_qty ?? '') === (originalRow.final_qty ?? '')
      ) {
        delete next[change.id];
      } else if (undoneRow) {
        next[change.id] = undoneRow;
      }

      return next;
    });
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const change = redoStack[redoStack.length - 1];

    let redoneRow;

    setGridRows((prev) =>
      prev.map((row) => {
        if (row.id !== change.id) {
          return row;
        }

        redoneRow = {
          ...row,
          ...change.newValues,
        };

        return redoneRow;
      })
    );

    // Move history → undo
    setRedoStack((prev) => prev.slice(0, -1));

    setUndoStack((prev) => [...prev, change]);

    // Add back to edited rows
    setEditedRows((prev) => ({
      ...prev,
      [change.id]: redoneRow,
    }));
  };

  const handleApproved = async () => {
    await toApproved();
    await refresh();
    toast.success('Successfully updated.');
  };

  useEffect(() => {
    setGridRows(pls ?? []);
  }, [pls]);

  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 3,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <FinalPlReceivingFilter
        branches={branches}
        onGetFiles={handleGetFiles}
        files={files}
        onFilterChange={handleFilterChange}
      />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <TotalPlQuantityCard loading={loading} status={status?.[0]?.total_pl_qty ?? 0} />
        <TotalInitialReceivedQuantityCard
          loading={loading}
          status={status?.[0]?.total_initial_qty ?? 0}
        />
        <TotalFinalReceivedQuantityCard
          loading={loading}
          status={status?.[0]?.total_final_qty ?? 0}
        />
      </Grid>
      <FinalPlReceivingTable
        loading={loading}
        rows={gridRows}
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
        onDiscard={handleDiscard}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onApprovedReceipt={handleOpenApprovedReceipt}
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
          label: 'Final PL Receiving',
        },
      ]}
    />
  );

  return (
    <>
      {renderPageHeader()}
      <DashboardContent maxWidth="xl">{renderContent()}</DashboardContent>
      <ApprovedReceiptDialog
        open={approvedReceiptOpen}
        onApproved={handleApproved}
        onClose={() => setApprovedReceiptOpen(false)}
      />
    </>
  );
}
