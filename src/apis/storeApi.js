import axiosClient from './axiosClient';

const storeApi = {
  getStoreList() {
    const url = '/restaurant';
    return axiosClient.get(url);
  },
  // Tìm kiếm cửa hàng gần
  getNearStoreList(latStart, lngStart) {
    const url = `/restaurant/haversine?latStart=${latStart}&lngStart=${lngStart}`;
    return axiosClient.get(url);
  },
};

export default storeApi;
