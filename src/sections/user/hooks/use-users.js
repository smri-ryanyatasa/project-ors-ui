import { useState, useEffect, useCallback } from 'react';

import UserService from 'src/services/user.service';

import { useAuthContext } from 'src/auth/hooks';

export function useUsers() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  const refresh = useCallback(async () => {
    const data = await UserService.getUsers();
    setUsers(data);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createUser = async (form) => {
    const payload = {
      ...form,
      mms: 'Y',
      created_by: user.user_id,
    };

    return await UserService.createUser(payload);
  };

  const bulkUpload = async (userData) => {
    const payload = userData;

    return await UserService.bulkUpload(payload);
  };

  const updateUser = async (userData) => {
    const payload = {
      ...userData,
      last_update_by: user.user_id,
    };

    await UserService.updateUser(payload);
  };

  const changePassword = async (userData) => {
    const payload = {
      ...userData,
      last_update_by: user.user_id,
    };

    await UserService.changePassword(payload);
  };

  const activityLog = async (userData) => {
    const payload = {
      ...userData,
    };

    return await UserService.activityLog(payload);
  };

  const deleteUser = async (userData) => {
    await UserService.deleteUser(userData);
    setUsers((prev) => prev.filter((u) => u.user_id !== userData.user_id));
  };

  return {
    users,
    refresh,
    createUser,
    bulkUpload,
    updateUser,
    changePassword,
    activityLog,
    deleteUser,
  };
}
