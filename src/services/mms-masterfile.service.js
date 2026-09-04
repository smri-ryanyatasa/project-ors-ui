import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class MMSMasterfileService {
  async triggerBranchInterface(params) {
    const { data } = await axios.get(endpoints.mmsMasterfile.trigger, {
      params,
    });
    console.log(params);
    return data;
  }
}

export default new MMSMasterfileService();
