import { Route, Redirect } from "react-router-dom";
import { getToken } from "lib/utils/auth";

const PrivateRoute = ({ component: Component, ...rest }): any => {
  const token = getToken();

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (token) {
          return <Component {...routeProps} />;
        }

        return ( //TODO: revisar porque uso un modal
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: routeProps.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
