import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class PlReceivingApprovalService {
  async getStores() {
    const { data } = await axios.get(endpoints.plReceivingApproval.list);
    return data;
  }

  async update(payload) {
    const { data } = await axios.put(endpoints.plReceivingApproval.list, payload);
    console.log(data);
    return data;
  }
}

export default new PlReceivingApprovalService();
