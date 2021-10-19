import axiosClient from './axiosClient';

const userApi = {
  layThongTinTaiKhoan(token) {
    const url = `/auth/profile`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
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
