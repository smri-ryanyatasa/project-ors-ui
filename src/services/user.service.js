import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class UserService {
  async getUsers(params) {
    const { data } = await axios.get(endpoints.user.list, {
      params,
    });
    return data;
  }

  async createUser(payload) {
    const { data } = await axios.post(endpoints.user.create, payload);
    return data;
  }

  async bulkUpload(payload) {
    const { data } = await axios.post(endpoints.user.bulkUpload, payload);
    console.log(data);
    return data;
  }

  async updateUser(payload) {
    const { data } = await axios.put(endpoints.user.update(payload.user_id), payload);
    return data;
  }

  async changePassword(payload) {
    const { data } = await axios.patch(endpoints.user.changePassword(payload.user_id), payload);
    return data;
  }

  async activityLog(payload) {
    const { data } = await axios.get(endpoints.user.activityLog(payload.user_id));
    return data;
  }

  async deleteUser(payload) {
    const { data } = await axios.delete(endpoints.user.delete(payload.user_id));
    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.user.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.user.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async getBranches() {
    const { data } = await axios.get(endpoints.user.branches);
    return data;
  }

  async getMMSUsers() {
    const { data } = await axios.get(endpoints.user.mmsUsers);
    return data;
  }

  async creteMmsUser(payload) {
    const { data } = await axios.post(endpoints.user.createMmsUser, payload);
    return data;
  }

  async saveFilter(payload) {
    const { data } = await axios.post(endpoints.user.saveFilter, payload);
    return data;
  }

  async getSaveFilter(params) {
    const { data } = await axios.get(endpoints.user.saveFilter, {
      params,
    });
    return data;
  }

  async deleteSaveFilter(params) {
    const { data } = await axios.delete(endpoints.user.deleteSaveFilter(params));
    return data;
  }

  async updateSaveFilter(payload) {
    const { data } = await axios.put(endpoints.user.updateSaveFilter(payload.id), payload);
    return data;
  }
}

export default new UserService();
