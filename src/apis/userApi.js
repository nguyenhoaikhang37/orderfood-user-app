import { ACCESS_TOKEN } from 'constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const userApi = {
  layThongTinTaiKhoan(token1) {
    const url = `/auth/profile`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token1,
      },
    });
  },
  doiThongTinTaiKhoan(formValues) {
    const url = `/auth`;
    return axiosClient({
      url,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: formValues,
    });
  },
  dangNhap(formValues) {
    const url = `/auth/login`;
    return axiosClient.post(url, formValues);
  },
  dangKy(formValues) {
    const url = `/auth/register`;
    return axiosClient.post(url, formValues);
  },
};

export default userApi;
