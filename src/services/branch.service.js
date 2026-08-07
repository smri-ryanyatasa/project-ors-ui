import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class BranchService {
  async getBranches(params) {
    const { data } = await axios.get(endpoints.branch.list, {
      params,
    });
    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.branch.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.branch.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }
}

export default new BranchService();
