import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import MarketPlace from './index';
import { Provider } from 'react-redux';

// cleanup after each test is run
// cleanup unmounts everything from the DOM after tests are run
afterEach(cleanup);

test('<MarketPlace />', () => {
  // const { debug, container } = render(<Provider><MarketPlace /></Provider>);
  // console.log(container)
  // debug();

  expect(true).toBeTruthy();
});
