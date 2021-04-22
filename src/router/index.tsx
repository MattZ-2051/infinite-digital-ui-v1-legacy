import { Switch, Route, useLocation } from "react-router-dom";
import Collection from "views/Collection";
import PrivateRoute from "router/PrivateRoute";
import Landing from "views/Landing";
import MarketPlace from "views/MarketPlace";
import SkuDetail from "views/Sku/SkuDetail";
import Wallet from "views/Wallet";
import Collectors from "views/Sku/Collectors";

const UnderConstruction = () => <h1>Under construction :)</h1>;

const RouterComponent = () => {
  let location: any = useLocation();
  let background = location.state && location.state.background;

  return (
    <Switch location={background || location}>
      <Route exact path="/" component={Landing} />

      {/* MarketPlace */}
      <Route exact path="/marketplace" component={MarketPlace} />

      {/* Sku */}
      <Route exact path="/marketplace/:skuid" component={SkuDetail} />
      <Route path="/marketplace/:skuid/collectors" component={Collectors} />

      {/* User */}
      <PrivateRoute path="/wallet/:userId" component={Wallet} />
      <Route path="/collection/:userId" component={Collection} />

      {/* All */}
      <Route path="/example" component={UnderConstruction} />
    </Switch>
  );
};

export default RouterComponent;
