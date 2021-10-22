import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignInForm from 'features/Auth/components/SignInForm';
import { Fragment, useState } from 'react';
import userApi from 'apis/userApi';
import { ACCESS_TOKEN } from 'constants/global';
import { useHistory } from 'react-router';
import { Alert } from '@mui/material';

const SignIn = ({ classes }) => {
  const history = useHistory();
  const [errorLogin, setErrorLogin] = useState('');

  const handleSignInFormSubmit = async (formValues) => {
    try {
      const res = await userApi.dangNhap(formValues);
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.log('Failed to sign in form submit', error);
      setErrorLogin('Số điện thoại hoặc password không chính xác !!!');
    }
  };

  return (
    <Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <SignInForm classes={classes} onSubmit={handleSignInFormSubmit} />
      {errorLogin && <Alert severity="error">{errorLogin}</Alert>}
    </Fragment>
  );
};

export default SignIn;
