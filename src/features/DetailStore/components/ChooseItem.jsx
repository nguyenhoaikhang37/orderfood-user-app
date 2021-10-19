import React, { Fragment, memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, CircularProgress } from '@mui/material';
import listChooseApi from 'apis/listChooseApi';

const ChooseItem = memo(function ChooseItem({ chooseItem, handleAddChoose }) {
  const [choose, setChoose] = useState([]);
  const [checked, setChecked] = useState([]);
  console.log(chooseItem);
  useEffect(() => {
    (async () => {
      const res = await listChooseApi.getListChooseById(chooseItem._id);
      setChoose(res.data.listChoose);
    })();
  }, []);

  useEffect(() => {
    handleAddChoose(checked);
  }, [checked]);

  const handleCheck = (item) => {
    setChecked((prev) => {
      const isChecked = checked.includes(item);
      if (isChecked) {
        return checked.filter((checkItem) => checkItem._id !== item._id);
      }
      return [...prev, item];
    });
  };
  return (
    <Fragment>
      {choose.length !== 0 ? (
        choose.map((item) => (
          <div key={item?._id} className="popup-checkbox-item">
            <Checkbox checked={checked.includes(item)} onChange={() => handleCheck(item)} />
            <label className="popup-item-info">
              <label className="text-gray-900">{item?.name}</label>
              <p className="popup-item-price">{item?.price.toLocaleString()}đ</p>
            </label>
          </div>
        ))
      ) : (
        <CircularProgress size="1.5rem" />
      )}
    </Fragment>
  );
});

ChooseItem.propTypes = {
  chooseItem: PropTypes.object,
};

export default ChooseItem;
