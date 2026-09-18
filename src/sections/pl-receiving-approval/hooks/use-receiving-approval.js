import { useState, useEffect, useCallback } from 'react';

import PlReceivingApprovalService from 'src/services/plReceivingApproval.service';

import { useAuthContext } from 'src/auth/hooks';

export function usePlReceivingApproval() {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);

  const refresh = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const response = await PlReceivingApprovalService.getStores();

      setStores(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    refresh();
  }, [user, refresh]);

  const update = async (isEnable, type) => {
    const result = await PlReceivingApprovalService.update({ isEnable, type });
    return result;
  };

  return {
    refresh,
    loading,
    stores,
    update,
  };
}
