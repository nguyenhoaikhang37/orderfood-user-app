import { LinearProgress } from '@mui/material';
import { detailActions } from 'features/DetailStore/detailSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from './components/Filter';
import Sidebar from './components/Sidebar';
import StoreList from './components/StoreList';
import './Store.scss';
import { selectStoreList, selectStoreLoading, selectStoreCategoryList } from './storeSlice';

const Store = () => {
  const loadingStore = useSelector(selectStoreLoading);
  const categoryList = useSelector(selectStoreCategoryList);
  const storeList = useSelector(selectStoreList);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(detailActions.deleteAllFoodCart());
  }, []);

  return (
    <div className="container">
      <div className="content">
        {/* Sidebar */}
        <Sidebar categoryList={categoryList} />
        {/* Feed */}
        <div className="store-main">
          {/* Filter */}
          <Filter />
          {/* Store List */}
          {loadingStore ? (
            <LinearProgress style={{ marginTop: '40px' }} />
          ) : (
            <StoreList storeList={storeList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
