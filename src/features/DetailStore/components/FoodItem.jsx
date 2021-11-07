import React, { Fragment, memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { detailActions } from '../detailSlice';
import Popup from 'components/Popup';
import PopupFood from './PopupFood';

const FoodItem = memo(function FoodItem({ food }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddToCart = () => {
    if (food.choose.length > 0) {
      handleOpen();
      return;
    }
    dispatch(detailActions.addFoodToCart(food));
  };

  return (
    <Fragment>
      <div className="food-item">
        <div className="food-item-left">
          <img className="food-img" src={food?.photo} />
          <div className="food-text-info">
            <h4 onClick={handleAddToCart} className="food-name">
              {food?.name}
            </h4>
            <p className="food-desc">{food?.description}</p>
          </div>
        </div>
        <div className="food-price-info">
          {food?.lastPrice === food?.price ? (
            <p className="food-price">
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
          ) : (
            <div className="flex flex-col">
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
              <p className="food-price">
                {food?.lastPrice?.toLocaleString()}{' '}
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
          {food?.quantity !== 0 ? (
            <button onClick={handleAddToCart} className="food-price-add">
              <i className="fas fa-plus-square food-price-icon"></i>
            </button>
          ) : (
            <img
              src="https://khogiaydantuonggiare.com/uploads/images/catalogue/hethang.png"
              className="sold-out-img"
            />
          )}
        </div>
      </div>
      <Popup open={open} setOpen={setOpen} handleClose={handleClose}>
        <PopupFood setOpen={setOpen} food={food} />
      </Popup>
    </Fragment>
  );
});

FoodItem.propTypes = {
  food: PropTypes.object,
};

export default FoodItem;
