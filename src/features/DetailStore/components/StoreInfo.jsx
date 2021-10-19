import React, { memo } from 'react';
import PropTypes from 'prop-types';

const StoreInfo = memo(function StoreInfo({ storeInfo }) {
  return (
    <div style={{ background: '#fff' }}>
      <div className="block max-w-sm py-8 gap-3 mx-auto sm:max-w-6xl group  lg:grid lg:grid-cols-12 bg-coolGray-50">
        <img
          src={storeInfo?.photo}
          className="object-cover w-full h-64 rounded sm:h-80 lg:col-span-5 bg-coolGray-500"
        />
        <div className="p-6 space-y-2 lg:col-span-7">
          <p className="text-sm text-gray-500">QUÁN ĂN</p>
          <h3 className="text-2xl font-semibold sm:text-4xl">{storeInfo && storeInfo.name}</h3>
          <span className="text-xs text-coolGray-600 italic">
            Giao hàng trong: {storeInfo?.duration}
          </span>
          {storeInfo && (
            <p>
              {storeInfo?.location.street}, {storeInfo?.location.ward},{' '}
              {storeInfo?.location.district},{storeInfo?.location.city}.
            </p>
          )}
          <div className="flex space-x-4 items-center">
            <p className="flex items-center" style={{ position: 'relative', color: '#5fb042' }}>
              <i style={{ fontSize: '7px', marginRight: '5px' }} className="fas fa-circle"></i>
              Mở cửa
            </p>
            <p>
              <i className="far fa-clock text-gray-500"></i> {storeInfo?.open} - {storeInfo?.close}
            </p>
          </div>
          <p className="text-gray-400 font-light">
            <i className="far fa-money-bill-alt"></i> 6000 - 50000
          </p>
        </div>
      </div>
    </div>
  );
});

StoreInfo.propTypes = {
  storeInfo: PropTypes.object,
};

export default StoreInfo;
