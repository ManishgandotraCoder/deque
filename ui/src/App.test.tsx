import React, { Suspense } from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock BookComponent
jest.mock("./pages/Books", () => {
  return jest.fn(() => <div data-testid="BookComponent"></div>);
});

test("renders AppRoutes component", () => {
  render(<App />);
  console.log(screen.debug());
  expect(screen.getByTestId("BookComponent")).toBeInTheDocument();
});
