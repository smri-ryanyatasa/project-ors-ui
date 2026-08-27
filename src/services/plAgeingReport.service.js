import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class PlAgeingReportService {
  async getPlsReport(params) {
    const { data } = await axios.get(endpoints.plAgeingReport.list, {
      params,
    });
    return data;
  }

  async getPlsStatus(params) {
    const { data } = await axios.get(endpoints.plAgeingReport.status, {
      params,
    });
    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.plAgeingReport.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.plAgeingReport.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }
}

export default new PlAgeingReportService();
