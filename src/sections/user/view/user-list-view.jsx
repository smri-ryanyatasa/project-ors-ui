'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { Box, Stack, Button } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { UserTable } from '../table/user-table';
import { UserCreateMenu } from '../header/user-create-menu';
import { UserCreateDialog } from '../dialogs/user-create-dialog';
import { UserDeleteDialog } from '../dialogs/user-delete-dialog';

import { useUsers } from '../hooks/use-users';

// ----------------------------------------------------------------------

export function UserListView({ title = 'Blank', sx }) {
  const { getUsers, createUser, deleteUser } = useUsers();
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchUsers = async () => {
    const data = await getUsers();

    setUsers(
      data.map((user) => ({
        ...user,
        id: user.user_id,
      }))
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenDelete = async (user) => {
    setDeleteOpen(true);
    setSelectedUser(user);
  };

  const handleCreate = async (form) => {
    await createUser(form);
    toast.success('User created successfully');
    fetchUsers();
  };

  const handleDelete = async (user) => {
    await deleteUser(user);
    toast.success('User deleted successfully');
    setUsers((prev) => prev.filter((u) => u.user_id !== user.user_id));
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
      <UserTable users={users} onDelete={handleOpenDelete} />
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
          <UserCreateMenu onAddSingleUser={() => setCreateOpen(true)} />
        </Stack>
      }
    />
  );

  return (
    <>
      {renderPageHeader()}
      <DashboardContent maxWidth="xl">{renderContent()}</DashboardContent>
      <UserCreateDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
      />
      <UserDeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        user={selectedUser}
        onDelete={handleDelete}
      />
    </>
  );
}
