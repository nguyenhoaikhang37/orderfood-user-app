import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { detailActions } from '../detailSlice';
import Images from 'constants/images';
import FoodCartItem from './FoodCartItem';

const Checkout = memo(function Checkout({ foodCart, idParams, onCheckout }) {
  const dispatch = useDispatch();

  const handleAddToCart = (food) => {
    dispatch(detailActions.addFoodToCart(food));
  };

  const handleRemoveToCart = (food) => {
    dispatch(detailActions.removeFoodToCart(food));
  };

  const handleCheckoutClick = () => {
    onCheckout?.({
      foodCart,
      totalCart: foodCart
        ?.filter((food) => food.restaurant === idParams.id)
        ?.reduce((total, cur) => total + cur.totalFood, 0),
    });
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
      <div className="checkout-ship">
        <div className="checkout-ship-info">
          <p className="checkout-name checkout-title">Phí giao hàng</p>
          <p className="checkout-price">0 đ</p>
        </div>
        <div className="checkout-ship-info checkout-promotion">
          <div className="checkout-name checkout-title">
            <p>Mã khuyến mãi</p>
            <p className="checkout-secon">(Thêm mã khuyến mãi)</p>
          </div>
          <div className="checkout-price icon-ship">
            <i className="fas fa-plus-circle checkout-ship-icon"></i>
          </div>
        </div>
      </div>
      <div
        className={`checkout-btn ${
          foodCart?.filter((food) => food.restaurant === idParams.id).length === 0 &&
          'checkout-disabled'
        } `}
      >
        <button
          disabled={foodCart?.filter((food) => food.restaurant === idParams.id).length === 0}
          className="btn-checkout"
          onClick={handleCheckoutClick}
        >
          <p className="btn-checkout-text">Thanh toán</p>
          <p className="btn-checkout-price">
            {foodCart
              ?.filter((food) => food.restaurant === idParams.id)
              ?.reduce((total, cur) => total + cur.totalFood, 0)
              .toLocaleString()}{' '}
            đ
          </p>
        </button>
      </div>
    </div>
  );
});

Checkout.propTypes = {
  foodCart: PropTypes.array,
  onCheckout: PropTypes.func,
  idParams: PropTypes.object,
};

export default Checkout;
