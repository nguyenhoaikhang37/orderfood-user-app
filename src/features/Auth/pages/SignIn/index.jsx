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
  const [loading, setLoading] = useState(false);

  const handleSignInFormSubmit = async (formValues) => {
    try {
      setLoading(true);
      const res = await userApi.dangNhap(formValues);
      setLoading(false);
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.log('Failed to sign in form submit', error);
      setErrorLogin('Số điện thoại hoặc password không chính xác !!!');
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Đăng nhập
      </Typography>
      <SignInForm classes={classes} loading={loading} onSubmit={handleSignInFormSubmit} />
      {errorLogin && <Alert severity="error">{errorLogin}</Alert>}
    </Fragment>
  );
};

export default SignIn;
