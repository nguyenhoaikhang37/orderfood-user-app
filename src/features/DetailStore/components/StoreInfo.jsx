import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectDetailFoodList } from '../detailSlice';
import LoadingInfo from 'components/Loading/LoadingInfo';
import ContentLoader from 'react-content-loader';

const StoreInfo = memo(function StoreInfo({ storeInfo, loading }) {
  const foodList = useSelector(selectDetailFoodList);
  const cloneFoodList = [...foodList];
  const smallestMoney = cloneFoodList?.sort((a, b) => a.price - b.price)[0]?.price;
  const biggestMoney = cloneFoodList?.sort((a, b) => b.price - a.price)[0]?.price;

  if (loading) {
    return (
      <div className="block max-w-6xl mx-auto mb-0">
        <LoadingInfo />
      </div>
    );
  }

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
          {storeInfo && <p>{storeInfo?.location}</p>}
          <div className="flex space-x-4 items-center">
            <p className="flex items-center" style={{ position: 'relative', color: '#5fb042' }}>
              <i style={{ fontSize: '7px', marginRight: '5px' }} className="fas fa-circle"></i>
              Mở cửa
            </p>
            <p>
              <i className="far fa-clock text-gray-500"></i> {storeInfo?.open} - {storeInfo?.close}
            </p>
          </div>
          {smallestMoney && biggestMoney ? (
            <p className="text-gray-400 font-light">
              <i className="far fa-money-bill-alt"></i> {smallestMoney?.toLocaleString()}đ -{' '}
              {biggestMoney?.toLocaleString()}đ
            </p>
          ) : (
            <ContentLoader
              speed={2}
              width={340}
              height={84}
              viewBox="0 0 340 84"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="568" y="163" rx="3" ry="3" width="67" height="11" />
              <rect x="5" y="15" rx="3" ry="3" width="140" height="15" />
              <rect x="550" y="161" rx="3" ry="3" width="53" height="11" />
              <rect x="528" y="155" rx="3" ry="3" width="72" height="11" />
              <rect x="516" y="155" rx="3" ry="3" width="100" height="11" />
              <rect x="581" y="154" rx="3" ry="3" width="37" height="11" />
              <rect x="475" y="139" rx="3" ry="3" width="140" height="11" />
              <rect x="461" y="152" rx="3" ry="3" width="173" height="11" />
            </ContentLoader>
          )}
        </div>
      </div>
    </div>
  );
});

StoreInfo.propTypes = {
  storeInfo: PropTypes.object,
  loading: PropTypes.bool,
};

export default StoreInfo;
