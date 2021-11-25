import { LinearProgress } from '@mui/material';
import axios from 'axios';
import Hero from 'components/Hero';
import ListStep from 'components/ListStep';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Filter from './components/Filter';
import Sidebar from './components/Sidebar';
import StoreList from './components/StoreList';
import './Store.scss';
import {
  selectNearStoreList,
  selectSearchStoreList,
  selectStoreCategoryList,
  selectStoreList,
  selectStoreLoading,
} from './storeSlice';

const Store = () => {
  const loadingStore = useSelector(selectStoreLoading);
  const categoryList = useSelector(selectStoreCategoryList);
  const storeList = useSelector(selectStoreList);
  const nearStoreList = useSelector(selectNearStoreList);
  const searchStoreList = useSelector(selectSearchStoreList);
  console.log('🚀 ~ file: index.jsx ~ line 25 ~ Store ~ searchStoreList', searchStoreList);

  const [filterStore, setFilterStore] = useState();
  const [activeCate, setActiveCate] = useState('all');

  useEffect(() => {
    if (activeCate === 'all') setFilterStore(storeList);
  }, [activeCate, storeList]);

  const handleChangeCategory = async (id) => {
    try {
      const res = await axios.get(
        `https://server-express-foodapp.herokuapp.com/api/restaurant/category/${id}`
      );
      setFilterStore(res.data.restaurant);
      setActiveCate(id);
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 21 ~ handleChangeCategory ~ error', error);
    }
  };

  return (
    <>
      <Hero />
      <div className="container">
        <div className="content">
          {/* Sidebar */}
          <Sidebar
            activeCate={activeCate}
            onChangeCate={handleChangeCategory}
            categoryList={categoryList}
          />
          {/* Feed */}
          <div className="store-main">
            {/* Filter */}
            {/* <Filter /> */}
            {/* Store List */}
            {loadingStore ? (
              <LinearProgress style={{ marginTop: '40px' }} />
            ) : (
              <StoreList
                storeList={filterStore}
                nearStoreList={nearStoreList}
                searchStoreList={searchStoreList}
              />
            )}
          </div>
        </div>
        <ListStep />
      </div>
    </>
  );
};

export default Store;
