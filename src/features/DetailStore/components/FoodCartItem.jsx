import React, { memo } from 'react';
import PropTypes from 'prop-types';

const FoodCartItem = memo(function FoodCartItem({ food, handleAddToCart, handleRemoveToCart }) {
  return (
    <div className="checkout-item">
      <div className="checkout-info">
        <img src={food?.photo} className="checkout-img" />
        <div className="checkout-name-list">
          <p className="checkout-name">{food?.name}</p>
          <p className="checkout-list-choose-cart">{food?.description}</p>
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
        {food?.lastPrice === food?.price ? (
            <p className="checkout-price">
              {food?.totalFood?.toLocaleString()}{' '}
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
          ) :  food?.price ? <div className="flex flex-col">
          <p className="food-price-prev">
            {food?.price?.toLocaleString()}{' '}
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
          <p className="checkout-price">
            {food?.totalFood?.toLocaleString()}{' '}
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
        </div>:(
            <div className="flex flex-col">
              <p className="food-price-prev">
                {food?.total?.toLocaleString()}{' '}
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
              <p className="checkout-price">
                {food?.totalFood?.toLocaleString()}{' '}
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
          )}
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
