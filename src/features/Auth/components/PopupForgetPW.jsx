import { Alert, Box, CircularProgress } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputField } from 'components/FormFields/InputField';
import userApi from 'apis/userApi';
import Popup from 'components/Popup';
import PopupOTP from '../pages/SignUp/PopupOTP';

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Số điện thoại không được để trống!')
    .matches(/^[0-9\-\+]{9,15}$/, 'Số điện thoại không đúng định dạng!'),
  newPassword: yup.string().required('Mật khẩu không được để trống!'),
  confirmNewPassword: yup
    .string()
    .required('Xác nhận mật khẩu không được để trống!')
    .oneOf([yup.ref('newPassword')], 'Mật khẩu không trùng khớp!'),
});

const PopupForgetPW = ({ handleCloseSignInForm }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [tokenOtp, setTokenOtp] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleForgetPWSubmit = async (formValues) => {
    const { phoneNumber, newPassword } = formValues;
    const formatFormValues = {
      phoneNumber,
      newPassword,
    };

    try {
      setLoading(true);
      const res = await userApi.quenMatKhau(formatFormValues);
      handleOpen();
      setTokenOtp(res.data.token);
    } catch (error) {
      console.log('🚀 ~ file: PopupForgetPW.jsx ~ line 33 ~ handleForgetPWSubmit ~ error', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Quên mật khẩu <i className="fas fa-unlock-alt"></i>
      </div>
      <Box component="form" onSubmit={handleSubmit(handleForgetPWSubmit)} noValidate sx={{ mt: 1 }}>
        <InputField name="phoneNumber" control={control} label="Số điện thoại" />
        <InputField name="newPassword" type="password" control={control} label="Mật khẩu mới" />
        <InputField
          name="confirmNewPassword"
          type="password"
          control={control}
          label="Xác nhận mật khẩu mới"
        />

        <button
          type="submit"
          className="py-2 px-4 mt-4 mb-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          {loading && <CircularProgress size="1rem" color="inherit" />}
          Xác nhận
        </button>
      </Box>
      <Popup open={open} setOpen={setOpen} handleClose={handleClose}>
        <PopupOTP
          handleClose={handleClose}
          handleCloseSignInForm={handleCloseSignInForm}
          tokenOtp={tokenOtp}
          isForgetPW
        />
      </Popup>
    </div>
  );
};

export default PopupForgetPW;
