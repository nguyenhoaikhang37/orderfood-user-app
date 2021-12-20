import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { detailActions } from '../detailSlice';

const PopupCombo = ({ combo, setOpen }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // console.log(combo);
    dispatch(detailActions.addFoodToCart(combo));
    setOpen(false);
  };

  return (
    <div>
      {/* Popup Combo Header */}
      <div className="flex items-center space-x-8 popup-content">
        <div className="popup-img">
          <img src={combo?.photo} />
        </div>
        <div>
          <h3 className="font-bold text-xl">{combo?.name}</h3>
          <p className="font-light text-gray-400 my-2">{combo?.description}</p>
          <div className="flex space-x-2">
            <p>Giá: </p>
            <div className="flex flex-col">
              <p className="food-price-prev">
                {combo?.price.toLocaleString()}{' '}
                <span
                  style={{
                    fontWeight: '400',
                    position: 'relative',
                    top: '-9px',
                    fontSize: '10px',
                    right: '0',
                  }}
                >
                  đ
                </span>
              </p>
              <p className="food-price">
                {combo?.lastPrice.toLocaleString()}{' '}
                <span
                  style={{
                    fontWeight: '400',
                    position: 'relative',
                    top: '-9px',
                    fontSize: '10px',
                    right: '0',
                  }}
                >
                  đ
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Popup Food List Choose */}
      {/* Popup Food Footer */}
      <div className="popup-footer">
        <div></div>
        <button onClick={handleAddToCart} className="popup-btn mt-4">
          OK + {combo?.lastPrice.toLocaleString()}{' '}
          <span
            style={{
              fontWeight: '400',
              position: 'relative',
              top: '-9px',
              fontSize: '10px',
              right: '0',
            }}
          >
            đ
          </span>
        </button>
      </div>
    </div>
  );
};

PopupCombo.propTypes = {
  combo: PropTypes.object,
};

export default PopupCombo;
