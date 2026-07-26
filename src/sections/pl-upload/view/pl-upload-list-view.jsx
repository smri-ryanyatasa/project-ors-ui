'use client';

import { Box, Grid, Stack, Button } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { PlUploadFilter } from './pl-upload-filter';
import { PlUploadTable } from '../table/pl-upload-table';
import { FileUploadedCard } from '../cards/file-upload-card';
import { FileRejectedCard } from '../cards/file-rejected-card';

export function PlUploadListView({ title = 'Blank', sx }) {
  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 3,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <PlUploadFilter />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <FileRejectedCard />
        <FileUploadedCard />
      </Grid>
      <PlUploadTable />
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
    </>
  );
}
