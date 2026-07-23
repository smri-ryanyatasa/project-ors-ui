import { saveAs } from 'file-saver';
import { useState, useEffect, useCallback } from 'react';

import UserService from 'src/services/user.service';

import { useAuthContext } from 'src/auth/hooks';

export function useUsers() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Pagination state
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  // Filter state (Column)
  const [filterModel, setFilterModel] = useState({ items: [], quickFilterValues: [] });

  // Search input
  const search = filterModel.quickFilterValues?.[0] || '';

  // Sorting
  const [sortModel, setSortModel] = useState([{ field: 'user_name', sort: 'asc' }]);

  const handleFilterModelChange = useCallback((model) => {
    setFilterModel(model);

    // Go back to first page when filter changes
    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  }, []);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const response = await UserService.getUsers({
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
      });

      setUsers(response.data);
      setTotal(response.total);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, search, filterModel, sortModel]);

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
    const rows = userData.map((row) => ({
      user_name: row['User ID'],
      email_address: row['Email Address'],
      full_name: row['Full Name'],
      position: row['Position'],
      mms: row['From MMS'],
      branches: row['Branch Details'],
      status: row['Status'],
      role: row['Role'],
      created_by: user.user_id,
    }));

    return await UserService.bulkUpload(rows);
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

  const csvExport = async () => {
    try {
      setLoading(true);

      const blob = await UserService.csvExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = 'users.csv';

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('CSV export error:', error);
    } finally {
      setLoading(false);
    }
  };

  const excelExport = async () => {
    try {
      setLoading(true);

      const response = await UserService.excelExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, 'users.xlsx');
    } catch (error) {
      console.error('CSV export error:', error);
    } finally {
      setLoading(false);
    }
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
    loading,
    total,
    paginationModel,
    setPaginationModel,
    filterModel,
    setFilterModel,
    handleFilterModelChange,
    sortModel,
    setSortModel,
    csvExport,
    excelExport,
  };
}
