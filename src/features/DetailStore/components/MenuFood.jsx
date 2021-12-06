import React, { memo } from 'react';
import PropTypes from 'prop-types';
import foodApi from 'apis/foodApi';
import FoodItem from './FoodItem';
import ComboItem from './ComboItem';
import LoadingFood from 'components/Loading/LoadingFood';
import { useQuery } from 'react-query';

const fetchFoodByMenu = async (id) => {
  const res = await foodApi.getFoodByMenu(id);
  return res.data;
};

const MenuFood = memo(function MenuFood({ menu }) {
  const { data, status } = useQuery(`${menu._id}`, () => fetchFoodByMenu(menu._id));

  if (status === 'loading') {
    return <LoadingFood />;
  }

  return (
    <div>
      {data.menu[0].listCombo?.length !== 0 && (
        <div id={menu._id} className="food-menu-text">
          {menu.name}
        </div>
      )}
      {data.menu[0].listFood?.length !== 0 && (
        <div id={menu._id} className="food-menu-text">
          {menu.name}
        </div>
      )}

      <div className="food-list">
        {data.menu[0].listCombo?.map((combo) => (
          <ComboItem key={combo._id} combo={combo} />
        ))}
        {data.menu[0].listFood?.map((food) => (
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
