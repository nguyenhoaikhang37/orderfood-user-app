import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import StoreItem from './StoreItem';
import DiscountStoreItem from './DiscountStoreItem';

const StoreList = memo(function StoreList({
  storeList,
  nearStoreList,
  searchStoreList,
  discountStoreList,
}) {
  return (
    <Fragment>
      <div className="product-address">
        <i className="fas fa-map-marker-alt address-icon"></i>
        Danh sách địa chỉ quán
      </div>

      {searchStoreList.length === 0 || searchStoreList.length === 16 ? (
        <div className="home-product">
          <div className="row sm-gutter">
            {/* Store Item */}
            {storeList?.map((store) => (
              <StoreItem key={store._id} store={store} />
            ))}
          </div>
        </div>
      ) : (
        <div className="home-product">
          <div className="row sm-gutter">
            {/* Store Item */}
            {searchStoreList?.map((store) => (
              <StoreItem key={store._id} store={store} />
            ))}
          </div>
        </div>
      )}

      {nearStoreList.length !== 0 && (
        <div className="product-address">
          <i className="fas fa-map-marker-alt address-icon"></i>
          Quán gần tôi
        </div>
      )}

      <div className="home-product">
        <div className="row sm-gutter">
          {/* Store Item */}
          {nearStoreList?.map((store) => (
            <StoreItem key={store._id} store={store} />
          ))}
        </div>
      </div>

      {discountStoreList.length !== 0 && (
        <div>
          <div className="product-address mb-6">
            <i className="fas fa-tags address-icon"></i>
            Danh sách cửa hàng khuyến mãi
          </div>
          <div className="home-product">
            <div className="flex space-x-4">
              {/* Store Item */}
              {discountStoreList.map((store) => (
                <DiscountStoreItem key={store._id} store={store} />
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
});

StoreList.propTypes = {
  storeList: PropTypes.array,
};

export default StoreList;
