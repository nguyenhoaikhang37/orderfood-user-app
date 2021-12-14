import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { InputField } from 'components/FormFields/InputField';
import Popup from 'components/Popup';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import PopupForgetPW from './PopupForgetPW';

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Số điện thoại không được bỏ trống!')
    .matches(/^[0-9\-\+]{9,15}$/, 'Số điện thoại không đúng định dạng!'),
  password: yup
    .string()
    .required('Mật khẩu không được bỏ trống!')
    // .min(6, 'Mật khẩu chứa ít nhất 6 kí tự!')
    .max(20, 'Mật khẩu chứa nhiều nhất 20 kí tự!'),
});

const SignInForm = ({ classes, loading, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form}>
        <InputField name="phoneNumber" control={control} label="Số điện thoại" />
        <InputField name="password" type="password" control={control} label="Mật khẩu" />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          disabled={isSubmitting}
        >
          {isSubmitting && <CircularProgress size="1rem" color="inherit" />}
          Đăng nhập
        </Button>
        <Grid container justifyContent="space-between">
          <Grid item>
            <div onClick={handleOpen} className="hover:text-indigo-600 cursor-pointer">
              Quên mật khẩu?
            </div>
          </Grid>
          <Grid item>
            <Link to="/auth/signup" variant="body2">
              <div className="hover:text-indigo-600">Bạn chưa có tài khoản? Đăng ký</div>
            </Link>
          </Grid>
        </Grid>
      </form>
      <Popup open={open} setOpen={setOpen} handleClose={handleClose}>
        <PopupForgetPW handleCloseSignInForm={handleClose} />
      </Popup>
    </Fragment>
  );
};

export default SignInForm;
