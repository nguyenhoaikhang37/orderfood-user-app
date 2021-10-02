import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignUpForm from 'features/Auth/components/SignUpForm';
import React, { Fragment } from 'react';
import axios from 'axios';

const SignUp = ({ classes }) => {
  const handleSubmitForm = async (formValues) => {
    const formatFormValues = {
      phoneNumber: formValues.phoneNumber,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword,
      fullName: formValues.fullName,
      address: {
        city: 'TP.HCM',
        district: formValues.district,
        ward: formValues.ward,
        street: formValues.street,
      },
    };

    try {
      await axios.post(
        'https://nameless-mountain-24821.herokuapp.com/api/auth/register',
        formatFormValues
      );
      console.log('Successfully sign up');
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
      <SignUpForm onSubmit={handleSubmitForm} classes={classes} />
    </Fragment>
  );
};

export default SignUp;
