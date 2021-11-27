import { Alert, Checkbox, CircularProgress } from '@mui/material';
import axios from 'axios';
import { selectAuthUser } from 'features/Auth/authSlice';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const PopupCheckout = ({ onCheckout, foodCart, idParams, storeById, loading, isError }) => {
  const user = useSelector(selectAuthUser);
  const [payment, setPayment] = useState();
  console.log('🚀 ~ file: PopupCheckout.jsx ~ line 11 ~ PopupCheckout ~ payment', payment);
  const [shipMoney, setShipMoney] = useState(0);
  const [shipList, setShipList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        `https://server-express-foodapp.herokuapp.com/api/order/haversine?latStart=${storeById?.lat}&lngStart=${storeById?.lng}&latEnd=${user?.profile?.lat}&lngEnd=${user?.profile?.lng}`
      );
      setShipMoney(res.data.km);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`https://server-express-foodapp.herokuapp.com/api/pay`);
      setShipList(res.data.pay);
      setPayment(res.data.pay[0]._id);
    })();
  }, []);

  const handleCheckoutPopup = () => {
    onCheckout?.({
      foodCart: foodCart?.filter((food) => food.restaurant === idParams.id),
      totalCart: foodCart
        ?.filter((food) => food.restaurant === idParams.id)
        ?.reduce((total, cur) => total + cur.totalFood, 0),
      pay: payment,
    });
  };

  const getShipMoney = (km) => {
    let money = 0;
    if (km < 4) {
      money = 20000;
    } else {
      money = km * 5000;
    }

    return Math.round(money);
  };

  return (
    <div className="relative pb-4">
      <h3 className="mb-3 text-2xl text-gray-700 flex items-center justify-center">
        Xác nhận đơn hàng <i style={{ color: '#ee4d2d' }} class="far fa-check-circle ml-2"></i>
      </h3>
      <div className="flex space-x-4">
        <div className="w-6/12">
          <div className="w-full" style={{ height: '350px' }}>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.9003686095166!2d106.6266680143946!3d10.806520061593472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752be27d8b4f4d%3A0x92dcba2950430867!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUaOG7sWMgcGjhuqltIFRQLkhDTQ!5e1!3m2!1svi!2s!4v1636722326189!5m2!1svi!2s"
              height="350"
              width="100%"
              loading="lazy"
            ></iframe> */}
            {/* Lấy map từ lat lng */}
            <iframe
              height="350"
              width="100%"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${storeById.lat},${storeById.lng}&hl=es&z=14&output=embed`}
            ></iframe>
          </div>
          <div className=" text-sm mt-2">
            <p className="font-semibold">
              <i class="fas fa-circle text-red-500 mr-1"></i>
              {storeById?.name} - {storeById?.phoneNumber}{' '}
            </p>
            <p>{storeById?.location}</p>
          </div>
          <div className=" text-sm mt-2">
            <p className="font-semibold">
              <i class="fas fa-circle text-green-500 mr-1"></i>
              {user?.profile?.fullName} - {user?.phoneNumber}{' '}
            </p>
            <p>{user?.profile?.address}</p>
          </div>
        </div>
        <div className="w-6/12">
          <div style={{ height: '250px' }} className="overflow-y-scroll pr-2 popup-checkout-scroll">
            <p className="text-center mb-2" style={{ color: '#ee4d2d' }}>
              Chi tiết đơn hàng
            </p>
            {foodCart
              ?.filter((food) => food.restaurant === idParams.id)
              ?.map((food) => (
                <div className="text-xs  flex justify-between items-center space-y-2">
                  <p className="relative">
                    <span className="order-item-number">{food?.quantityInCart}</span> {food?.name}{' '}
                  </p>
                  <p className="text-base font-semibold">
                    {(food?.price * food?.quantityInCart).toLocaleString()}
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

              {/* <div className="flex items-center text-sm">
                <Checkbox checked={payment === 1} onChange={() => setPayment(1)} />
                <label className="text-gray-900">Giao hàng</label>
              </div>
              <div className="flex items-center text-sm">
                <Checkbox checked={payment === 2} onChange={() => setPayment(2)} />
                <label className="text-gray-900">Thanh toán qua thẻ</label>
              </div> */}
            </div>
          </div>
          <div className="checkout-ship">
            <div className="checkout-ship-info">
              <p className="checkout-name checkout-title">Phí giao hàng</p>
              <p className="checkout-price">
                {shipMoney?.toFixed(1)} km - {getShipMoney(shipMoney)?.toLocaleString()} đ
              </p>
            </div>

            <div className="checkout-ship-info checkout-promotion mb-1">
              <div className="checkout-name checkout-title">
                <p>Mã khuyến mãi</p>
                <p className="checkout-secon">(Thêm mã khuyến mãi)</p>
              </div>
              <div className="checkout-price icon-ship">
                <input type="text" className="border border-gray-300 w-16 mr-2" />
                <i className="fas fa-plus-circle checkout-ship-icon"></i>
              </div>
            </div>
            {isError && <Alert severity="error">Số coin trong ví hiện không đủ!</Alert>}
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
          <i class="fas fa-arrow-right ml-2"></i>
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
    </div>
  );
};

PopupCheckout.propTypes = {
  onCheckout: PropTypes.func,
  foodCart: PropTypes.array,
  idParams: PropTypes.object,
};

export default PopupCheckout;
