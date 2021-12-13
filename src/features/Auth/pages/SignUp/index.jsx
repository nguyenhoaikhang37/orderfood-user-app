import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignUpForm from 'features/Auth/components/SignUpForm';
import React, { Fragment, useState } from 'react';
import userApi from 'apis/userApi';
import Popup from 'components/Popup';
import PopupOTP from './PopupOTP';

const SignUp = ({ classes }) => {
  const [loading, setLoading] = useState(false);
  const [tokenOtp, setTokenOtp] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitForm = async ({ formValues, address }) => {
    const formatFormValues = {
      phoneNumber: formValues.phoneNumber,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      fullName: formValues.fullName,
      address: address.name,
      lat: address.lat,
      lng: address.lng,
    };

    try {
      setLoading(true);
      const res = await userApi.dangKy(formatFormValues);
      setTokenOtp(res.data.token);
      console.log('otp', res);
      handleOpen();
    } catch (error) {
      console.log('Failed to sign up form submit', error);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Đăng ký
      </Typography>
      <SignUpForm onSubmit={handleSubmitForm} classes={classes} loading={loading} />
      <Popup open={open} setOpen={setOpen} handleClose={handleClose}>
        <PopupOTP handleClose={handleClose} tokenOtp={tokenOtp} />
      </Popup>
    </Fragment>
  );
};

export default SignUp;
