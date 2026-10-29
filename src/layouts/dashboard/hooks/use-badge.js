import { useState, useEffect, useCallback } from 'react';

import POLogsService from 'src/services/poLogs.service';
import PlUploadService from 'src/services/plUpload.service';

import { useAuthContext } from 'src/auth/hooks';

export function useBadge() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [plsUplaodStatus, setPlsUpladStatus] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState();
  const [filterModel, setFilterModel] = useState({ items: [], quickFilterValues: [] });
  const [customFilterModel, setCustomFilterModel] = useState({ items: [] });
  const search = filterModel.quickFilterValues?.[0] || '';
  const [sortModel, setSortModel] = useState([{ field: 'filename', sort: 'desc' }]);
  const [status, setStatus] = useState([]);

  const refresh = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const [plstatus, postatus] = await Promise.all([
        PlUploadService.getPlsUploadStatus({
          search,
          filterModel: JSON.stringify(customFilterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
          branch: selectedBranch,
        }),
        POLogsService.getPlsStatus({
          search,
          filterModel: JSON.stringify(filterModel.items),
          sortModel: JSON.stringify(sortModel),
          env: user.env,
        }),
      ]);

      setPlsUpladStatus(plstatus);
      setStatus(postatus);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, selectedBranch, search, customFilterModel, sortModel, filterModel]);

  useEffect(() => {
    if (!user) return;

    refresh();
  }, [user, refresh]);

  return {
    loading,
    plsUplaodStatus,
    status,
    setSelectedBranch,
    setFilterModel,
    setCustomFilterModel,
    setSortModel,
  };
}
