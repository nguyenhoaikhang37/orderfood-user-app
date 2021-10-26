import React, { memo } from 'react';
import PropTypes from 'prop-types';
import MenuFood from './MenuFood';
import LoadingFood from 'components/Loading/LoadingFood';

const FeedDetail = memo(function FeedDetail({ menuList, loading }) {
  return (
    <div className="main">
      {loading ? (
        <LoadingFood />
      ) : (
        <div className="food-box">
          {menuList.map((menu) => (
            <MenuFood key={menu._id} menu={menu} />
          ))}
        </div>
      )}
    </div>
  );
});

FeedDetail.propTypes = {
  menuList: PropTypes.array,
  loading: PropTypes.bool,
};

export default FeedDetail;
