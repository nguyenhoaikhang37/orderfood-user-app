import { ACCESS_TOKEN } from 'constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const orderApi = {
  checkout(checkoutCart) {
    const url = `/order`;
    return axiosClient({
      url,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: checkoutCart,
    });
  },
  getHistoryCXN() {
    const url = `/order/stt0`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  getHistoryDG() {
    const url = `/order/stt1`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  getHistoryHT() {
    const url = `/order/stt2`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  deleteOrder(id) {
    const url = `/order/cancel/user/${id}`;
    return axiosClient({
      url,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};

export default orderApi;
