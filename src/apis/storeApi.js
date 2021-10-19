import axiosClient from './axiosClient';

const storeApi = {
  getStoreList() {
    const url = '/restaurant';
    return axiosClient.get(url);
  },
};

export default storeApi;
