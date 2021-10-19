import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Filter = memo(function Filter(props) {
  return (
    <div className="side-top">
      <div className="home-filter">
        <span className="home-filter__label">Sắp xếp theo</span>
        <button className="home-filter__btn btn">Phổ biến</button>
        <button className="home-filter__btn btn btn--primary">Mới nhất</button>
        <button className="home-filter__btn btn">Bán chạy</button>
        <div className="select-input">
          <span className="select-input__label">Giá</span>
          <i className="select-input__icon fas fa-angle-down" />
          <ul className="select-input__list">
            <li className="select-input__item">Giá: Thấp đến cao</li>
            <li className="select-input__item">Giá: Cao đến thấp</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

Filter.propTypes = {};

export default Filter;
