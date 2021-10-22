import React, { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import '../DetailStore.scss';
import ChooseList from './ChooseList';
import { useDispatch } from 'react-redux';
import { detailActions } from '../detailSlice';

const PopupFood = memo(function PopupFood({ food, setOpen }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);

  const choosePrice = useMemo(() => {
    return checked?.reduce((total, cur) => total + cur.price, 0) || 0;
  }, [checked]);

  const handleSubmitPopup = () => {
    const formatListChoose = [...new Set(checked)];
    const formatFood = { ...food, listChoose: formatListChoose };
    dispatch(detailActions.addFoodToCart(formatFood));
    setOpen(false);
  };

  return (
    <div>
      {/* Popup Food Header */}
      <div className="flex items-center space-x-8 popup-content">
        <div className="popup-img">
          <img src={food.photo} />
        </div>
        <div>
          <h3 className="font-bold text-xl">{food.name}</h3>
          <p className="font-light text-gray-400 my-2">{food.description}</p>
          <p>Giá: {food?.lastPrice?.toLocaleString()}đ</p>
        </div>
      </div>
      {/* Popup Food List Choose */}
      <ChooseList chooseList={food.choose} checked={checked} setChecked={setChecked} />
      {/* Popup Food Footer */}
      <div className="popup-footer">
        <div></div>
        <button onClick={handleSubmitPopup} className="popup-btn">
          OK + {(food?.lastPrice + choosePrice).toLocaleString()}{' '}
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
        </button>
      </div>
    </div>
  );
});

PopupFood.propTypes = {
  food: PropTypes.object,
};

export default PopupFood;
