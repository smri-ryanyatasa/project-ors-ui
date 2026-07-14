import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class UserService {
  async getUsers() {
    const { data } = await axios.get(endpoints.user.list);
    return data;
  }

  async createUser(payload) {
    const { data } = await axios.post(endpoints.user.create, payload);
    return;
    data;
  }

  async updateUser(payload) {
    const { data } = await axios.put(endpoints.user.update(payload.user_id), payload);
    return data;
  }

  async deleteUser(payload) {
    const { data } = await axios.delete(endpoints.user.delete(payload.user_id));
    return data;
  }
}

export default new UserService();
