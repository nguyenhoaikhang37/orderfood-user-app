import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { InputField } from 'components/FormFields/InputField';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Số điện thoại không được bỏ trống!')
    .matches(/^[0-9\-\+]{9,15}$/, 'Số điện thoại không đúng định dạng!'),
  password: yup
    .string()
    .required('Mật khẩu không được bỏ trống!')
    .min(8, 'Mật khẩu chứa ít nhất 8 kí tự!')
    .max(20, 'Mật khẩu chứa nhiều nhất 20 kí tự!'),
});

const SignInForm = ({ classes, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form}>
        <InputField name="phoneNumber" control={control} label="Số điện thoại" />
        <InputField name="password" type="password" control={control} label="Mật khẩu" />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/auth/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default SignInForm;
