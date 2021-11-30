import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StoreItem = memo(function StoreItem({ store }) {
  return (
    <div className="col l-2-4 m-4 c-6 home-product-item flex flex-col">
      <Link to={`/detail/${store._id}`}>
        <img src={store.photo} className="home-product-item__img flex-shrink-0" />
      </Link>
      <div className="flex-1 flex flex-col">
        <div className="home-product-item__name flex-shrink-0">
          <Link to={`/detail/${store._id}`}> {store.name}</Link>
        </div>
        <div className="home-product-item__secon">{store?.location}</div>
        <div className="home-product-item__action mt-auto">
          <div className="home-product-item__rating">
            <i className="home-product-item__star--gold fas fa-star" />
            <i className="home-product-item__star--gold fas fa-star" />
            <i className="home-product-item__star--gold fas fa-star" />
            <i className="home-product-item__star--gold fas fa-star" />
            <i className="fas fa-star" />
          </div>
          <span className="home-product-item__sold">10 đã bán</span>
        </div>
        <div className="product-favourite">
          <i className="fas fa-check" />
          <span>Yêu thích</span>
        </div>
      </div>
    </div>
  );
});

StoreItem.propTypes = {
  store: PropTypes.object,
};

export default StoreItem;
