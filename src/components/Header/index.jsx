import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import Images from 'constants/images';
import { useSelector } from 'react-redux';
import { selectAuthUser } from 'features/Auth/authSlice';
import Avatar from '@mui/material/Avatar';
import { ACCESS_TOKEN } from 'constants/global';

const Header = () => {
  const user = useSelector(selectAuthUser);

  const handleSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem('food_cart');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="grid wide">
        <nav className="header__navbar hide-on-mobile-tablet">
          <ul className="header__navbar-list">
            <li className="header__navbar-item">
              <a className="header__navbar-item-link">
                <i className="header__navbar-icon far fa-bell" />
                Thông Báo
              </a>
            </li>
            <li className="header__navbar-item">
              <a className="header__navbar-item-link">
                <i className="header__navbar-icon far fa-question-circle" />
                Trợ Giúp
              </a>
            </li>
            {!user ? (
              <>
                <li id="register-item" className="header__navbar-item header__navbar-item-separate">
                  <Link style={{ color: '#fff' }} to="auth/signup">
                    Đăng Ký
                  </Link>
                </li>
                <li id="login-item" className="header__navbar-item">
                  <Link style={{ color: '#fff' }} to="auth/signin">
                    Đăng Nhập
                  </Link>
                </li>
              </>
            ) : (
              <div className="header-cur">
                <div className="header-avt">
                  <Avatar sx={{ width: 30, height: 30 }}>
                    {user?.profile?.fullName.slice(0, 1)}
                  </Avatar>
                  <p>{user?.profile?.fullName}</p>
                </div>
                <div className="header__cart-list">
                  <ul className="signout-list">
                    <li>
                      <Link to="/order-history" className="signout-item">
                        <i className="fas fa-history signout-icon"></i>
                        Lịch sử đơn hàng
                      </Link>
                    </li>
                    <li className="signout-item">
                      <i className="fas fa-ticket-alt signout-icon"></i>
                      Ví voucher
                    </li>
                    <li className="signout-item">
                      <i className="fas fa-user signout-icon"></i>
                      Cập nhật tài khoàn
                    </li>
                    <li onClick={handleSignOut} className="signout-item">
                      <i className="fas fa-sign-out-alt signout-icon"></i>
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </ul>
        </nav>
        <input type="checkbox" hidden className="nav__input" id="nav-mobile-input" />

        <label htmlFor="nav-mobile-input" className="nav__overlay" />
        {/* Header-with-search */}
        <div className="header-with-search">
          <Link to="/" className="header__logo-link">
            <img src={Images.LOGO2} className="header__logo-img" />
          </Link>
          <div className="header__search">
            <div className="header__search-input-wrap">
              <input
                type="text"
                className="header__search-input"
                placeholder="Tìm địa điểm, món ăn, địa chỉ,..."
              />
              <i className="header__search-camera fas fa-camera " />
              {/* Search history */}
              <div className="header__search-history">
                <div className="header__search-history-heading">Lịch sử tìm kiếm</div>
                <ul className="header__search-history-list">
                  <li className="header__search-history-item">
                    <a href="#">Đồ chơi</a>
                  </li>
                  <li className="header__search-history-item">
                    <a href="#">Cặp sách</a>
                  </li>
                </ul>
              </div>
            </div>
            <button className="header__search-btn hide-on-mobile-tablet">
              <i className="header__search-btn-icon fas fa-search" />
            </button>
          </div>
          <button className="header__search-fillter-wrapper clear-btn">
            <i className="header__search-fillter-icon fas fa-filter" />
            <span className="header__search-fillter-text">Lọc</span>
          </button>
          {/* Cart layout */}
          <div className="header__cart hide-on-mobile-tablet"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
