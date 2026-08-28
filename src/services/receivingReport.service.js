import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class ReceivingReportService {
  async getPlsReport(params) {
    const { data } = await axios.get(endpoints.receivingReport.list, {
      params,
    });
    return data;
  }

  async getPlsStatus(params) {
    const { data } = await axios.get(endpoints.receivingReport.status, {
      params,
    });
    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.receivingReport.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.receivingReport.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }
}

export default new ReceivingReportService();
