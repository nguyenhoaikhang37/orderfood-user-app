import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';
import MenuFood from './MenuFood';

const FeedDetail = memo(function FeedDetail({ menuList, loading }) {
  return (
    <div className="main">
      {loading ? (
        <LinearProgress />
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
