import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'router/PrivateRoute';
import Landing from 'views/Landing';
import UserAccount from 'views/UserAccount';

// export interface IProps {
//   children?: any;
// }

const RouterComponent = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <PrivateRoute path="/user-account" component={UserAccount} />
      </Switch>
    </>
  );
};

export default RouterComponent;
