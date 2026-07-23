import { useState, useEffect, useCallback, use } from 'react';

import RolePermissionsService from 'src/services/rolePermissions.service';

import { useAuthContext } from 'src/auth/hooks';

export function useRolePermissions() {
  const { user } = useAuthContext();
  const [roles, setRoles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const response = await RolePermissionsService.getRoles();

      setRoles(response);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRole = async (form) => {
    const payload = {
      ...form,
      created_by: user.user_id,
    };

    return await RolePermissionsService.createRole(payload);
  };

  const updateRole = async (form) => {
    const payload = {
      ...form,
      last_update_by: user.user_id,
    };

    return await RolePermissionsService.updateRole(payload);
  };

  const deleteRole = async (form) => {
    await RolePermissionsService.deleteRole(form);
    setRoles((prev) => prev.filter((u) => u.id !== form.id));
  };

  const getMenus = useCallback(async () => {
    try {
      const response = await RolePermissionsService.getMenus();

      setMenus(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    refresh();
    getMenus();
  }, [refresh, getMenus]);

  return {
    roles,
    refresh,
    loading,
    createRole,
    updateRole,
    deleteRole,
    menus,
  };
}
