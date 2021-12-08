import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { Alert, CircularProgress } from '@mui/material';
import userApi from 'apis/userApi';
import { InputField } from 'components/FormFields/InputField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from 'yup';

const schema = yup.object().shape({
  password: yup.string().required('Mật khẩu không được để trống!'),
  confirmPassword: yup
    .string()
    .required('Xác nhận mật khẩu không được để trống!')
    .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp!'),
});

const PopupChangePW = ({ setOpen }) => {
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleFormSubmit = async (formValues) => {
    const { oldPassword, password } = formValues;
    try {
      setPasswordError('');
      setLoading(true);
      await userApi.doiMatKhau({ oldPassword, password });
      setOpen(false);
      Swal.fire('Success!', 'Bạn đổi mật khẩu thành công.', 'success');
    } catch (err) {
      console.log(err);
      setPasswordError('Mật khẩu cũ không đúng!');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Đổi mật khẩu
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <InputField name="oldPassword" type="password" control={control} label="Mật khẩu cũ" />
        <InputField name="password" type="password" control={control} label="Mật khẩu mới" />
        <InputField
          name="confirmPassword"
          type="password"
          control={control}
          label="Xác nhận mật khẩu"
        />
        {passwordError && (
          <Alert style={{ marginTop: 20 }} severity="error">
            {passwordError}
          </Alert>
        )}
        <Button
          style={{ marginTop: 20, backgroundColor: '#f44336', color: '#fff' }}
          type="submit"
          fullWidth
          variant="contained"
        >
          {loading && <CircularProgress size="1rem" color="inherit" />}
          Xác nhận
        </Button>
      </form>
    </div>
  );
};

export default PopupChangePW;
