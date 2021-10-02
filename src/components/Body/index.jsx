import React from 'react';
import './Body.scss';

const Aaaa = () => {
  return (
    <div className="container">
      <div className="content">
        <div className="side">
          <div className="navigator-heading">
            <i className="fas fa-th-large navigator-icon-heading"></i>Danh mục món ăn
          </div>
          <ul className="navigator-list">
            <li className="navigator-item active">
              <a href="#" className="navigator-link">
                Đồ ăn
              </a>
              <i className="fas fa-angle-right navigator-icon"></i>
            </li>
            <li className="navigator-item">
              <a href="#" className="navigator-link">
                Đồ ăn
              </a>
              <i className="fas fa-angle-right navigator-icon"></i>
            </li>
            <li className="navigator-item">
              <a href="#" className="navigator-link">
                Đồ ăn
              </a>
              <i className="fas fa-angle-right navigator-icon"></i>
            </li>
            <li className="navigator-item">
              <a href="#" className="navigator-link">
                Đồ ăn
              </a>
              <i className="fas fa-angle-right navigator-icon"></i>
            </li>
            <li className="navigator-item">
              <a href="#" className="navigator-link">
                Đồ ăn
              </a>
              <i className="fas fa-angle-right navigator-icon"></i>
            </li>
          </ul>
        </div>
        <div className="main">
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
          <div className="product-address">
            <i className="fas fa-map-marker-alt address-icon"></i>
            Danh sách địa chỉ quán
          </div>

          <div className="home-product">
            <div className="row sm-gutter">
              <div className="col l-2-4 m-4 c-6">
                <a className="home-product-item">
                  <img
                    src="https://images.foody.vn/res/g109/1088422/prof/s750x400/file_restaurant_photo_2s1k_16271-56409e7c-210724160741.jpg"
                    className="home-product-item__img"
                  />
                  <div className="home-product-item__name">Bún Bò Đất Thánh - Shop Online</div>
                  <div className="home-product-item__secon">
                    221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM
                  </div>
                  <div className="home-product-item__action">
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
                </a>
              </div>
            </div>
          </div>
          <div className="product-food">
            <i className="fas fa-utensils address-icon"></i>
            Danh sách các món ăn
          </div>

          <div className="home-product">
            <div className="row sm-gutter">
              <div className="col l-2-4 m-4 c-6">
                <a className="home-product-item">
                  <img
                    src="https://images.foody.vn/res/g109/1088422/prof/s750x400/file_restaurant_photo_2s1k_16271-56409e7c-210724160741.jpg"
                    className="home-product-item__img"
                  />
                  <div className="home-product-item__name">Bún Bò Đất Thánh - Shop Online</div>
                  <div className="home-product-item__secon">
                    221/16 Đất Thánh, P. 6, Tân Bình, TP. HCM
                  </div>
                  <div className="home-product-item__action">
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aaaa;
