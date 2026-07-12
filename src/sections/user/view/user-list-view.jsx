'use client';

import { Box, Stack, Button } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { PageHeader } from 'src/components/page-header/page-header';
import { SvgColor } from 'src/components/svg-color';
import { UserTable } from '../table/user-table';
import { UserCreateMenu } from '../header/user-create-menu';

// ----------------------------------------------------------------------

export function UserListView({ title = 'Blank', description, sx }) {
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
      <UserTable />
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
          label: 'Maintenance',
        },
        {
          label: 'User Management',
        },
      ]}
      action={
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            sx={{ color: 'text.secondary' }}
            startIcon={<SvgColor src="/assets/icons/solar/solar--user-id-bold.svg" />}
            onClick={() => {
              // Import from MMS
            }}
          >
            Select Users from MMS
          </Button>
          <UserCreateMenu />
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
