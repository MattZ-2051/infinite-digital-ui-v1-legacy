import {
  Switch,
  Route,
} from "react-router-dom";

import Landing from "../views/Landing";
import UserAccount from "../views/UserAccount";

export interface IProps {
  children?: any;
}

const RouterComponent = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/user-account" component={UserAccount} />
      </Switch>
    </>
  );
};

export default RouterComponent;
