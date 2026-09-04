import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class POLogsService {
  async getPlsReport(params) {
    const { data } = await axios.get(endpoints.poLogs.list, {
      params,
    });
    return data;
  }

  async getPlsStatus(params) {
    const { data } = await axios.get(endpoints.poLogs.status, {
      params,
    });
    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.poLogs.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.poLogs.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }
}

export default new POLogsService();
