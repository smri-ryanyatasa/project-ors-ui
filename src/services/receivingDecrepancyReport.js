import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class ReceivingDecrepancyReportService {
  async getPlsReport(params) {
    const { data } = await axios.get(endpoints.receivingDecrepancyReport.list, {
      params,
    });
    return data;
  }

  async getPlsStatus(params) {
    const { data } = await axios.get(endpoints.receivingDecrepancyReport.status, {
      params,
    });
    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.receivingDecrepancyReport.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.receivingDecrepancyReport.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }
}

export default new ReceivingDecrepancyReportService();
