import axiosClient from './axiosClient';

const menuApi = {
  getMenuList() {
    const url = '/menu';
    return axiosClient.get(url);
  },
  getMenuListByResId(resId) {
    const url = `/menu/${resId}`;
    return axiosClient.get(url);
  },
  getCategoryList() {
    const url = '/category';
    return axiosClient.get(url);
  },
};

export default menuApi;
