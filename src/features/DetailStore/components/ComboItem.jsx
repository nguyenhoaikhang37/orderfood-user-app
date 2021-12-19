import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Popup from 'components/Popup';
import PopupCombo from './PopupCombo';

const ComboItem = ({ combo }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <div className="food-item">
        <div className="food-item-left">
          <img className="food-img" src={combo?.photo} />
          <div className="food-text-info">
            <h4 className="food-name">{combo?.name}</h4>
            <p className="food-desc">{combo?.description}</p>
          </div>
        </div>
        <div className="food-price-info">
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
          <button onClick={() => handleOpen()} className="food-price-add">
            <i className="fas fa-plus-square food-price-icon"></i>
          </button>
        </div>
      </div>
      <Popup open={open} setOpen={setOpen} handleClose={handleClose}>
        <PopupCombo setOpen={setOpen} combo={combo} />
      </Popup>
    </Fragment>
  );
};

ComboItem.propTypes = {
  combo: PropTypes.object,
};

export default ComboItem;
