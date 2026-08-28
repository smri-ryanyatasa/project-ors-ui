import { saveAs } from 'file-saver';
import { useState, useEffect, useCallback } from 'react';

import InitialPlReceivingService from 'src/services/initialPlReceiving.service';

import { useAuthContext } from 'src/auth/hooks';

export function useInitialPLReceiving() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [pls, setPls] = useState([]);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState([]);
  const [zero, setZero] = useState(false);

  // Filter
  const [branch, setBranch] = useState();
  const [filename, setFilename] = useState();
  const [vendorCode, setVendorCode] = useState();
  const [siNumber, setSiNumber] = useState();

  const [total, setTotal] = useState(0);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [filterModel, setFilterModel] = useState({ items: [], quickFilterValues: [] });
  const search = filterModel.quickFilterValues?.[0] || '';
  const [sortModel, setSortModel] = useState([{ field: 'material_code', sort: 'desc' }]);

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

      const [response, count] = await Promise.all([
        InitialPlReceivingService.getPls({
          page: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
          branch: filename ? branch : null,
          filename: filename ? filename : undefined,
          vendor_code: vendorCode ? vendorCode : undefined,
          si_number: siNumber ? siNumber : undefined,
        }),
        InitialPlReceivingService.getPlsStatus({
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
          branch: filename ? branch : null,
          filename: filename ? filename : undefined,
          vendor_code: vendorCode ? vendorCode : undefined,
          si_number: siNumber ? siNumber : undefined,
        }),
      ]);

      setPls(response);
      setStatus(count);
      setTotal(response?.[0]?.total_rows || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [
    user,
    branch,
    filename,
    vendorCode,
    siNumber,
    paginationModel,
    search,
    filterModel,
    sortModel,
  ]);

  const csvExport = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const blob = await InitialPlReceivingService.csvExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
        branch: filename ? branch : null,
        filename: filename ? filename : undefined,
        vendor_code: vendorCode ? vendorCode : undefined,
        si_number: siNumber ? siNumber : undefined,
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = `InitialRec_${formatDate()}.csv`;

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

      const response = await InitialPlReceivingService.excelExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
        branch: filename ? branch : null,
        filename: filename ? filename : undefined,
        vendor_code: vendorCode ? vendorCode : undefined,
        si_number: siNumber ? siNumber : undefined,
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, `InitialRec_${formatDate()}.xlsx`);
    } finally {
      setLoading(false);
    }
  };

  const plsFiles = async (branch_code) => {
    try {
      const response = await InitialPlReceivingService.plsFiles({ branch_code });
      setFiles(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlsFiles = async (branch_code, type = 2) => {
    try {
      const response = await InitialPlReceivingService.getPlsFiles({
        branch_id: branch_code,
        env: user.env,
        type,
      });

      setFiles(response);
    } catch (error) {
      console.log(error);
    }
  };

  const rowsUpdate = async (row) => {
    try {
      setLoading(true);
      await InitialPlReceivingService.rowsUpdate(row);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const hasZero = async () => {
    const data = await InitialPlReceivingService.hasZero({
      search,
      filterModel: JSON.stringify(filterModel.items),
      sortModel: JSON.stringify(sortModel),
      env: user.env,
      branch: filename ? branch : null,
      filename: filename ? filename : undefined,
      vendor_code: vendorCode ? vendorCode : undefined,
      si_number: siNumber ? siNumber : undefined,
    });

    const hasPending = data.some((pl) => pl.status === 'Pending');

    const packingList = data.some((pl) => pl.actual_received === 0);
    setZero(packingList);

    // kulang pa ng computation for actual received
    return {
      hasPending,
      packingList: data,
    };
  };

  const toConfirm = async (row) => {
    try {
      setLoading(true);
      await InitialPlReceivingService.toConfirm(row);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date = new Date()) => {
    const pad = (value) => String(value).padStart(2, '0');

    const MM = pad(date.getMonth() + 1);
    const DD = pad(date.getDate());
    const YY = String(date.getFullYear()).slice(-2);

    const HH = pad(date.getHours());
    const MMN = pad(date.getMinutes());
    const SS = pad(date.getSeconds());

    return `${MM}${DD}${YY}_${HH}${MMN}${SS}`;
  };

  useEffect(() => {
    if (!user) return;

    refresh();
  }, [user, refresh]);

  return {
    refresh,
    loading,
    pls,
    status,
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
    plsFiles,
    getPlsFiles,
    files,
    setBranch,
    setFilename,
    setVendorCode,
    setSiNumber,
    rowsUpdate,
    hasZero,
    zero,
    toConfirm,
  };
}
