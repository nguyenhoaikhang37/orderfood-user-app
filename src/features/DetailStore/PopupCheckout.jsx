import { Alert, Checkbox, CircularProgress } from '@mui/material';
import axios from 'axios';
import Popup from 'components/Popup';
import { selectAuthUser } from 'features/Auth/authSlice';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PopupChangeAddress from './PopupChangeAddress';

const PopupCheckout = ({ onCheckout, foodCart, idParams, storeById, loading, isError }) => {
  const user = useSelector(selectAuthUser);
  const [payment, setPayment] = useState();
  const [shipMoney, setShipMoney] = useState(0);
  const [shipList, setShipList] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://server-express-foodapp.herokuapp.com/api/order/haversine?latStart=${storeById?.lat}&lngStart=${storeById?.lng}&latEnd=${user?.profile?.lat}&lngEnd=${user?.profile?.lng}`
      );
      setShipMoney(res.data.km);
    })();
  }, [user?.profile?.lng]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`https://server-express-foodapp.herokuapp.com/api/pay`);
      setShipList(res.data.pay);
      setPayment(res.data.pay[0]._id);
    })();
  }, []);

  const getShipMoney = (km) => {
    let money = 0;
    if (km < 4) {
      money = 20000;
    } else {
      money = km * 5000;
    }

    return Math.round(money);
  };

  const handleCheckoutPopup = () => {
    onCheckout?.({
      foodCart: foodCart?.filter((food) => food.restaurant === idParams.id),
      totalCart: foodCart
        ?.filter((food) => food.restaurant === idParams.id)
        ?.reduce((total, cur) => total + cur.totalFood, 0),
      totalCost: foodCart
        ?.filter((food) => food.restaurant === idParams.id)
        ?.reduce((total, cur) => total + cur.totalCost, 0),
      pay: payment,
      ship: getShipMoney(shipMoney),
    });
  };

  return (
    <div className="relative pb-4">
      <h3 className="mb-3 text-2xl text-gray-700 flex items-center justify-center">
        Xác nhận đơn hàng <i style={{ color: '#ee4d2d' }} className="far fa-check-circle ml-2"></i>
      </h3>
      <div className="flex space-x-4">
        <div className="w-6/12">
          <div className="w-full" style={{ height: '350px' }}>
            {/* Lấy map từ lat lng */}
            <iframe
              height="350"
              width="100%"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${storeById?.lat},${storeById?.lng}&hl=es&z=14&output=embed`}
            ></iframe>
          </div>
          <div className=" text-sm mt-2">
            <p className="font-semibold">
              <i className="fas fa-circle text-red-500 mr-1"></i>
              {storeById?.name} - {storeById?.phoneNumber}{' '}
            </p>
            <p>{storeById?.location}</p>
          </div>
          {!user?.profile && (
            <div className="my-4">
              <CircularProgress size="1rem" color="primary" />
            </div>
          )}
          {user?.profile && (
            <div className=" text-sm mt-2">
              <p className="font-semibold">
                <i className="fas fa-circle text-green-500 mr-1"></i>
                {user?.profile?.fullName} - {user?.phoneNumber}{' '}
              </p>
              <p>{user?.profile?.address}</p>
            </div>
          )}
          <div className=" text-base mt-2 mb-4 flex items-center">
            <p onClick={handleOpen} className="text-blue-500 hover:text-blue-700 cursor-pointer">
              Thay đổi địa chỉ nhận hàng <i className="ml-2 fas fa-chevron-right"></i>
            </p>
          </div>
        </div>
        <div className="w-6/12">
          <div style={{ height: '320px' }} className="overflow-y-scroll pr-2 popup-checkout-scroll">
            <p className="text-center mb-2" style={{ color: '#ee4d2d' }}>
              Chi tiết đơn hàng
            </p>
            {foodCart
              ?.filter((food) => food.restaurant === idParams.id)
              ?.map((food) => (
                <div
                  key={food._id}
                  className="text-xs  flex justify-between items-center space-y-2"
                >
                  <p className="relative">
                    <span className="order-item-number">{food?.quantityInCart}</span> {food?.name}{' '}
                  </p>
                  <p className="text-base font-semibold">
                    {(food?.totalFood).toLocaleString()}
                    <span
                      style={{
                        fontWeight: '400',
                        position: 'relative',
                        top: '-9px',
                        fontSize: '10px',
                        right: '0',
                      }}
                    >
                      đ
                    </span>
                  </p>
                </div>
              ))}
          </div>

          <div>
            <p className="checkout-name checkout-title">Chọn hình thức thanh toán</p>
            <div>
              {shipList.map((ship) => (
                <div className="flex items-center text-sm">
                  <Checkbox
                    checked={payment === ship?._id}
                    onChange={() => setPayment(ship?._id)}
                  />
                  <label className="text-gray-900">{ship?.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="checkout-ship">
            {payment === '618928d5af7088a9fc3f2602' && (
              <div className="checkout-ship-info">
                <p className="checkout-name checkout-title">Số coin hiện có: </p>
                <p className="checkout-price">
                  {+user?.myCoin?.toFixed(0)} điểm (
                  {(user?.myCoin?.toFixed(0) * 1000).toLocaleString()} đ)
                </p>
              </div>
            )}

            <div className="checkout-ship-info">
              <p className="checkout-name checkout-title">Phí giao hàng</p>
              <p className="checkout-price">
                {shipMoney?.toFixed(1)} km - {getShipMoney(shipMoney)?.toLocaleString()} đ
              </p>
            </div>

            {isError && <Alert severity="error">{isError}</Alert>}
          </div>
        </div>
      </div>
      <button
        onClick={handleCheckoutPopup}
        className="absolute left-0 right-0 w-full p-2 hover:opacity-80 flex justify-between"
        style={{ background: '#ee4d2d', color: '#fff', bottom: '-32px' }}
      >
        <span></span>
        <span className="flex items-center">
          {loading && <CircularProgress size="1rem" color="inherit" />} Đặt hàng{' '}
          <i className="fas fa-arrow-right ml-2"></i>
        </span>
        <span>
          {(
            foodCart
              ?.filter((food) => food.restaurant === idParams.id)
              ?.reduce((total, cur) => total + cur.totalFood, 0) + getShipMoney(shipMoney)
          ).toLocaleString()}{' '}
          đ
        </span>
      </button>
      <Popup open={open} setOpen={setOpen} handleClose={handleClose}>
        <PopupChangeAddress handleClose={handleClose} />
      </Popup>
    </div>
  );
};

PopupCheckout.propTypes = {
  onCheckout: PropTypes.func,
  foodCart: PropTypes.array,
  idParams: PropTypes.object,
};

export default PopupCheckout;
