import React from "react";
import { render, screen } from "@testing-library/react";
import LoaderComponent from ".";

describe("LoaderComponent", () => {
  it("renders the loader wrapper", () => {
    render(<LoaderComponent />);
    const loaderWrapper = screen.getByRole("region", {
      name: "loader-wrapper",
    });
    expect(loaderWrapper).toBeInTheDocument();
  });

  it("renders the loader element", () => {
    render(<LoaderComponent />);
    const loader = screen.getByRole("status", { name: "loader" });
    expect(loader).toBeInTheDocument();
  });

  it("renders the loading text", () => {
    render(<LoaderComponent />);
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
  });
});
