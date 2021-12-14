import { Alert, Box, CircularProgress } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputField } from 'components/FormFields/InputField';
import userApi from 'apis/userApi';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const schema = yup.object().shape({
  otp: yup.string().required('Bạn vui lòng nhập mã OTP!'),
});

const PopupOTP = ({ handleClose, tokenOtp, isForgetPW, handleCloseSignInForm }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [countdown, setCountdown] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      Swal.fire('Thông báo!', 'Bạn đã hết thời gian xác nhận OTP.', 'error');
      handleClose();
      return;
    }
  }, [countdown]);

  const handleOTPSubmit = async (formValues) => {
    try {
      setError('');
      setLoading(true);
      if (!isForgetPW) {
        await userApi.xacThucOTP(formValues.otp, tokenOtp);
        Swal.fire('Success!', 'Bạn đã đăng kí thành công.', 'success');
      } else if (isForgetPW) {
        await userApi.xacThucQuenMatKhau(formValues.otp, tokenOtp);
        Swal.fire('Success!', 'Bạn đã Lấy lại mật khẩu thành công.', 'success');
        handleClose();
        handleCloseSignInForm();
      }
      history.push('/auth/signin');
    } catch (error) {
      setError('Mã OTP không hợp lệ');
      console.log('🚀 ~ file: PopupOTP.jsx ~ line 22 ~ handleOTPSubmit ~ error', error);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Nhập mã xác thực <i className="fas fa-fingerprint"></i>
      </div>
      <Box component="form" onSubmit={handleSubmit(handleOTPSubmit)} noValidate sx={{ mt: 1 }}>
        <InputField name="otp" control={control} label="Mã OTP" />
        <div className="mt-2 text-xl font-light text-right text-indigo-800 dark:text-white">
          Bạn còn {countdown}s
        </div>

        <button
          type="submit"
          className="py-2 px-4 mt-4 mb-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          {loading && <CircularProgress size="1rem" color="inherit" />}
          Xác nhận
        </button>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Fragment>
  );
};

export default PopupOTP;
