import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class MenuService {
  async getMenus() {
    const { data } = await axios.get(endpoints.rolePermission.getMenus);
    return data;
  }
}

export default new MenuService();
