import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import DropBoxPanel from './index';

// cleanup after each test is run
// cleanup unmounts everything from the DOM after tests are run
afterEach(cleanup)

test("<DropBoxPanel />", () => {

  // Renders Component
  const { debug, getByTestId } = render(<DropBoxPanel />);

  // Expect Content Container of Panel to be a div
  expect(getByTestId('panel-content').tagName).toBe('DIV')


  // debug();

  expect(true).toBeTruthy();
})
