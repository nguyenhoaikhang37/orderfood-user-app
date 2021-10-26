import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import foodApi from 'apis/foodApi';
import FoodItem from './FoodItem';
import ComboItem from './ComboItem';
import LoadingFood from 'components/Loading/LoadingFood';

const MenuFood = memo(function MenuFood({ menu }) {
  const [foodList, setFoodList] = useState([]);
  const [comboList, setComboList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await foodApi.getFoodByMenu(menu._id);
      setFoodList(res.data.menu[0].listFood);
      setComboList(res.data.menu[0].listCombo);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <LoadingFood />;
  }

  return (
    <div>
      {comboList?.length !== 0 && (
        <div id={menu._id} className="food-menu-text">
          {menu.name}
        </div>
      )}
      {foodList?.length !== 0 && (
        <div id={menu._id} className="food-menu-text">
          {menu.name}
        </div>
      )}

      <div className="food-list">
        {comboList?.map((combo) => (
          <ComboItem key={combo._id} combo={combo} />
        ))}
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
