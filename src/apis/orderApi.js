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
  getHistory() {
    const url = `/order`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};

export default orderApi;
