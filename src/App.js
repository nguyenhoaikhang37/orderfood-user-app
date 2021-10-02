import Body from 'components/Body';
import './App.scss';
import './assets/styles/grid.scss';
import Header from './components/Header';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Auth from 'features/Auth';
import NotFound from 'components/NotFound';
import HomeLayout from 'layouts/Home';
import Aaaa from 'components/Body';
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeLayout exact path="/" Component={Aaaa} />

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
