import { Alert, CircularProgress } from '@mui/material';
import userApi from 'apis/userApi';
import AddressInput from 'components/FormFields/AddressInput';
import { ACCESS_TOKEN } from 'constants/global';
import { getUserToken } from 'features/Auth/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const PopupChangeAddress = ({ handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [address, setAddress] = useState();
  const dispatch = useDispatch();
  const token = localStorage.getItem(ACCESS_TOKEN);

  const handleSubmitClick = async () => {
    if (!address) {
      setError(true);
      return;
    }
    try {
      const formValues = {
        lat: address.lat,
        lng: address.lng,
        address: address.name,
      };
      setError(false);
      setLoading(true);

      await userApi.doiDiaChi(formValues);
      dispatch(getUserToken());
      handleClose();
    } catch (error) {
      console.log('🚀 ~ file: PopupChangeAddress.jsx ~ line 18 ~ handleSubmitClick ~ error', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h3 className="mb-3 text-2xl text-gray-700 flex items-center justify-center">
        Sửa thông tin giao hàng <i style={{ color: '#ee4d2d' }} className="fas fa-map-pin ml-2"></i>
      </h3>
      <AddressInput address={address} setAddress={setAddress} />

      <button
        onClick={handleSubmitClick}
        style={{ color: '#FFF', backgroundColor: '#ee4d2d' }}
        className="py-2 px-4 mt-4 mb-4  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
      >
        {loading && <CircularProgress size="1rem" color="inherit" />}
        Xác nhận
      </button>
      {error && <Alert severity="error">Bạn vui lòng nhập địa chỉ muốn thay đổi</Alert>}
    </div>
  );
};

export default PopupChangeAddress;
