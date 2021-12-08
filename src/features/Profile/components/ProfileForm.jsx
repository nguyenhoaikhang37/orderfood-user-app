import { Button } from '@material-ui/core';
import { Alert, CircularProgress } from '@mui/material';
import AddressInput from 'components/FormFields/AddressInput';
import { InputField } from 'components/FormFields/InputField';
import Popup from 'components/Popup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import PopupChangePW from './PopupChangePW';

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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = async (formValues) => {
    try {
      setLoading(true);
      await onUpdateProfile?.({ formValues, addressUpdate });
      await Swal.fire('Success!', 'Bạn cập nhật thông tin thành công.', 'success');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <InputField name="phoneNumber" control={control} label="Số điện thoại" />
        <InputField name="fullName" control={control} label="Họ tên" />
        <div className="flex items-center space-x-10 my-4">
          <span>Mật khẩu:</span>
          <span>***********</span>
          <span
            onClick={handleOpen}
            className="underline cursor-pointer"
            style={{ color: '#f44336' }}
          >
            Đổi mật khẩu
          </span>
        </div>
        <AddressInput address={addressUpdate} setAddress={setAddress} />
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
      <Popup open={open} setOpen={setOpen} handleClose={handleClose}>
        <PopupChangePW setOpen={setOpen} />
      </Popup>
    </div>
  );
};

export default ProfileForm;
