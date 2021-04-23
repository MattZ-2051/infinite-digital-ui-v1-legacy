import '../../../../../jest/matchMedia.mock';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import { Provider } from 'react-redux';
import Hero from './index';

describe('<Hero />', () => {
  const renderComponent = (isAuthenticated: boolean, login = () => {}) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Hero login={login} isAuthenticated={isAuthenticated} />
        </BrowserRouter>
      </Provider>
    );
  };

  test('show start collection Button if the user is not logged in', async () => {
    renderComponent(false);
    expect(screen.getByText('START YOUR COLLECTOY TODAY')).toBeVisible();
  });

  test('calls the login function on start-collection button click', async () => {
    const login = jest.fn();
    renderComponent(false, login);
    fireEvent.click(screen.getByTestId('start-collection-btn'));
    expect(login).toHaveBeenCalled();
  });
});
