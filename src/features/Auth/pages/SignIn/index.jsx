import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SignInForm from 'features/Auth/components/SignInForm';
import { Fragment } from 'react';
import axios from 'axios';

const SignIn = ({ classes }) => {
  const handleSignInFormSubmit = async (formValues) => {
    try {
      const res = await axios.post(
        'https://server-express-foodapp.herokuapp.com/api/auth/login',
        formValues
      );
      console.log('Successfully sign in', res.data);
      // const res = await fetch('https://nameless-mountain-24821.herokuapp.com/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // 'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: JSON.stringify(formValues),
      // });

      // console.log('success', res.json());
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
