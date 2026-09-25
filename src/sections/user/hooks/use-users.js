import { saveAs } from 'file-saver';
import { useState, useEffect, useCallback } from 'react';

import UserService from 'src/services/user.service';
import MMSMasterfileService from 'src/services/mms-masterfile.service';

import { useAuthContext } from 'src/auth/hooks';

export function useUsers() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Pagination state
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // Filter state (Column)
  const [filterModel, setFilterModel] = useState({ items: [], quickFilterValues: [] });

  // Custo Multiple Filter
  const [customFilterModel, setCustomFilterModel] = useState({ items: [] });

  // Search input
  const search = filterModel.quickFilterValues?.[0] || '';

  // Sorting
  const [sortModel, setSortModel] = useState([]);

  const handleFilterModelChange = useCallback((model) => {
    setFilterModel(model);

    // Go back to first page when filter changes
    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  }, []);

  const handleCustomFilterModelChange = useCallback((model) => {
    setCustomFilterModel(model);

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
        filterModel: JSON.stringify(customFilterModel.items),
        sortModel: JSON.stringify(sortModel),
      });

      setUsers(response.data);
      setTotal(response.total);
    } finally {
      setLoading(false);
    }
  }, [paginationModel, search, sortModel, customFilterModel]);

  const createUser = async (form) => {
    const payload = {
      ...form,
      mms: 'N',
      branches: form.branches
        .map((branch) => branch.trim())
        .join(', ')
        .trim(),
      env: form.env
        .map((env) => env.trim())
        .join(', ')
        .trim(),
      status: form.status == 'Active' ? 'Y' : 'N',
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

    const payload = {
      rows,
      env: user.env,
    };

    return await UserService.bulkUpload(payload);
  };

  const updateUser = async (userData) => {
    const payload = {
      ...userData,
      branches: userData.branches
        .map((branch) => branch.trim())
        .join(', ')
        .trim(),
      env: userData.env
        .map((env) => env.trim())
        .join(', ')
        .trim(),
      status: userData.status == 'Active' ? 'Y' : 'N',
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
        filterModel: JSON.stringify(customFilterModel.items),
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
    } finally {
      setLoading(false);
    }
  };

  const excelExport = async () => {
    try {
      setLoading(true);

      const response = await UserService.excelExport({
        search,
        filterModel: JSON.stringify(customFilterModel.items),
        sortModel: JSON.stringify(sortModel),
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, 'users.xlsx');
    } finally {
      setLoading(false);
    }
  };

  const getBranches = useCallback(async () => {
    try {
      const response = await UserService.getBranches();
      setBranches(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const triggerMMSUser = async () => {
    await MMSMasterfileService.triggerBranchInterface({
      sourceTable: 'stg_mms_users',
      targetTable: 'mms_users',
    });
  };

  const getMMSUsers = async () => {
    const response = await UserService.getMMSUsers();
    return response;
  };

  const createMmsUser = async (mmsUsers) => {
    const response = await UserService.creteMmsUser(mmsUsers);
    return response;
  };

  const saveFilter = async (filter) => {
    const response = await UserService.saveFilter(filter);
    return response;
  };

  const getSaveFilter = async (gridKey) => {
    const response = await UserService.getSaveFilter({ gridKey });
    return response;
  };

  const deleteSaveFilter = async (filter) => {
    const response = await UserService.deleteSaveFilter(filter);
    return response;
  };

  const updateSaveFilter = async (filter) => {
    const response = await UserService.updateSaveFilter(filter);
    return response;
  };

  useEffect(() => {
    refresh();
    getBranches();
  }, [refresh, getBranches]);

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
    branches,
    triggerMMSUser,
    getMMSUsers,
    createMmsUser,
    customFilterModel,
    setCustomFilterModel,
    handleCustomFilterModelChange,
    saveFilter,
    getSaveFilter,
    deleteSaveFilter,
    updateSaveFilter,
  };
}
