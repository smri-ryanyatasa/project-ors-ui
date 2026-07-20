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
}

export default new UserService();
