import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class WorkspaceService {
  async updateCurrentEnv(payload) {
    const { data } = await axios.post(endpoints.user.updateCurrentEnv, payload);
    return data;
  }
}

export default new WorkspaceService();
