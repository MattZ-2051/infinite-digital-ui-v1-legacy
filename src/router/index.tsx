import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Landing from '../views/Landing';
import UserAccount from '../views/UserAccount';

export interface IProps {
  children?: any;
}

const RouterComponent: React.FC<IProps> = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/user-account" component={UserAccount} />
      </Switch>
    </Router>
  );
};

export default RouterComponent;
