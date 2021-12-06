import { Button } from '@material-ui/core';
import AddressInput from 'components/FormFields/AddressInput';
import { InputField } from 'components/FormFields/InputField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ProfileForm = () => {
  const [address, setAddress] = useState();
  const { control, handleSubmit } = useForm({});

  const handleFormSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <InputField name="phoneNumber" control={control} label="Số điện thoại" />
        <InputField name="fullName" control={control} label="Họ tên" />
        <InputField name="password" type="password" control={control} label="Mật khẩu" />
        <InputField
          name="confirmPassword"
          type="password"
          control={control}
          label="Xác nhận mật khẩu"
        />

        <AddressInput address={address} setAddress={setAddress} />

        <Button
          style={{ marginTop: 20 }}
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
