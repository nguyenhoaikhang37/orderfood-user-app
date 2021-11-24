import { selectStoreList, selectStoreLoading } from 'features/Store/storeSlice';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router';
import Checkout from './components/Checkout';
import FeedDetail from './components/FeedDetail';
import SideDetail from './components/SideDetail';
import StoreInfo from './components/StoreInfo';
import './DetailStore.scss';
import {
  detailActions,
  fetchFoodByRes,
  selectDetailFoodCart,
  selectDetailLoading,
} from './detailSlice';
import orderApi from 'apis/orderApi';
import menuApi from 'apis/menuApi';
import Swal from 'sweetalert2';

const DetailStore = () => {
  const dispatch = useDispatch();
  const storeList = useSelector(selectStoreList);
  const loadingStoreInfo = useSelector(selectStoreLoading);
  const foodCart = useSelector(selectDetailFoodCart);
  const loadingFood = useSelector(selectDetailLoading);

  const history = useHistory();
  const idParams = useParams();
  const storeById = storeList.filter((store) => store._id === idParams.id)[0];

  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await menuApi.getMenuListByResId(idParams.id);
      setMenuList(res.data.menu);
    })();
  }, []);

  useEffect(() => {
    dispatch(fetchFoodByRes(idParams.id));
  }, []);

  const handleCheckout = async ({ foodCart, totalCart, pay }) => {
    try {
      const checkoutCart = {
        arrayFood: foodCart
          .filter((food) => !food.comboDetails)
          .map((cart) => ({
            idFood: cart._id,
            quantityFood: cart.quantityInCart,
            amount: cart.totalFood,
            listChoose: cart.listChoose,
          })),
        arrayCombo: foodCart
          .filter((food) => food.comboDetails)
          .map((cart) => ({
            idCombo: cart._id,
            quantityCombo: cart.quantityInCart,
            amount: cart.totalFood,
          })),
        restaurant: storeById._id,
        pay,
        ship: 10000,
        total: totalCart,
      };
      console.log({ checkoutCart });

      setLoading(true);
      const { data } = await orderApi.checkout(checkoutCart);
      if (!data.success) {
        Swal.fire({
          icon: 'error',
          title: `${data.message}`,
        });
        return;
      }
      if (data.success) {
        setLoading(false);
        Swal.fire('Success!', 'Bạn đã thanh toán thành công.', 'success');
        history.push('/');
        dispatch(detailActions.deleteFoodCartByRes(idParams.id));
        setIsError(false);
      }
    } catch (error) {
      setIsError(true);
      console.log('🚀 ~ file: index.jsx ~ line 31 ~ handleCheckout ~ error', error);
    }
    setLoading(false);
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
          <Checkout
            idParams={idParams}
            onCheckout={handleCheckout}
            foodCart={foodCart}
            loading={loading}
            storeById={storeById}
            isError={isError}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default DetailStore;
