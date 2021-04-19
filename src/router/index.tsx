import { Switch, Route, useLocation } from "react-router-dom";
import PrivateRoute from "router/PrivateRoute";
import Landing from "views/Landing";
import MarketPlace from "views/MarketPlace";
import MarketPlaceSku from "views/MarketPlace/MarketPlaceSku";
import Wallet from "views/Wallet";
import AddFunds from "views/Wallet/CCDeposit/AddFunds";
import SuccessPage from "views/Wallet/CCDeposit/SuccessPage";
import ErrorPage from "views/Wallet/CCDeposit/ErrorPage";
import AddCC from "views/Wallet/AddCC";

const UnderConstruction = () => <h1>Under construction :)</h1>;

const RouterComponent = () => {
  let location: any = useLocation();
  let background = location.state && location.state.background;

  return (
    <Switch location={background || location}>
      <Route exact path="/" component={Landing} />

      {/* MarketPlace */}
      <Route exact path="/marketplace" component={MarketPlace} />
      <Route path="/marketplace/:skuid" component={MarketPlaceSku} />

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
        path="/wallet/:userId/addCreditCard"
        component={AddCC}
      />
      <PrivateRoute
        exact
        path="/wallet/:userId/deposit/error"
        component={ErrorPage}
      />
      {/* All */}
      <Route path="/example" component={UnderConstruction} />
    </Switch>
  );
};

export default RouterComponent;
