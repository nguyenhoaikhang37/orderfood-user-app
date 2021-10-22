import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ChooseItem from './ChooseItem';

const ChooseList = memo(function ListChoose({ checked, setChecked, chooseList }) {
  return (
    <div className="popup-box">
      {chooseList.map((choose) => (
        <div key={choose?._id}>
          <div className="popup-item">
            <h4 className="popup-item-title">{choose?.name}</h4>
            <div className="popup-checkbox-list">
              <ChooseItem
                isChoose={choose.choose}
                chooseItem={choose}
                checked={checked}
                setChecked={setChecked}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

ChooseList.propTypes = {
  chooseList: PropTypes.array,
};

export default ChooseList;
