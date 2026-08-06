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
      const response = await PlUploadService.getPlUploadExceptions({
        env: user.env,
        filename: file.filename,
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, 'pl_upload_exceptions.xls');
    } catch (error) {
      console.error('Logs error:', error);
    }
  };

  const deletePlFile = async (file) => {
    await PlUploadService.deletePlFile(file);
    setPlsUplad((prev) => prev.filter((p) => p.id !== file.id));
  };

  const plUpload = async (file) => {
    const rows = file.rows.map((row) => ({
      document_no: row['DD No'],
      sales_invoice_no: row['SI'],
      ship_to_code: row['Ship To Code'],
      consignee: row['Consignee'],
      uom: row['UOM'],
      material: row['Material'],
      size: row['Size No'],
      description: row['Description'],
      served_qty: row['Served Qty'],
      carton_qty: row['Carton Qty'],
      branch_code: row['Branch'],
      vendor_code: row['Vendor'],
    }));

    const filenameParts = file.file.name.replace(/\.[^/.]+$/, '').split('_');

    const cleanData = {
      rows,
      row_count: rows.length,
      vendor_code: filenameParts[0],
      branch_code: filenameParts[2],
      sales_invoice_no: filenameParts[1],
      filename: file.file.name,
      file_size: file.file.size,
      uploaded_by: user.user_id,
      created_by: user.user_id,
      env: user.env,
    };

    return await PlUploadService.plUpload(cleanData);
  };

  const plReUpload = async (file) => {
    const rows = file.rows.map((row) => ({
      document_no: row['DD No'],
      sales_invoice_no: row['SI'],
      ship_to_code: row['Ship To Code'],
      consignee: row['Consignee'],
      uom: row['UOM'],
      material: row['Material'],
      size: row['Size No'],
      description: row['Description'],
      served_qty: row['Served Qty'],
      carton_qty: row['Carton Qty'],
      branch_code: row['Branch'],
      vendor_code: row['Vendor'],
    }));

    const filenameParts = file.file.name.replace(/\.[^/.]+$/, '').split('_');

    const cleanData = {
      rows,
      row_count: rows.length,
      vendor_code: filenameParts[0],
      branch_code: filenameParts[2],
      sales_invoice_no: filenameParts[1],
      filename: file.file.name,
      file_size: file.file.size,
      uploaded_by: user.user_id,
      created_by: user.user_id,
      env: user.env,
      source_file_id: file.pl.id,
      uploaded_attempts: file.pl.upload_attempts + 1,
    };

    return await PlUploadService.plReUpload(cleanData);
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
    plUpload,
    plReUpload,
  };
}
