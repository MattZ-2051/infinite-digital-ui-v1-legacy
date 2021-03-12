import { Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ component: Component, ...rest }): any => {

  const {
    isAuthenticated,
    loginWithRedirect
  } = useAuth0();
 
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (isAuthenticated) {
          return <Component {...routeProps} />;
        }

        loginWithRedirect();
      }}
    />
  );
};

export default PrivateRoute;
