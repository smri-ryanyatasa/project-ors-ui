import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class InitialPLReceivingService {
  async getPls(params) {
    const { data } = await axios.get(endpoints.initialPlReceiving.list, {
      params,
    });
    return data;
  }

  async getPlsStatus(params) {
    const { data } = await axios.get(endpoints.initialPlReceiving.status, {
      params,
    });
    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.initialPlReceiving.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.initialPlReceiving.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async plsFiles(payload) {
    const { data } = await axios.get(endpoints.initialPlReceiving.plsFiles(payload.branch_code));
    return data;
  }

  async getPlsFiles(params) {
    const { data } = await axios.get(endpoints.initialPlReceiving.fileSI, {
      params,
    });
    return data;
  }
}

export default new InitialPLReceivingService();
