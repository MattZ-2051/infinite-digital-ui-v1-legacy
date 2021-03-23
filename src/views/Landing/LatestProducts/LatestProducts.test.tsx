import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import '../../../../jest/matchMedia.mock';
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

  //   test('show start collection Button if the user is not logged in', async () => {
  //     renderComponent(false);
  //     expect(screen.getByText('START YOUR COLLECTOY TODAY')).toBeVisible();
  //   });

  //   test('calls the login function on start-collection button click', async () => {
  //     const login = jest.fn();
  //     renderComponent(false, login);
  //     fireEvent.click(screen.getByTestId('start-collection-btn'));
  //     expect(login).toHaveBeenCalled();
  //   });
  // });

  // cleanup after each test is run
  // // cleanup unmounts everything from the DOM after tests are run
  // afterEach(cleanup)

  // test("", () => {


  //   // debug();

  //   expect(true).toBeTruthy();
});
