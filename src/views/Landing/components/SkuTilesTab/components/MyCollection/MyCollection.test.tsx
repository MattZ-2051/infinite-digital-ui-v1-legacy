import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

// cleanup after each test is run
// cleanup unmounts everything from the DOM after tests are run
afterEach(cleanup);

test('', () => {
  // debug();

  expect(true).toBeTruthy();
});
