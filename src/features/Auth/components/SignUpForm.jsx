import { InputField } from 'components/FormFields/InputField';
import React, { Fragment, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import AddressInput from 'components/FormFields/AddressInput';
import { CircularProgress } from '@mui/material';

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Số điện thoại không được để trống!')
    .matches(/^[0-9\-\+]{9,15}$/, 'Số điện thoại không đúng định dạng!'),
  fullName: yup.string().required('Họ tên không được để trống!'),
  password: yup
    .string()
    .required('Mật khẩu không được để trống!')
    .min(8, 'Mật khẩu chứa ít nhất 8 kí tự!')
    .max(20, 'Mật khẩu chứa nhiều nhất 20 kí tự!'),
  confirmPassword: yup
    .string()
    .required('Xác nhận mật khẩu không được để trống!')
    .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp!'),
  // district: yup.string().required('Vui lòng chọn quận, huyện!'),
  // ward: yup.string().required('Vui lòng chọn phường, xã!'),
  // street: yup.string().required('Tên đường không được để trống!'),
});

const SignUpForm = ({ classes, onSubmit, loading }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [districtList, setDistrictList] = useState();
  const [ward, setWard] = useState();
  const [wardSelect, setWardSelect] = useState();
  const [inputt, setInput] = useState('');
  const [address, setAddress] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/p/79?depth=3');
        setDistrictList(response.data.districts);
      } catch (error) {
        console.log('Failed to fetch district data', error);
      }
    })();
  }, []);
  console.log(inputt);
  useEffect(() => {
    setWardSelect(
      districtList?.filter((district) => district.codename == ward).map((x) => x.wards)
    );
  }, [ward]);

  const handleFormSubmit = (formValues) => {
    onSubmit?.({ formValues, address });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form} noValidate>
        <InputField name="phoneNumber" control={control} label="Số điện thoại" />
        <InputField name="fullName" control={control} label="Họ tên" />
        <InputField name="password" type="password" control={control} label="Mật khẩu" />
        <InputField
          name="confirmPassword"
          type="password"
          control={control}
          label="Xác nhận mật khẩu"
        />
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {districtList && (
              <SelectField
                setWard={setWard}
                name="district"
                control={control}
                label="Quận, huyện"
                options={districtList?.map((district) => {
                  return { label: district.name, value: district.codename };
                })}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {wardSelect?.[0] ? (
              <SelectField
                name="ward"
                control={control}
                label="Phường, xã"
                options={wardSelect?.[0]?.map((ward) => {
                  return { label: ward.name, value: ward.codename };
                })}
              />
            ) : (
              <SelectField
                name="ward"
                control={control}
                label="Phường, xã"
                options={[{ value: undefined, label: 'Vui lòng chọn quận, huyện!' }]}
              />
            )}
          </Grid>
        </Grid>
        <InputField name="street" control={control} label="Đường" /> */}

        <AddressInput address={address} setAddress={setAddress} />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          {loading && <CircularProgress size="1rem" color="inherit" />}
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/auth/signin" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default SignUpForm;
