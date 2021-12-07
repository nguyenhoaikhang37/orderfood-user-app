import { selectDetailFoodCart } from 'features/DetailStore/detailSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ButtonCart.scss';

const ButtonCart = () => {
  const foodCartList = useSelector(selectDetailFoodCart);

  return (
    <div className="fixed bottom-0 right-0">
      <div className="header__navbar-item header__navbar-item--has-notify">
        <div className=" w-16 h-16 mr-12 mb-8 cursor-pointer animate-wiggle">
          <img src="https://cdn-icons-png.flaticon.com/512/1040/1040254.png" />
        </div>
        <div className="header__notify" style={{ zIndex: '101 !important' }}>
          <header className="header__notify-header">
            Giỏ hàng <i className="fab fa-shopify checkout-heading-icon"></i>
          </header>
          {/* Empty cart */}
          {foodCartList.length === 0 && (
            <img
              src="https://travelescapemaldives.biz/jpaywebsite/img/empty_cart.png"
              style={{ width: '70%', margin: '30px auto' }}
            />
          )}

          <div className="header__notify-list">
            <ul className="children-cart">
              {foodCartList.length !== 0 &&
                foodCartList.map((food) => (
                  <li
                    key={food._id}
                    className="header__notify-btn-item header__notify-btn-item--viewed"
                  >
                    <div className="header__notify-btn-link">
                      <div className="children-info">
                        <img src={food?.photo} className="header__notify-btn-img" />
                        <div className="header__notify-btn-info">
                          <span className="header__notify-btn-name">{food?.name}</span>
                          <span className="text-xs italic text-gray-800">
                            {food?.listChoose && 'Món kèm: '}
                            {food?.listChoose?.map((choose) => choose.name).join(' ')}
                          </span>
                          <span className="header__notify-btn-description">
                            {food?.description}
                          </span>
                          <span className="header__notify-btn-go">
                            <Link to={`/detail/${food.restaurant}`}>
                              Đi tới cửa hàng <i className="fas fa-arrow-right"></i>
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="header__notify-btn-name">x {food?.quantityInCart}</span>
                        <span className="header__notify-btn-description">
                          {food?.totalFood.toLocaleString()} đ
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonCart;
