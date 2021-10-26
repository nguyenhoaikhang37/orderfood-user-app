import {
  selectStoreList,
  selectStoreLoading,
  selectStoreMenuList,
} from 'features/Store/storeSlice';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Checkout from './components/Checkout';
import FeedDetail from './components/FeedDetail';
import SideDetail from './components/SideDetail';
import StoreInfo from './components/StoreInfo';
import './DetailStore.scss';
import { fetchFoodByRes, selectDetailFoodCart, selectDetailLoading } from './detailSlice';
import orderApi from 'apis/orderApi';
import menuApi from 'apis/menuApi';

const DetailStore = () => {
  const dispatch = useDispatch();
  const storeList = useSelector(selectStoreList);
  const loadingStoreInfo = useSelector(selectStoreLoading);
  const foodCart = useSelector(selectDetailFoodCart);
  const loadingFood = useSelector(selectDetailLoading);

  const idParams = useParams();
  const storeById = storeList.filter((store) => store._id === idParams.id)[0];

  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await menuApi.getMenuListByResId(idParams.id);
      setMenuList(res.data.menu);
    })();
  }, []);

  useEffect(() => {
    dispatch(fetchFoodByRes(idParams.id));
  }, []);

  const handleCheckout = async ({ foodCart, totalCart }) => {
    try {
      const checkoutCart = {
        foods: foodCart.map((cart) => ({
          food: cart._id,
          quantityInCart: cart.quantityInCart,
          totalFood: cart.totalFood,
          listChoose: cart.choose,
        })),
        restaurant: storeById._id,
        pay: '61614a21855f83b83e611b80',
        ship: 10000,
        total: totalCart,
      };
      console.log(checkoutCart);
      const res = await orderApi.checkout(checkoutCart);
      console.log('thanh cong thanh toan');
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 31 ~ handleCheckout ~ error', error);
    }
  };

  return (
    <Fragment>
      {/* Store Info */}
      <StoreInfo storeInfo={storeById} loading={loadingStoreInfo} />
      <div style={{ background: '#f2f2f2' }}>
        <div className="content max-w-sm mx-auto sm:max-w-6xl">
          {/* Side Detail */}
          <SideDetail menuList={menuList} />
          {/* Feed Detail */}
          <FeedDetail loading={loadingFood} menuList={menuList} />
          {/* Checkout */}
          <Checkout idParams={idParams} onCheckout={handleCheckout} foodCart={foodCart} />
        </div>
      </div>
    </Fragment>
  );
};

export default DetailStore;