import { saveAs } from 'file-saver';
import { useState, useEffect, useCallback } from 'react';

import UserService from 'src/services/user.service';
import BranchService from 'src/services/branch.service';
import MMSMasterfileService from 'src/services/mms-masterfile.service';

import { useAuthContext } from 'src/auth/hooks';

export function useBranch() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);

  // Filter
  const [total, setTotal] = useState(0);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [filterModel, setFilterModel] = useState({ items: [], quickFilterValues: [] });
  const [customFilterModel, setCustomFilterModel] = useState({ items: [] });
  const search = filterModel.quickFilterValues?.[0] || '';
  const [sortModel, setSortModel] = useState([{ field: 'branch_code', sort: 'desc' }]);

  const handleFilterModelChange = useCallback((model) => {
    setFilterModel(model);

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
    if (!user) return;

    try {
      setLoading(true);

      const [response] = await Promise.all([
        BranchService.getBranches({
          page: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
          search,
          filterModel: JSON.stringify(customFilterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
        }),
      ]);

      setBranches(response);
      setTotal(response?.[0]?.total_rows || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, paginationModel, search, sortModel, customFilterModel]);

  const csvExport = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const blob = await BranchService.csvExport({
        search,
        filterModel: JSON.stringify(customFilterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = 'branch_masterfile.csv';

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  const excelExport = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const response = await BranchService.excelExport({
        search,
        filterModel: JSON.stringify(customFilterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, 'branch_masterfile.xlsx');
    } finally {
      setLoading(false);
    }
  };

  const triggerBranchInterface = async () => {
    await MMSMasterfileService.triggerBranchInterface({
      sourceTable: 'stg_branch',
      targetTable: 'branch',
    });
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
    if (!user) return;

    refresh();
  }, [user, refresh]);

  return {
    refresh,
    loading,
    branches,
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
    triggerBranchInterface,
    customFilterModel,
    setCustomFilterModel,
    handleCustomFilterModelChange,
    saveFilter,
    getSaveFilter,
    deleteSaveFilter,
    updateSaveFilter,
  };
}
