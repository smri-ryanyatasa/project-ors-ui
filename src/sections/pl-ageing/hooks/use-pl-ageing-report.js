import { saveAs } from 'file-saver';
import { useState, useEffect, useCallback } from 'react';

import PlAgeingReportService from 'src/services/plAgeingReport.service';

import { useAuthContext } from 'src/auth/hooks';

export function usePlAgeingReport() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [pls, setPls] = useState([]);
  const [status, setStatus] = useState([]);

  const [uploadedStarDate, setUploadedStarDate] = useState();
  const [uploadedEndDate, setUploadedEndDate] = useState();
  const [approvedReceiptStartDate, setApprovedReceiptStartDate] = useState();
  const [approvedReceiptEndDate, setApprovedReceiptEndDate] = useState();
  const [initialReceiptStartDate, setInitialReceiptStartDate] = useState();
  const [initialReceiptEndDate, setInitialReceiptEndDate] = useState();
  const [poGeneratedStartDate, setPoGeneratedStartDate] = useState();
  const [poGeneratedEndDate, setPoGeneratedEndDate] = useState();

  // Filter
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

      const [response, count] = await Promise.all([
        PlAgeingReportService.getPlsReport({
          page: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
          uploadedStartDate: uploadedStarDate,
          uploadedEndDate,
          initialStartDate: initialReceiptStartDate,
          initialEndDate: initialReceiptEndDate,
          approveReceiptStartDate: approvedReceiptStartDate,
          approveReceiptEndDate: approvedReceiptEndDate,
          poGeneratedStartDate,
          poGeneratedEndDate,
        }),
        PlAgeingReportService.getPlsStatus({
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
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
    paginationModel,
    search,
    filterModel,
    sortModel,
    uploadedStarDate,
    uploadedEndDate,
    approvedReceiptStartDate,
    approvedReceiptEndDate,
    initialReceiptStartDate,
    initialReceiptEndDate,
    poGeneratedStartDate,
    poGeneratedEndDate,
  ]);

  const csvExport = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const blob = await PlAgeingReportService.csvExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
        uploadedStartDate: uploadedStarDate,
        uploadedEndDate,
        initialStartDate: initialReceiptStartDate,
        initialEndDate: initialReceiptEndDate,
        approveReceiptStartDate: approvedReceiptStartDate,
        approveReceiptEndDate: approvedReceiptEndDate,
        poGeneratedStartDate,
        poGeneratedEndDate,
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = `PLAgeingReport_${formatDate()}.csv`;

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

      const response = await PlAgeingReportService.excelExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
        uploadedStartDate: uploadedStarDate,
        uploadedEndDate,
        initialStartDate: initialReceiptStartDate,
        initialEndDate: initialReceiptEndDate,
        approveReceiptStartDate: approvedReceiptStartDate,
        approveReceiptEndDate: approvedReceiptEndDate,
        poGeneratedStartDate,
        poGeneratedEndDate,
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, `PLAgeingReport_${formatDate()}.xlsx`);
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
    setUploadedStarDate,
    setUploadedEndDate,
    setApprovedReceiptStartDate,
    setApprovedReceiptEndDate,
    setInitialReceiptStartDate,
    setInitialReceiptEndDate,
    setPoGeneratedStartDate,
    setPoGeneratedEndDate,
  };
}
