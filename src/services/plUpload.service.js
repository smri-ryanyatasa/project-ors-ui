import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class PlUploadService {
  async getPlsUpload(params) {
    const { data } = await axios.get(endpoints.plUpload.list, {
      params,
    });
    return data;
  }

  async getPlsUploadStatus(params) {
    const { data } = await axios.get(endpoints.plUpload.status, {
      params,
    });
    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.plUpload.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.plUpload.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async getPlLogs(params) {
    const { data } = await axios.get(endpoints.plUpload.plLogs, {
      params,
    });
    return data;
  }

  async getPlUploadExceptions(params) {
    const { data } = await axios.get(endpoints.plUpload.plExceptions, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async getUserBranch() {
    const { data } = await axios.get(endpoints.user.assignedBranch);
    return data;
  }

  async deletePlFile(params) {
    const { data } = await axios.delete(endpoints.plUpload.delete(params.id));
    return data;
  }
}

export default new PlUploadService();
