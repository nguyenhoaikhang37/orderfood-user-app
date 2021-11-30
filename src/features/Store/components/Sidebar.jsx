import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Sidebar = memo(function Sidebar({ categoryList, activeCate, onChangeCate }) {
  const handleClick = (id) => {
    onChangeCate?.(id);
  };

  return (
    <div className="side">
      <div className="navigator-heading">
        <i className="fas fa-th-large navigator-icon-heading"></i>Danh mục món ăn
      </div>
      <ul className="navigator-list">
        <li onClick={() => handleClick('all')} className="navigator-item">
          <a style={activeCate === 'all' ? { color: '#fd452b' } : {}} className="navigator-link">
            Tất cả
          </a>
          <i
            style={activeCate === 'all' ? { color: '#fd452b' } : {}}
            className="fas fa-angle-right navigator-icon"
          ></i>
        </li>
        {categoryList?.map((category) => (
          <li
            onClick={() => handleClick(category?._id)}
            key={category?._id}
            className="navigator-item"
          >
            <a
              style={activeCate === category?._id ? { color: '#fd452b' } : {}}
              className="navigator-link"
            >
              {category?.name}
            </a>
            <i
              style={activeCate === category?._id ? { color: '#fd452b' } : {}}
              className="fas fa-angle-right navigator-icon"
            ></i>
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
