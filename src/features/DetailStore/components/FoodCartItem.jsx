import React, { memo } from 'react';
import PropTypes from 'prop-types';

const FoodCartItem = memo(function FoodCartItem({ food, handleAddToCart, handleRemoveToCart }) {
  return (
    <div className="checkout-item">
      <div className="checkout-info">
        <img src={food?.photo} className="checkout-img" />
        <div className="checkout-name-list">
          <p className="checkout-name">{food?.name}</p>
          <p className="checkout-list-choose">
            {food.listChoose?.map((choose) => choose.name).join(', ')}
          </p>
        </div>
      </div>
      <div className="checkout-quantity">
        <div className="checkout-number">
          <i
            onClick={() => handleRemoveToCart(food)}
            className="fas fa-minus-circle checkout-icon"
          ></i>
          <span>{food?.quantityInCart}</span>
          <i onClick={() => handleAddToCart(food)} className="fas fa-plus-circle checkout-icon"></i>
        </div>
        <p className="checkout-price">{food?.totalFood.toLocaleString()} đ</p>
      </div>
    </div>
  );
});

FoodCartItem.propTypes = {
  food: PropTypes.object,
  handleAddToCart: PropTypes.func,
  handleRemoveToCart: PropTypes.func,
};

export default FoodCartItem;
