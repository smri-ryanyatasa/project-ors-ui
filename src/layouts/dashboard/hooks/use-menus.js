import { useState, useEffect, useCallback } from 'react';

import MenuService from 'src/services/menu.service';

export function useMenus() {
  const [menus, setMenus] = useState([]);

  const getMenus = useCallback(async () => {
    try {
      const response = await MenuService.getMenus();

      setMenus(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  return {
    menus,
  };
}
