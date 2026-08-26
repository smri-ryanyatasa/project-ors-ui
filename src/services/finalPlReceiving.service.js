import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class FinalPLReceivingService {
  async getPls(params) {
    const { data } = await axios.get(endpoints.finalPlReceiving.list, {
      params,
    });
    return data;
  }

  async getPlsStatus(params) {
    const { data } = await axios.get(endpoints.finalPlReceiving.status, {
      params,
    });
    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.finalPlReceiving.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.finalPlReceiving.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async rowsUpdate(payload) {
    const { data } = await axios.put(endpoints.finalPlReceiving.rowsUpdate, payload);
    return data;
  }

  async toApproved(params) {
    const { data } = await axios.get(endpoints.finalPlReceiving.toApproved, {
      params,
    });
    return data;
  }
}

export default new FinalPLReceivingService();
