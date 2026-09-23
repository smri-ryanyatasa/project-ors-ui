'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { Box, Stack, Button, Backdrop, Typography, CircularProgress } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { useRolePermissions } from 'src/sections/role-permissions/hooks/use-roles';

import { useUsers } from '../hooks/use-users';
import { UserTable } from '../table/user-table';
import { MMSUserDialog } from '../dialogs/mms-user-dialog';
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
    branches,
    refresh,
    createUser,
    bulkUpload,
    updateUser,
    changePassword,
    activityLog,
    deleteUser,
    loading,
    total,
    paginationModel,
    setPaginationModel,
    filterModel,
    handleFilterModelChange,
    sortModel,
    setSortModel,
    csvExport,
    excelExport,
    triggerMMSUser,
    getMMSUsers,
    createMmsUser,
  } = useUsers();
  const { roles } = useRolePermissions();
  const [selectedUser, setSelectedUser] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [activityLogOpen, setActivityLogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  const [triggerLoading, setTriggerLoading] = useState(false);
  const [mmsUserOpen, setMmsUserOpen] = useState(false);
  const [mmsUsers, setMmsUsers] = useState([]);

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
    try {
      await deleteUser(user);
      await refresh();
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete.');
    }
  };

  const handleUpdate = async (user) => {
    try {
      await updateUser(user);
      await refresh();
      toast.success('User updated successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update.');
    }
  };

  const handleChangePassword = async (user) => {
    await changePassword(user);
    toast.success('Change password successfully');
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
      toast.success('EXCEL file downloaded successfully.');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to download the file.');
    }
  };

  const handleSelectMMSUser = async () => {
    try {
      setTriggerLoading(true);
      await triggerMMSUser();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to trigger MMS user.');
    } finally {
      setTimeout(async () => {
        const res = await getMMSUsers();
        setMmsUsers(res);
        setTriggerLoading(false);
        setMmsUserOpen(true);
      }, 1000);
    }
  };

  const handleInsertMmsUser = async (selectedMmsUser) => {
    try {
      const response = await createMmsUser(selectedMmsUser);
      if (!response.data.success) {
        toast.error(response.data.message || 'Something went wrong.');
      }
      await refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to trigger MMS user.');
    } finally {
      setMmsUserOpen(false);
      toast.success('Users created successfully');
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
      <UserTable
        users={users}
        onDelete={handleOpenDelete}
        onUpdate={handleOpenEdit}
        onChangePassword={handleOpenChangePass}
        onActivityLog={handleOpenActivityLog}
        loading={loading}
        rowCount={total}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onCustomFilterModelChange={handleFilterModelChange}
        customFilterModel={filterModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        onDownloadCsv={handleCsvExport}
        onDownloadExcel={handleExcelExport}
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
            onClick={handleSelectMMSUser}
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
        Select MMS User is in Progress ...
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
      <UserCreateDialog
        open={createOpen}
        roles={roles}
        branches={branches}
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
        roles={roles}
        branches={branches}
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
      <MMSUserDialog
        open={mmsUserOpen}
        users={mmsUsers}
        onSave={handleInsertMmsUser}
        onClose={() => setMmsUserOpen(false)}
      />
    </>
  );
}
