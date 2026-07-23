import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class RolePermissionsService {
  async getRoles() {
    const { data } = await axios.get(endpoints.rolePermission.list);
    return data;
  }

  async createRole(payload) {
    const { data } = await axios.post(endpoints.rolePermission.create, payload);
    return data;
  }

  async updateRole(payload) {
    const { data } = await axios.put(endpoints.rolePermission.update(payload.id), payload);
    return data;
  }

  async deleteRole(payload) {
    const { data } = await axios.delete(endpoints.rolePermission.delete(payload.id));
    return data;
  }

  async getMenus() {
    const { data } = await axios.get(endpoints.rolePermission.getMenus);
    return data;
  }
}

export default new RolePermissionsService();
