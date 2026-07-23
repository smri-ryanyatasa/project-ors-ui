'use client';

import { toast } from 'sonner';
import { useState } from 'react';

import { Box, Stack, Button } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { SvgColor } from 'src/components/svg-color';
import { PageHeader } from 'src/components/page-header/page-header';

import { RoleTable } from '../table/role-table';
import { useRolePermissions } from '../hooks/use-roles';
import { RoleEditDialog } from '../dialogs/role-edit-dialog';
import { RoleCreateDialog } from '../dialogs/role-create-dialog';
import { RoleDeleteDialog } from '../dialogs/role-delete-dialog';

export function RoleListView({ title = 'Blank', sx }) {
  const { roles, refresh, createRole, updateRole, deleteRole, menus } = useRolePermissions();
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState([]);

  const handleOpenEdit = async (role) => {
    setEditOpen(true);
    setSelectedRole(role);
  };

  const handleOpenDelete = async (role) => {
    setDeleteOpen(true);
    setSelectedRole(role);
  };

  const handleCreate = async (form) => {
    await createRole(form);
    await refresh();
    toast.success('Role created successfully');
  };

  const handleUpdate = async (form) => {
    await updateRole(form);
    await refresh();
    toast.success('Role updated successfully');
  };

  const handleDelete = async (form) => {
    await deleteRole(form);
    // await refresh();
    // toast.success('Role deleted successfully');
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
      <RoleTable roles={roles} onUpdate={handleOpenEdit} onDelete={handleOpenDelete} />
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
          label: 'Role Permissions',
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
            onClick={() => setCreateOpen(true)}
          >
            Add New Role
          </Button>
        </Stack>
      }
    />
  );

  return (
    <>
      {renderPageHeader()}
      <DashboardContent maxWidth="xl">{renderContent()}</DashboardContent>
      <RoleCreateDialog
        open={createOpen}
        menus={menus}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
      />
      <RoleEditDialog
        open={editOpen}
        role={selectedRole}
        menus={menus}
        onClose={() => setEditOpen(false)}
        onSave={handleUpdate}
      />
      <RoleDeleteDialog
        open={deleteOpen}
        role={selectedRole}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
