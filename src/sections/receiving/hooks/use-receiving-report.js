import { saveAs } from 'file-saver';
import { useState, useEffect, useCallback } from 'react';

import ReceivingReportService from 'src/services/receivingReport.service';

import { useAuthContext } from 'src/auth/hooks';

export function useReceivingReport() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [receivingPls, setPlsReceiving] = useState([]);
  const [status, setStatus] = useState([]);

  const [approvedReceiptStartDate, setApprovedReceiptStartDate] = useState();
  const [approvedReceiptEndDate, setApprovedReceiptEndDate] = useState();
  const [initialReceiptStartDate, setInitialReceiptStartDate] = useState();
  const [initialReceiptEndDate, setInitialReceiptEndDate] = useState();

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

      const [response] = await Promise.all([
        ReceivingReportService.getPlsReport({
          page: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
        }),
        // ReceivingReportService.getPlsStatus({
        //   search,
        //   filterModel: JSON.stringify(filterModel.items),
        //   sortModel: JSON.stringify(sortModel),
        //   env: user.env,
        // }),
      ]);

      setPlsReceiving(response);
      //   setStatus(count);
      setTotal(response?.[0]?.total_rows || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, paginationModel, search, filterModel, sortModel]);

  const csvExport = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const blob = await ReceivingReportService.csvExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = `Receiving_${formatDate()}.csv`;

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

      const response = await ReceivingReportService.excelExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, `Receiving_${formatDate()}.xlsx`);
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
    setApprovedReceiptStartDate,
    setApprovedReceiptEndDate,
    setInitialReceiptStartDate,
    setInitialReceiptEndDate,
  };
}
