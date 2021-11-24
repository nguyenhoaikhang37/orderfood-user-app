import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignUpForm from 'features/Auth/components/SignUpForm';
import React, { Fragment, useState } from 'react';
import userApi from 'apis/userApi';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

const SignUp = ({ classes }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
      console.log(formatFormValues);
      setLoading(true);
      await userApi.dangKy(formatFormValues);
      setLoading(true);
      Swal.fire('Success!', 'Bạn đã đăng kí thành công.', 'success');
      history.push('/auth/signin');
    } catch (error) {
      console.log('Failed to sign up form submit', error);
    }
  };

  return (
    <Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <SignUpForm onSubmit={handleSubmitForm} classes={classes} loading={loading} />
    </Fragment>
  );
};

export default SignUp;
