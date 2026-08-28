import { saveAs } from 'file-saver';
import { useState, useEffect, useCallback } from 'react';

import FinalPlReceivingService from 'src/services/finalPlReceiving.service';

import { useAuthContext } from 'src/auth/hooks';

export function useFinalPLReceiving() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [pls, setPls] = useState([]);
  const [status, setStatus] = useState([]);

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
        FinalPlReceivingService.getPls({
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
        FinalPlReceivingService.getPlsStatus({
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

      const blob = await FinalPlReceivingService.csvExport({
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
      link.download = `FinalRec_${formatDate()}.csv`;

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

      const response = await FinalPlReceivingService.excelExport({
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

      saveAs(blob, `FinalRec_${formatDate()}.xlsx`);
    } finally {
      setLoading(false);
    }
  };

  const rowsUpdate = async (rows) => {
    const values = Object.values(rows).map(({ pl_id, initial_qty, final_qty, source_file_id }) => ({
      pl_id,
      initial_qty,
      final_qty,
      source_file_id,
    }));

    const result = await FinalPlReceivingService.rowsUpdate(values);
    return result;
  };

  const toApproved = async () => {
    const result = await FinalPlReceivingService.toApproved({
      search,
      filterModel: JSON.stringify(filterModel.items),
      sortModel: JSON.stringify(sortModel),
      env: user.env,
      branch: filename ? branch : null,
      filename: filename ? filename : undefined,
      vendor_code: vendorCode ? vendorCode : undefined,
      si_number: siNumber ? siNumber : undefined,
    });

    return result;
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
    setBranch,
    setFilename,
    setVendorCode,
    setSiNumber,
    rowsUpdate,
    toApproved,
  };
}
