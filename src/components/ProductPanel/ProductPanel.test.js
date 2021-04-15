import React from "react";
import { render, screen } from "@testing-library/react";
import ProductPanel from "./index";

test("<ProductPanel />", () => {
  const { debug, getByTestId } = render(<ProductPanel />);

  debug(); // Outputs Component as string

  expect(true).toBeTruthy();
});
