import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { detailActions } from '../detailSlice';
import Images from 'constants/images';
import FoodCartItem from './FoodCartItem';
import { CircularProgress } from '@mui/material';
import Popup from 'components/Popup';
import PopupCheckout from '../PopupCheckout';
import { ACCESS_TOKEN } from 'constants/global';
import { useHistory } from 'react-router';

const Checkout = memo(function Checkout({
  foodCart,
  idParams,
  loading,
  onCheckout,
  storeById,
  isError,
  setIsError,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setIsError(false);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleAddToCart = (food) => {
    dispatch(detailActions.addFoodToCart(food));
  };

  const handleRemoveToCart = (food) => {
    dispatch(detailActions.removeFoodToCart(food));
  };

  const handleCheckoutClick = () => {
    const isLogged = localStorage.getItem(ACCESS_TOKEN);
    if (!isLogged) {
      history.push('/auth/signin');
    }
    handleOpen();
  };

  return (
    <div className="checkout">
      <h3 className="checkout-heading">
        Giỏ hàng <i className="fab fa-shopify checkout-heading-icon"></i>
      </h3>
      <div className="checkout-list">
        {foodCart?.filter((food) => food.restaurant === idParams.id).length !== 0 ? (
          foodCart
            ?.filter((food) => food.restaurant === idParams.id)
            ?.map((food) => (
              <FoodCartItem
                handleAddToCart={handleAddToCart}
                handleRemoveToCart={handleRemoveToCart}
                key={food._id}
                food={food}
              />
            ))
        ) : (
          <div className="food-empty">
            <img className="food-empty-img" src={Images.FOOD_EMPTY} />
            <p className="food-empty-text">Giỏ hàng hiện đang trống!</p>
          </div>
        )}
      </div>

      <div
        className={`checkout-btn mt-4 ${
          foodCart?.filter((food) => food.restaurant === idParams.id).length === 0 &&
          'checkout-disabled'
        } `}
      >
        <button
          disabled={foodCart?.filter((food) => food.restaurant === idParams.id).length === 0}
          className="btn-checkout"
          onClick={handleCheckoutClick}
        >
          <p className="btn-checkout-text">
            {loading && <CircularProgress size="1rem" color="inherit" />}Thanh toán
          </p>
          <p className="btn-checkout-price">
            {foodCart
              ?.filter((food) => food.restaurant === idParams.id)
              ?.reduce((total, cur) => total + cur.totalFood, 0)
              .toLocaleString()}{' '}
            đ
          </p>
        </button>
      </div>
      <Popup open={open} setOpen={setOpen} handleClose={handleClose}>
        <PopupCheckout
          onCheckout={onCheckout}
          foodCart={foodCart}
          idParams={idParams}
          storeById={storeById}
          loading={loading}
          isError={isError}
        />
      </Popup>
    </div>
  );
});

Checkout.propTypes = {
  foodCart: PropTypes.array,
  onCheckout: PropTypes.func,
  idParams: PropTypes.object,
};

export default Checkout;
