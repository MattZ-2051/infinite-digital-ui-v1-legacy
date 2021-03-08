import { Switch, Route, useLocation } from 'react-router-dom';
import { useAppSelector } from 'hooks/store';
import PrivateRoute from 'router/PrivateRoute';
import Landing from 'views/Landing';
import DropBoxes from 'views/DropBoxes';
import MarketPlace from 'views/MarketPlace';
import UserAccount from 'views/UserAccount';
import SignOut from 'components/SignOut';
import SignInModal from 'components/SignInModal';
import SignUpModal from 'components/SignUpModal';
import MyCollection from 'views/MyCollection';

const RouterComponent = () => {
  const isAuth = useAppSelector((state) => state.session.user.isAuthenticated);
  let location: any = useLocation();
  let background = location.state && location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/drop-boxes" component={DropBoxes} />
        <Route exact path="/marketplace" component={MarketPlace} />
        <PrivateRoute path="/user-account" component={UserAccount} />
        <PrivateRoute path="/sign-out" component={SignOut} />
        <PrivateRoute path="/my-collection" component={MyCollection} />
      </Switch>

      {!isAuth && (
        <>
          <Route path="/login" component={SignInModal} />
          <Route path="/sign-up" component={SignUpModal} />
        </>
      )}
    </>
  );
};

export default RouterComponent;
