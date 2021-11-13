import { LinearProgress } from '@mui/material';
import Hero from 'components/Hero';
import ListStep from 'components/ListStep';
import React from 'react';
import { useSelector } from 'react-redux';
import Filter from './components/Filter';
import Sidebar from './components/Sidebar';
import StoreList from './components/StoreList';
import './Store.scss';
import { selectStoreCategoryList, selectStoreList, selectStoreLoading } from './storeSlice';

const Store = () => {
  const loadingStore = useSelector(selectStoreLoading);
  const categoryList = useSelector(selectStoreCategoryList);
  const storeList = useSelector(selectStoreList);

  return (
    <div className="container">
      <Hero />
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
      <ListStep />
    </div>
  );
};

export default Store;
