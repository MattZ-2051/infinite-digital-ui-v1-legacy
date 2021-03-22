import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import DropBoxPanel from './index';

test("<DropBoxPanel />", () => {
  const { debug } = render(<DropBoxPanel />);

  debug();

  expect(true).toBeTruthy();
})
