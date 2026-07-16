import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class UserService {
  async getUsers() {
    const { data } = await axios.get(endpoints.user.list);
    return data;
  }

  async createUser(payload) {
    const { data } = await axios.post(endpoints.user.create, payload);
    return data;
  }

  async bulkUpload(payload) {
    const rows = payload.map((row) => ({
      user_name: row['User ID'],
      email_address: row['Email Address'],
      full_name: row['Full Name'],
      position: row['Position'],
      from_mms: row['From MMS'],
      branches: row['Branch Details'],
      user_status: row['Status'],
      role: row['Role'],
    }));

    const { data } = await axios.post(endpoints.user.bulkUpload, rows);
    return data;
  }

  async updateUser(payload) {
    const { data } = await axios.put(endpoints.user.update(payload.user_id), payload);
    return data;
  }

  async changePassword(payload) {
    const { data } = await axios.put(endpoints.user.changePassword(payload.user_id), payload);
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
}

export default new UserService();
