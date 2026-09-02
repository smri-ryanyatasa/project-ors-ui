import { saveAs } from 'file-saver';
import { useState, useEffect, useCallback } from 'react';

import ReceivingDecrepancyReport from 'src/services/receivingDecrepancyReport';

import { useAuthContext } from 'src/auth/hooks';

export function useReceivingDecrepancyReport() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [receivingPls, setPlsReceiving] = useState([]);
  const [status, setStatus] = useState([]);

  const [branch, setBranch] = useState();
  const [initialReceiptStartDate, setInitialReceiptStartDate] = useState();
  const [initialReceiptEndDate, setInitialReceiptEndDate] = useState();
  const [finalReceiptStartDate, setFinalReceiptStartDate] = useState();
  const [finalReceiptEndDate, setFinalReceiptEndDate] = useState();

  // Filter
  const [total, setTotal] = useState(0);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [filterModel, setFilterModel] = useState({ items: [], quickFilterValues: [] });
  const search = filterModel.quickFilterValues?.[0] || '';
  const [sortModel, setSortModel] = useState([{ field: 'material_code', sort: 'asc' }]);

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
        ReceivingDecrepancyReport.getPlsReport({
          page: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
          branch,
          initialReceiptStartDate,
          initialReceiptEndDate,
          finalReceiptStartDate,
          finalReceiptEndDate,
        }),
        ReceivingDecrepancyReport.getPlsStatus({
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
          branch,
          initialReceiptStartDate,
          initialReceiptEndDate,
          finalReceiptStartDate,
          finalReceiptEndDate,
        }),
      ]);

      setPlsReceiving(response);
      setStatus(count);
      setTotal(response?.[0]?.total_rows || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [
    user,
    paginationModel,
    search,
    filterModel,
    sortModel,
    branch,
    initialReceiptStartDate,
    initialReceiptEndDate,
    finalReceiptStartDate,
    finalReceiptEndDate,
  ]);

  const csvExport = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const blob = await ReceivingDecrepancyReport.csvExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
        branch,
        initialReceiptStartDate,
        initialReceiptEndDate,
        finalReceiptStartDate,
        finalReceiptEndDate,
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = `ReceivingDiscrepancy_${formatDate()}.csv`;

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

      const response = await ReceivingDecrepancyReport.excelExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
        branch,
        initialReceiptStartDate,
        initialReceiptEndDate,
        finalReceiptStartDate,
        finalReceiptEndDate,
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, `ReceivingDiscrepancy_${formatDate()}.xlsx`);
    } catch (error) {
      console.error('CSV export error:', error);
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
    receivingPls,
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
    setInitialReceiptStartDate,
    setInitialReceiptEndDate,
    setFinalReceiptStartDate,
    setFinalReceiptEndDate,
  };
}
