import '../../../../../jest/matchMedia.mock';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import { Provider } from 'react-redux';
import Menu from './index';

describe('<Menu />', () => {
  const renderComponent = (isAuthenticated: boolean, login = () => {}) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Menu login={login} isAuthenticated={isAuthenticated} />
        </BrowserRouter>
      </Provider>
    );
  };

  test('show auth links if the user is not logged in', async () => {
    renderComponent(false);
    expect(screen.getByText('Log In')).toBeVisible();
    expect(screen.getByText('Sign Up')).toBeVisible();
    // screen.debug();
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

  test('calls "onClick" prop on login button click', async () => {
    const login = jest.fn();
    renderComponent(false, login);
    fireEvent.click(screen.getByText('Log In'));
    expect(login).toHaveBeenCalled();
  });
});
