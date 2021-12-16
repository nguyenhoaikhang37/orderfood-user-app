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
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: formValues,
    });
  },
  doiMatKhau(formValues) {
    const url = `/auth/password`;
    return axiosClient({
      url,
      method: 'PATCH',
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
  xacThucOTP(otp, token1) {
    const url = `/auth/verify?token=${token1}&code=${otp}`;
    return axiosClient.get(url);
  },
  quenMatKhau(formValues) {
    const url = `/auth/forgot-password`;
    return axiosClient({
      url,
      method: 'POST',
      data: formValues,
    });
  },
  xacThucQuenMatKhau(otp, token1) {
    const url = `/auth/verify-newPassword?token=${token1}&code=${otp}`;
    return axiosClient.get(url);
  },
  doiDiaChi(formValues) {
    const url = `/auth/changeAddress`;
    return axiosClient({
      url,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      method: 'PATCH',
      data: formValues,
    });
  },
};

export default userApi;
