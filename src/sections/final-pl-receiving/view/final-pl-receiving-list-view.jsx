'use client';

import { toast } from 'sonner';
import { useRef, useState, useEffect } from 'react';

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
    hasZero,
    zero,
  } = useFinalPLReceiving();

  const [gridRows, setGridRows] = useState(() => pls ?? []);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [editedRows, setEditedRows] = useState({});
  const [approvedReceiptOpen, setApprovedReceiptOpen] = useState(false);
  const [exceeds, setExceeds] = useState(false);
  const [exceedsRowId, setExceedsRowId] = useState(null);

  const editSequenceRef = useRef(0);

  const handleGetFiles = async (branch) => {
    const type = 3;
    await getPlsFiles(branch, type);
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

  const handleOpenApprovedReceipt = async () => {
    await hasZero();
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

    const change = {
      id: newRow.id,
      oldValues,
      newValues,
    };

    const nextUndoStack = [...undoStack, change];

    setUndoStack(nextUndoStack);

    // New edit invalidates redo history
    setRedoStack([]);

    setGridRows((prev) => prev.map((row) => (row.id === newRow.id ? newRow : row)));

    setEditedRows((prev) => {
      const existing = prev[newRow.id];

      const original = existing?.original ?? oldValues;
      const current = newValues;

      const updatedRows = {
        ...prev,
        [newRow.id]: {
          original,
          current,
          row: newRow,
        },
      };

      updateExceedsState(updatedRows, nextUndoStack);

      return updatedRows;
    });

    return newRow;
  };

  const updateExceedsState = (editedRowsData, history) => {
    const totalFinalQty = Number(status?.[0]?.total_final_qty || 0);
    const totalPlQty = Number(status?.[0]?.total_pl_qty || 0);

    const totalDifference = Object.values(editedRowsData).reduce(
      (totals, edit) =>
        totals + (Number(edit.current.final_qty || 0) - Number(edit.original.final_qty || 0)),
      0
    );

    const totalQty = totalFinalQty + totalDifference;

    const ifExceeds = totalQty > totalPlQty;

    if (!ifExceeds) {
      setExceeds(false);
      setExceedsRowId(null);
      return;
    }

    // Find the latest history entry that belongs
    // to a currently edited row.
    const latestEdit = [...history].reverse().find((change) => editedRowsData[change.id]);

    setExceeds(true);
    setExceedsRowId(latestEdit?.id ?? null);
  };

  const handleSave = async () => {
    try {
      console.log(exceeds);
      if (exceeds) {
        toast.error('Total Actual Received Quantity Exceeds PL Quantity.');
      } else {
        const result = await rowsUpdate(editedRows);
        await refresh();
        setEditedRows({});
        toast.success(result?.message || 'Save successfully.');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to save.');
    }
  };

  const handleDiscard = async () => {
    await refresh();
    setExceedsRowId(null);
    setEditedRows({});
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;

    const change = undoStack[undoStack.length - 1];

    // This is the history AFTER undo
    const nextUndoStack = undoStack.slice(0, -1);

    // Move history → redo
    setUndoStack(nextUndoStack);
    setRedoStack((prev) => [...prev, change]);

    // Update grid rows
    setGridRows((prev) =>
      prev.map((row) =>
        row.id === change.id
          ? {
              ...row,
              ...change.oldValues,
            }
          : row
      )
    );

    setEditedRows((prev) => {
      const next = { ...prev };

      const originalRow = pls.find((row) => row.id === change.id);

      const currentRow = {
        ...(prev[change.id]?.row ?? originalRow ?? {}),
        ...change.oldValues,
      };

      const isOriginal =
        originalRow &&
        (currentRow.initial_qty ?? '') === (originalRow.initial_qty ?? '') &&
        (currentRow.final_qty ?? '') === (originalRow.final_qty ?? '');

      if (isOriginal) {
        delete next[change.id];
      } else {
        const existing = prev[change.id];

        next[change.id] = {
          original: existing?.original ?? {
            initial_qty: originalRow?.initial_qty ?? '',
            final_qty: originalRow?.final_qty ?? '',
          },
          current: {
            initial_qty: currentRow.initial_qty ?? '',
            final_qty: currentRow.final_qty ?? '',
          },
          row: currentRow,
        };
      }

      // Use the history AFTER the undo
      updateExceedsState(next, nextUndoStack);

      return next;
    });
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;

    const change = redoStack[redoStack.length - 1];

    // History AFTER redo
    const nextRedoStack = redoStack.slice(0, -1);
    const nextUndoStack = [...undoStack, change];

    // Move history → undo
    setRedoStack(nextRedoStack);
    setUndoStack(nextUndoStack);

    // Update grid rows
    setGridRows((prev) =>
      prev.map((row) =>
        row.id === change.id
          ? {
              ...row,
              ...change.newValues,
            }
          : row
      )
    );

    // Update edited rows
    setEditedRows((prev) => {
      const next = { ...prev };

      const originalRow = pls.find((row) => row.id === change.id);

      const currentRow = {
        ...(prev[change.id]?.row ?? originalRow ?? {}),
        ...change.newValues,
      };

      const existing = prev[change.id];

      next[change.id] = {
        original: existing?.original ?? {
          initial_qty: originalRow?.initial_qty ?? '',
          final_qty: originalRow?.final_qty ?? '',
        },
        current: {
          initial_qty: currentRow.initial_qty ?? '',
          final_qty: currentRow.final_qty ?? '',
        },
        row: currentRow,
      };

      // Recalculate using the NEW undo history
      updateExceedsState(next, nextUndoStack);

      return next;
    });
  };

  const handleApproved = async () => {
    try {
      const result = await toApproved();
      await refresh();
      toast.success(result?.message || 'Successfully updated.');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to approve.');
    }
  };

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);

    // Reset exceed highlight when changing page
    setExceedsRowId(null);
    setExceeds(false);
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
        onPaginationModelChange={handlePaginationModelChange}
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
        onExceeds={exceedsRowId}
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
        hasZero={zero}
        onApproved={handleApproved}
        onClose={() => setApprovedReceiptOpen(false)}
      />
    </>
  );
}
