import NotFound from 'components/NotFound';
import { ACCESS_TOKEN } from 'constants/global';
import Auth from 'features/Auth';
import { getUserToken } from 'features/Auth/authSlice';
import DetailStore from 'features/DetailStore';
import { detailActions } from 'features/DetailStore/detailSlice';
import Store from 'features/Store';
import { fetchCategoryList, fetchMenuList, fetchStoreList } from 'features/Store/storeSlice';
import { createBrowserHistory } from 'history';
import HomeLayout from 'layouts/Home';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import './App.scss';
import './assets/styles/grid.scss';
export const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem(ACCESS_TOKEN);

  useEffect(() => {
    dispatch(fetchCategoryList());
    dispatch(fetchMenuList());
    dispatch(fetchStoreList());
    dispatch(getUserToken(token));
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <HomeLayout exact path="/" Component={Store} />
        <HomeLayout exact path="/detail/:id" Component={DetailStore} />

        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
