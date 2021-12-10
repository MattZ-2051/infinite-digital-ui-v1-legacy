import { useEffect } from 'react';
import AddFunds from 'views/Wallet/CCDeposit/AddFunds';
import SuccessPage from 'views/Wallet/CCDeposit/SuccessPage';
import ErrorPage from 'views/Wallet/CCDeposit/ErrorPage';
import AddCC from 'views/Wallet/AddCC';
import { Switch, Route, useLocation } from 'react-router-dom';
import PrivateRoute from 'router/PrivateRoute';
import Landing from 'views/Landing';
import MarketPlace from 'views/MarketPlace';
import Collection from 'views/Collection';
import Wallet from 'views/Wallet';
import SkuDetail from 'views/Sku/SkuDetail';
import Collectors from 'views/Sku/Collectors';
import Product from 'views/Product';
import TC from 'views/Legal/tc';
import Privacy from 'views/Legal/privacy';
import Help from 'views/Legal/help';
import NotFound from 'views/NotFound';
import Vip from 'views/VIP';
import Maintenance from 'views/Maintenance';
import { config } from 'config';

const UnderConstruction = () => <h1>Under construction :)</h1>;

const RouterComponent = ({ setFooterBackground }): JSX.Element => {
  const location: any = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    if (location.pathname === '/') {
      setFooterBackground('green');
    } else {
      setFooterBackground('black');
    }
  });

  return (
    <Switch location={background || location}>
      <Route exact path="/" component={Landing} />
      {/* VIP Page */}
      <Route exact path="/vip" component={Vip} />
      {/* MarketPlace */}
      <Route exact path="/marketplace" component={MarketPlace} />
      {/* Product */}
      <Route exact path="/product/:productId" component={Product} />
      {/* Sku */}
      <Route exact path="/marketplace/:skuid" component={SkuDetail} />
      <Route path="/:skuid/collectors" component={Collectors} />

      {/* User */}
      <PrivateRoute exact path="/wallet" component={Wallet} />
      <PrivateRoute
        exact
        path="/wallet/deposit/addfunds"
        component={AddFunds}
      />
      <PrivateRoute
        exact
        path="/wallet/deposit/success"
        component={SuccessPage}
      />
      <PrivateRoute exact path="/wallet/addcreditcard" component={AddCC} />
      <PrivateRoute exact path="/wallet/deposit/error" component={ErrorPage} />

      <Route path="/collection/:username" component={Collection} />

      {/* Legal */}
      <Route path="/terms" component={TC} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/help" component={Help} />
      {/* All */}
      <Route path="/example" component={UnderConstruction} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default RouterComponent;
