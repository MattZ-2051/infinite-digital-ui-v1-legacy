import React from 'react';
import AddFunds from 'views/Wallet/CCDeposit/AddFunds';
import SuccessPage from 'views/Wallet/CCDeposit/SuccessPage';
import ErrorPage from 'views/Wallet/CCDeposit/ErrorPage';
import AddCC from 'views/Wallet/AddCC';
import { Switch, Route, useLocation } from 'react-router-dom';
import PrivateRoute from 'router/PrivateRoute';
import Landing from 'views/Landing';
import MarketPlace from 'views/MarketPlace';
import SkuDetail from 'views/Sku/SkuDetail';
import Wallet from 'views/Wallet';
import Collectors from 'views/Sku/Collectors';
import Collection from 'views/Collection';
import Coinbase from 'views/Wallet/Coinbase';

const UnderConstruction = () => <h1>Under construction :)</h1>;

const RouterComponent = () => {
  const location: any = useLocation();
  const background = location.state && location.state.background;

  return (
    <Switch location={background || location}>
      <Route exact path="/" component={Landing} />

      {/* MarketPlace */}
      <Route exact path="/marketplace" component={MarketPlace} />

      {/* Sku */}
      <Route exact path="/marketplace/:skuid" component={SkuDetail} />
      <Route path="/marketplace/:skuid/collectors" component={Collectors} />

      {/* User */}
      <PrivateRoute exact path="/wallet/:userId" component={Wallet} />
      <PrivateRoute
        exact
        path="/wallet/:userId/deposit/addfunds"
        component={AddFunds}
      />
      <PrivateRoute
        exact
        path="/wallet/:userId/deposit/success"
        component={SuccessPage}
      />
      <PrivateRoute
        exact
        path="/wallet/:userId/addcreditcard"
        component={AddCC}
      />
      <PrivateRoute
        exact
        path="/wallet/:userId/deposit/error"
        component={ErrorPage}
      />

      <PrivateRoute exact path="/coinbase" component={Coinbase} />
      <Route path="/collection/:userId" component={Collection} />

      {/* All */}
      <Route path="/example" component={UnderConstruction} />
    </Switch>
  );
};

export default RouterComponent;
