import { saveAs } from 'file-saver';
import { useState, useEffect, useCallback } from 'react';

import PlUploadService from 'src/services/plUpload.service';

import { useAuthContext } from 'src/auth/hooks';

export function usePlUpload() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [plsUplaod, setPlsUplad] = useState([]);
  const [plsUplaodStatus, setPlsUpladStatus] = useState([]);

  // Filter
  const [selectedBranch, setSelectedBranch] = useState();
  const [total, setTotal] = useState(0);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [filterModel, setFilterModel] = useState({ items: [], quickFilterValues: [] });
  const search = filterModel.quickFilterValues?.[0] || '';
  const [sortModel, setSortModel] = useState([{ field: 'filename', sort: 'desc' }]);

  const handleFilterModelChange = useCallback((model) => {
    setFilterModel(model);

    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  }, []);

  const refresh = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const [response, status] = await Promise.all([
        PlUploadService.getPlsUpload({
          page: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
          branch: selectedBranch,
        }),
        PlUploadService.getPlsUploadStatus({
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
          branch: selectedBranch,
        }),
      ]);

      setPlsUplad(response);
      setTotal(response?.[0]?.total_rows || 0);
      setPlsUpladStatus(status);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, selectedBranch, paginationModel, search, filterModel, sortModel]);

  const getUserBranches = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const response = await PlUploadService.getUserBranch({
        user_id: user.user_id,
      });

      setBranches(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const csvExport = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const blob = await PlUploadService.csvExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
        branch: selectedBranch,
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = 'pl_upload.csv';

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
    if (!user) return;

    try {
      setLoading(true);

      const response = await PlUploadService.excelExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
        branch: selectedBranch,
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, 'pl_upload.xlsx');
    } catch (error) {
      console.error('CSV export error:', error);
    } finally {
      setLoading(false);
    }
  };

  const plLogs = async (file) => {
    if (!user) return null;

    return await PlUploadService.getPlLogs({
      env: user.env,
      filename: file.filename,
    });
  };

  const plUploadExceptions = async (file) => {
    if (!user) return;

    try {
      setLoading(true);

      const response = await PlUploadService.getPlUploadExceptions({
        env: user.env,
        filename: file.filename,
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, 'pl_upload_exceptions.xlsx');
    } catch (error) {
      console.error('Logs error:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePlFile = async (file) => {
    await PlUploadService.deletePlFile(file);
    setPlsUplad((prev) => prev.filter((p) => p.id !== file.id));
  };

  useEffect(() => {
    if (!user) return;

    refresh();
    getUserBranches();
  }, [user, refresh, getUserBranches]);

  return {
    refresh,
    loading,
    plsUplaod,
    branches,
    setSelectedBranch,
    plsUplaodStatus,
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
    plLogs,
    plUploadExceptions,
    deletePlFile,
  };
}
