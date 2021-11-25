import NotFound from 'components/NotFound';
import { ACCESS_TOKEN } from 'constants/global';
import Auth from 'features/Auth';
import { getUserToken, selectAuthUser } from 'features/Auth/authSlice';
import {
  fetchCategoryList,
  fetchMenuList,
  fetchNearStoreList,
  fetchStoreList,
} from 'features/Store/storeSlice';
import { createBrowserHistory } from 'history';
import HomeLayout from 'layouts/Home';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import './App.scss';
import './assets/styles/grid.scss';
export const history = createBrowserHistory();

const Store = lazy(() => import('features/Store'));
const DetailStore = lazy(() => import('features/DetailStore'));
const OrderHistory = lazy(() => import('features/OrderHistory'));

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const user = useSelector(selectAuthUser);

  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchMenuList());
    dispatch(fetchStoreList());
    dispatch(getUserToken(token));
    if (user._id) {
      dispatch(fetchNearStoreList({ lat: user?.profile?.lat, lng: user?.profile?.lng }));
    }
  }, [user._id]);

  return (
    <Router history={history}>
      <Suspense fallback={<div>...Loading</div>}>
        <Switch>
          <HomeLayout exact path="/" Component={Store} />
          <HomeLayout exact path="/detail/:id" Component={DetailStore} />
          <HomeLayout exact path="/order-history" Component={OrderHistory} />

          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
