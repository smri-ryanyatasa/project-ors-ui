'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { Box, Stack, Button } from '@mui/material';

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
  } = useItem();
  const [editedRows, setEditedRows] = useState({});

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
            sx={{
              bgcolor: '#0030ff !important',
              '&:hover': {
                bgcolor: '#032ad8 !important',
              },
              color: 'white !important',
            }}
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
            Trigger Item Interface
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
