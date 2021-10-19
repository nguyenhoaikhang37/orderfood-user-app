import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import StoreItem from './StoreItem';

const StoreList = memo(function StoreList({ storeList }) {
  return (
    <Fragment>
      <div className="product-address">
        <i className="fas fa-map-marker-alt address-icon"></i>
        Danh sách địa chỉ quán
      </div>

      <div className="home-product">
        <div className="row sm-gutter">
          {/* Store Item */}
          {storeList.map((store) => (
            <StoreItem key={store._id} store={store} />
          ))}
        </div>
      </div>
    </Fragment>
  );
});

StoreList.propTypes = {
  storeList: PropTypes.array,
};

export default StoreList;
