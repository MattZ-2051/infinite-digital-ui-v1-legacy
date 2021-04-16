import '../../../../../jest/matchMedia.mock';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import { Provider } from 'react-redux';
import MobileMenu from './index';

describe('<Menu />', () => {
  const renderComponent = (
    isAuthenticated: boolean,
    login = () => {},
    logout = () => {}
  ) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <MobileMenu login={login} logout={logout} isAuthenticated={isAuthenticated} user={{name: 'abc'}} />
        </BrowserRouter>
      </Provider>
    );
  };

  test('show auth links if the user is not logged in', async () => {
    renderComponent(false);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('show my-collection link if the user is logged in', async () => {
    renderComponent(true);
    expect(screen.getByText('My Collection')).toBeVisible();
  });

  test('hide auth links if the user is logged in', async () => {
    renderComponent(true);
    expect(screen.queryByText('Log In')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  test('calls the login function on login button click', async () => {
    const login = jest.fn();
    renderComponent(false, login);
    fireEvent.click(screen.getByText('Sign In'));
    expect(login).toHaveBeenCalled();
  });

  test('calls the logout function on logout button click', async () => {
    const login = jest.fn();
    const logout = jest.fn();
    renderComponent(true, login, logout);
    fireEvent.click(screen.getByTestId('logout-btn'));
    expect(logout).toHaveBeenCalled();
  });

  test('show the username if the user is logged in', async () => {
    renderComponent(true);
    expect(screen.getByTestId('user-name')).toBeInTheDocument();
  });
});
