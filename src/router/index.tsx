import { Switch, Route, useLocation } from 'react-router-dom';
import PrivateRoute from 'router/PrivateRoute';
import Landing from 'views/Landing';
import DropBoxes from 'views/DropBoxes';
import MarketPlace from 'views/MarketPlace';
import UserAccount from 'views/UserAccount';
import MyCollection from 'views/MyCollection';
import MyProfile from 'views/Profile';

const RouterComponent = () => {
  let location: any = useLocation();
  let background = location.state && location.state.background;

  return (
    <Switch location={background || location}>
      <Route exact path="/" component={Landing} />
      <Route exact path="/drop-boxes" component={DropBoxes} />
      <Route exact path="/marketplace" component={MarketPlace} />
      <Route exact path="/marketplace/:username" component={MyProfile} />
      <PrivateRoute path="/user-account" component={UserAccount} />
      <PrivateRoute path="/my-collection" component={MyCollection} />
    </Switch>
  );
};

export default RouterComponent;
