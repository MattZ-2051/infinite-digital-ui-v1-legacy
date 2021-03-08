// Use: <PrivateRoute path="/user-account" roles={['admin', 'editor']} component={componentName} />
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteByRoles = ({ component: Component, roles, ...rest }) => {
  const userRole = useSelector((state) => state.session.userRole);

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) => {
        if (!userRole) {
          // Not logged in
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }

        const userHasRole = () => roles.some((role) => userRole === role);
        if (!userHasRole()) {
          // Not authorised - Redirect to the dashboard user
          return <Redirect to={{ pathname: `/${userRole}` }} />;
        }

        // Authorised
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRouteByRoles;
