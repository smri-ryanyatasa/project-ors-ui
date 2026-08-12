import { saveAs } from 'file-saver';
import { useState, useEffect, useCallback } from 'react';

import ItemService from 'src/services/item.service';

import { useAuthContext } from 'src/auth/hooks';

export function useItem() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  // Filter
  const [total, setTotal] = useState(0);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [filterModel, setFilterModel] = useState({ items: [], quickFilterValues: [] });
  const search = filterModel.quickFilterValues?.[0] || '';
  const [sortModel, setSortModel] = useState([{ field: 'style_code', sort: 'desc' }]);

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
        ItemService.getItems({
          page: paginationModel.page + 1,
          pageSize: paginationModel.pageSize,
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
        }),
      ]);

      setItems(response.data);
      setTotal(response.total);
      //   setItems(response);
      //   setTotal(response?.[0]?.total_rows || 0);
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

      const blob = await ItemService.csvExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;
      link.download = 'item_masterfile.csv';

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

      const response = await ItemService.excelExport({
        search,
        filterModel: JSON.stringify(filterModel.items),
        sortModel: JSON.stringify(sortModel),
        env: user.env,
      });

      const blob = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      saveAs(blob, 'item_masterfile.xlsx');
    } catch (error) {
      console.error('EXCEL export error:', error);
    } finally {
      setLoading(false);
    }
  };

  const itemRowsUpdate = async (rows) => {
    try {
      setLoading(true);

      const values = Object.values(rows).map(({ id, alt_vendor_code, alt_vendor_name }) => ({
        id,
        alt_vendor_code,
        alt_vendor_name,
      }));

      await ItemService.updateRows(values);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    refresh();
  }, [user, refresh]);

  return {
    refresh,
    loading,
    items,
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
    itemRowsUpdate,
  };
}
