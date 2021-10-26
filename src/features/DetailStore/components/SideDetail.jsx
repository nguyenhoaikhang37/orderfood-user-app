import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Scrollspy from 'react-scrollspy';
import Loading from 'components/Loading/Loading';

const SideDetail = memo(function SideDetail({ menuList }) {
  const [menuListSlow, setMenuListSlow] = useState([]);

  useEffect(() => {
    const timeoutMenuList = () => {
      setMenuListSlow(menuList);
    };
    setTimeout(timeoutMenuList, 15000);

    return () => setTimeout(timeoutMenuList);
  }, [menuList]);

  return (
    <div className="side-detail">
      {menuListSlow.length === 0 ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="detail-heading">
            Thực đơn <i className="fas fa-hamburger"></i>
          </div>
          <ul className="detail-list">
            <Scrollspy items={menuList.map((menu) => menu._id)} currentClassName="is-current">
              {menuListSlow.map((menu) => (
                <li key={menu._id} className="detail-item">
                  {/* the a co className active */}
                  <a href={`#${menu._id}`} className="detail-link">
                    {menu.name}
                  </a>
                </li>
              ))}
            </Scrollspy>
          </ul>
        </>
      )}
    </div>
  );
});

SideDetail.propTypes = {
  menuList: PropTypes.array,
};

export default SideDetail;
