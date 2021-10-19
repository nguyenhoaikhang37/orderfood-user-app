import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Sidebar = memo(function Sidebar({ categoryList }) {
  return (
    <div className="side">
      <div className="navigator-heading">
        <i className="fas fa-th-large navigator-icon-heading"></i>Danh mục món ăn
      </div>
      <ul className="navigator-list">
        {categoryList.map((category) => (
          // li co className active
          <li key={category._id} className="navigator-item">
            <a className="navigator-link">{category.name}</a>
            <i className="fas fa-angle-right navigator-icon"></i>
          </li>
        ))}
      </ul>
    </div>
  );
});

Sidebar.propTypes = {
  categoryList: PropTypes.array,
};

export default Sidebar;
