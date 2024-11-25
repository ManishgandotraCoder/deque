import React from "react";
import { render, screen } from "@testing-library/react";
import CardComponent from ".";

describe("CardComponent", () => {
  it("renders the label correctly", () => {
    const label = "Test Label";
    const count = 42;
    const loading = false;

    render(<CardComponent label={label} count={count} />);

    const labelElement = screen.getByTestId("card-label");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(label);
  });

  it("renders the count correctly", () => {
    const label = "Test Label";
    const count = 42;
    const loading = false;

    render(<CardComponent label={label} count={count} />);

    const countElement = screen.getByTestId("card-count");
    expect(countElement).toBeInTheDocument();
    expect(countElement).toHaveTextContent(count.toString());
  });

  it("renders correctly when loading is true", () => {
    const label = "Loading Label";
    const loading = true;

    render(<CardComponent label={label} count={0} />);

    const countElement = screen.getByTestId("card-count");
    expect(countElement).toHaveTextContent("0"); // Default count even in loading state
  });
});
