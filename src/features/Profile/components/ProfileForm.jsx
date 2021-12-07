import { Button } from '@material-ui/core';
import { Alert, CircularProgress } from '@mui/material';
import AddressInput from 'components/FormFields/AddressInput';
import { InputField } from 'components/FormFields/InputField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const ProfileForm = ({ user, onUpdateProfile }) => {
  const formatUser = {
    phoneNumber: user.phoneNumber,
    fullName: user.profile.fullName,
    address: user.profile.address,
  };
  const [addressUpdate, setAddress] = useState();
  const { control, handleSubmit } = useForm({
    defaultValues: formatUser,
  });
  const [isChangePW, setChangePW] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleFormSubmit = async (formValues) => {
    try {
      setPasswordError('');
      setLoading(true);
      await onUpdateProfile?.({ formValues, addressUpdate });
      await Swal.fire('Success!', 'Bạn cập nhật thông tin thành công.', 'success');
      window.location.reload();
    } catch (err) {
      console.log(err);
      setPasswordError('Mật khẩu cũ không chính xác!');
    }
    setLoading(false);
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <InputField name="phoneNumber" control={control} label="Số điện thoại" />
        <InputField name="fullName" control={control} label="Họ tên" />
        {!isChangePW ? (
          <div className="flex items-center space-x-10 my-4">
            <span>Mật khẩu:</span>
            <span>***********</span>
            <span
              onClick={() => setChangePW(true)}
              className="underline cursor-pointer"
              style={{ color: '#f44336' }}
            >
              Đổi mật khẩu
            </span>
          </div>
        ) : (
          <>
            <InputField name="oldPassword" type="password" control={control} label="Mật khẩu cũ" />
            <InputField name="password" type="password" control={control} label="Mật khẩu mới" />
            <InputField
              name="confirmPassword"
              type="password"
              control={control}
              label="Xác nhận mật khẩu"
            />
            <div
              onClick={() => setChangePW(false)}
              className="underline cursor-pointer mt-2 mb-4 text-center"
              style={{ color: '#f44336' }}
            >
              Huỷ
            </div>
          </>
        )}
        <AddressInput address={addressUpdate} setAddress={setAddress} />
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
          Cập nhật thông tin
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
