import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import '../../../../../jest/matchMedia.mock';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import { Provider } from 'react-redux';
import LatestProducts from './index';

describe('<LatestProducts />', () => {
  const renderComponent = (
    isAuthenticated: boolean,
  ) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <LatestProducts isAuthenticated={isAuthenticated} />
        </BrowserRouter>
      </Provider>
    );
  };

  test('shows drop boxes and marketplace tabs only if user is not logged in', async () => {
    renderComponent(false);
    const { debug, getByTestId } = screen;
    expect(getByTestId("dropBoxTab").textContent).toBe('Drop Boxes')
    expect(getByTestId("marketplaceTab").textContent).toBe('Marketplace')
    // console.log(debug());
  })

  test('shows all three tabs when user is logged in', async () => {
    renderComponent(true);
    const { debug, getByTestId } = screen;
    expect(getByTestId("dropBoxTab").textContent).toBe('Drop Boxes')
    expect(getByTestId("marketplaceTab").textContent).toBe('Marketplace')
    expect(getByTestId("myCollectionTab").textContent).toBe('My Colllection')
  })

});
