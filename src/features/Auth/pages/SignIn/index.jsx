import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignInForm from 'features/Auth/components/SignInForm';
import { Fragment } from 'react';
import userApi from 'apis/userApi';
import { ACCESS_TOKEN } from 'constants/global';
import { useHistory } from 'react-router';

const SignIn = ({ classes }) => {
  const history = useHistory();

  const handleSignInFormSubmit = async (formValues) => {
    try {
      const res = await userApi.dangNhap(formValues);
      localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.log('Failed to sign in form submit', error);
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
    </Fragment>
  );
};

export default SignIn;
