import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import foodApi from 'apis/foodApi';
import FoodItem from './FoodItem';

const MenuFood = memo(function MenuFood({ menu }) {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await foodApi.getFoodByMenu(menu._id);
      setFoodList(res.data.food);
    })();
  }, []);

  return (
    <div>
      {foodList.length !== 0 && (
        <div id={menu._id} className="food-menu-text">
          {menu.name}
        </div>
      )}
      <div className="food-list">
        {foodList?.map((food) => (
          <FoodItem key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
});

MenuFood.propTypes = {
  menu: PropTypes.object,
};

export default MenuFood;
