import axios from 'src/lib/axios';

import { endpoints } from './endpoints';

class PlMasterfileService {
  async getPlsMasterfile(params) {
    const { data } = await axios.get(endpoints.plMasterfile.list, {
      params,
    });
    console.log(data);

    return data;
  }

  async getPlsMasterfileStatus(params) {
    const { data } = await axios.get(endpoints.plMasterfile.status, {
      params,
    });

    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.plMasterfile.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.plMasterfile.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }
}

export default new PlMasterfileService();
