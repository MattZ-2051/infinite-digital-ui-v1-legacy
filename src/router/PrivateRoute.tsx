import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({ component: Component, ...rest }): any => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        loginWithRedirect();
      }
    }
  }, [isLoading, isAuthenticated]);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (isAuthenticated) {
          return <Component {...routeProps} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
