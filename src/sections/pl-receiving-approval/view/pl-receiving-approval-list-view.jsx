'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { Box, Backdrop, Typography, CircularProgress } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { PageHeader } from 'src/components/page-header/page-header';

import { SummaryCard } from '../cards/summary-card';
import { usePlReceivingApproval } from '../hooks/use-receiving-approval';

export function PlReceivingApprovalListView({ title = 'Blank', sx }) {
  const { stores, update } = usePlReceivingApproval();
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleUpdate = async (isEnable, type) => {
    try {
      setUpdateLoading(true);
      await update(isEnable, type);
    } catch (error) {
      console.log(error);
      toast.error(`Failed to update ${type}.`);
    } finally {
      setTimeout(() => {
        setUpdateLoading(false);
        toast.success(`${type} was successfully updated.`);
      }, 500);
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
      <SummaryCard stores={stores} onUpdate={handleUpdate} />
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
          label: 'Maitenance',
        },
        {
          label: 'PL Receiving Approval',
        },
      ]}
    />
  );

  const loader = () => (
    <Backdrop
      open={updateLoading}
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
        Update is in Progress ...
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
