import axios from 'src/lib/axios';

import { endpoints } from './endpoints';
import { en } from 'zod/v4/locales';

class ItemService {
  async getItems(params) {
    console.log(params);

    const { data } = await axios.get(endpoints.item.list, {
      params,
    });
    console.log(data);
    return data;
  }

  async csvExport(params) {
    const { data } = await axios.get(endpoints.item.csvExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async excelExport(params) {
    const { data } = await axios.get(endpoints.item.excelExport, {
      params,
      responseType: 'blob',
    });
    return data;
  }

  async updateRows(payload) {
    const { data } = await axios.put(endpoints.item.rowsUpdate, payload);
    console.log(data);
    return data;
  }
}

export default new ItemService();
