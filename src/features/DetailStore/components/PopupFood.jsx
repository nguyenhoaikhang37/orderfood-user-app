import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import '../DetailStore.scss';
import ChooseList from './ChooseList';
import { useDispatch } from 'react-redux';
import { detailActions } from '../detailSlice';

const PopupFood = memo(function PopupFood({ food, setOpen }) {
  const dispatch = useDispatch();
  const [chooseList, setChooseList] = useState([]);

  const handleAddChoose = (chooses) => {
    setChooseList((prev) => [...prev, ...chooses]);
  };

  const handleSubmitPopup = () => {
    const formatListChoose = [...new Set(chooseList)];
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
          <p>Giá: {food.price.toLocaleString()}đ</p>
        </div>
      </div>
      {/* Popup Food List Choose */}
      <ChooseList handleAddChoose={handleAddChoose} chooseList={food.choose} />
      {/* Popup Food Footer */}
      <div className="popup-footer">
        <div></div>
        <button onClick={handleSubmitPopup} className="popup-btn">
          OK + 28,000d
        </button>
      </div>
    </div>
  );
});

PopupFood.propTypes = {
  food: PropTypes.object,
};

export default PopupFood;
