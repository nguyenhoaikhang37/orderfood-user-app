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
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="grid wide">
        <nav className="header__navbar hide-on-mobile-tablet">
          <ul className="header__navbar-list">
            <li className="header__navbar-item header__navbar-item--has-notify">
              <a className="header__navbar-item-link">
                <i className="header__navbar-icon far fa-bell" />
                Thông Báo
              </a>
              <div className="header__notify">
                <header className="header__notify-header">Thông báo mới nhận</header>
                <ul className="header__notify-list">
                  <li className="header__notify-item header__notify-item--viewed">
                    <a className="header__notify-link">
                      <img
                        src="https://cdn.europosters.eu/image/750webp/84830.webp"
                        className="header__notify-img"
                      />
                      <div className="header__notify-info">
                        <span className="header__notify-name">Áo thun Minecraft chính hãng</span>
                        <span className="header__notify-description">Mô tả sản phẩm</span>
                      </div>
                    </a>
                  </li>
                  <footer className="header__notify-footer">
                    <a className="header__notify-footer-btn">Xem tất cả</a>
                  </footer>
                </ul>
              </div>
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
                    <li className="signout-item">
                      <i class="fas fa-history signout-icon"></i>
                      Lịch sử đơn hàng
                    </li>
                    <li className="signout-item">
                      <i class="fas fa-ticket-alt signout-icon"></i>
                      Ví voucher
                    </li>
                    <li className="signout-item">
                      <i class="fas fa-user signout-icon"></i>
                      Cập nhật tài khoàn
                    </li>
                    <li onClick={handleSignOut} className="signout-item">
                      <i class="fas fa-sign-out-alt signout-icon"></i>
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
          <a className="header__logo-link">
            <img src={Images.LOGO2} className="header__logo-img" />
          </a>
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
          <div className="header__cart hide-on-mobile-tablet">
            <div className="header__cart-wrap">
              <i className="header__cart-icon fas fa-shopping-cart" />
              <span className="header__cart-wrap-notice">1</span>
              {/* No cart: Header__cart-list--no-cart */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
