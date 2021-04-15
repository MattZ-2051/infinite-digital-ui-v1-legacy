import { Switch, Route, useLocation } from 'react-router-dom';
import PrivateRoute from 'router/PrivateRoute';
import Landing from 'views/Landing';
import MarketPlace from 'views/MarketPlace';
import Wallet from 'views/Wallet';

const RouterComponent = () => {
  let location: any = useLocation();
  let background = location.state && location.state.background;

  return (
    <Switch location={background || location}>
      <Route exact path="/" component={Landing} />
      <Route exact path="/marketplace" component={MarketPlace} />
      {/* Change to Private Route when bug is fixed */}
      <Route path="/wallet/:userId" component={Wallet} />
    </Switch>
  );
};

export default RouterComponent;
