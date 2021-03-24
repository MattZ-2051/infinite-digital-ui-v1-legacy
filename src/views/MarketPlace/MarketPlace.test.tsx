import '../../../jest/matchMedia.mock';
import { getByTestId, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import store from 'store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MarketPlace from 'views/MarketPlace';

describe('<MarketPlace />', () => {

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <MarketPlace />
        </BrowserRouter>
      </Provider>
    )
  }



  test('renders search bar filter', () => {
    renderComponent();
    const { debug, getByTestId } = screen;
    console.log(getByTestId('sortByFilter'))
    expect(true).toBeTruthy();
  })
});
