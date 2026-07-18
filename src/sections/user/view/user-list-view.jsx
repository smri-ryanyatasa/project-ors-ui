'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { Box, Stack, Button } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { useUsers } from '../hooks/use-users';
import { UserTable } from '../table/user-table';
import { UserCreateMenu } from '../header/user-create-menu';
import { UserEditDialog } from '../dialogs/user-edit-dialog';
import { UserCreateDialog } from '../dialogs/user-create-dialog';
import { UserDeleteDialog } from '../dialogs/user-delete-dialog';
import { UserBulkUploadDialog } from '../dialogs/user-bulk-upload-dialog';
import { UserActivityLogsDialog } from '../dialogs/user-activity-log-dialog';
import { UserChangePassowordDialog } from '../dialogs/user-change-password-dialog';

// ----------------------------------------------------------------------

export function UserListView({ title = 'Blank', sx }) {
  const {
    users,
    refresh,
    createUser,
    bulkUpload,
    updateUser,
    changePassword,
    activityLog,
    deleteUser,
  } = useUsers();
  const [selectedUser, setSelectedUser] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [activityLogOpen, setActivityLogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  const handleOpenEdit = async (user) => {
    setEditOpen(true);
    setSelectedUser(user);
  };

  const handleOpenChangePass = async (user) => {
    setChangePassOpen(true);
    setSelectedUser(user);
  };

  const handleOpenActivityLog = async (user) => {
    setActivityLogOpen(true);
    setSelectedUser(user);

    const getLogs = await activityLog(user);
    setLogs(getLogs);
  };

  const handleOpenDelete = async (user) => {
    setDeleteOpen(true);
    setSelectedUser(user);
  };

  const handleCreate = async (form) => {
    await createUser(form);
    await refresh();
    toast.success('User created successfully');
  };

  const handleImport = async (new_users) => {
    await bulkUpload(new_users);
    await refresh();
    toast.success('Users created successfully');
  };

  const handleDelete = async (user) => {
    await deleteUser(user);
    toast.success('User deleted successfully');
  };

  const handleUpdate = async (user) => {
    await updateUser(user);
    await refresh();
    toast.success('User updated successfully');
  };

  const handleChangePassword = async (user) => {
    await changePassword(user);
    console.log(user);
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
      <UserTable
        users={users}
        onDelete={handleOpenDelete}
        onUpdate={handleOpenEdit}
        onChangePassword={handleOpenChangePass}
        onActivityLog={handleOpenActivityLog}
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
            startIcon={
              <SvgColor
                src="/assets/icons/solar/solar--user-id-bold.svg"
                sx={{ width: 20, height: 20 }}
              />
            }
            onClick={() => {
              // Import from MMS
            }}
          >
            Select Users from MMS
          </Button>
          <UserCreateMenu
            onAddSingleUser={() => setCreateOpen(true)}
            onBulkUpload={() => setBulkUploadOpen(true)}
          />
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
      <UserBulkUploadDialog
        open={bulkUploadOpen}
        onClose={() => setBulkUploadOpen(false)}
        onImport={handleImport}
      />
      <UserEditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={selectedUser}
        onSave={handleUpdate}
      />
      <UserChangePassowordDialog
        open={changePassOpen}
        user={selectedUser}
        onClose={() => setChangePassOpen(false)}
        onSave={handleChangePassword}
      />
      <UserActivityLogsDialog
        open={activityLogOpen}
        user={selectedUser}
        logs={logs}
        onClose={() => setActivityLogOpen(false)}
      />
      <UserDeleteDialog
        open={deleteOpen}
        user={selectedUser}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
