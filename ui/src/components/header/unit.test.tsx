import React from "react";
import { render, screen } from "@testing-library/react";
import HeaderComponent from ".";

describe("HeaderComponent", () => {
  it("renders without crashing", () => {
    render(<HeaderComponent />);
    expect(screen.getByText(/📚 Deque - Booklist/i)).toBeInTheDocument();
  });

  it("applies the correct className to the header", () => {
    render(<HeaderComponent />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("header-component");
  });

  it("displays the correct title", () => {
    render(<HeaderComponent />);
    const title = screen.getByText(/📚 Deque - Booklist/i);
    expect(title).toHaveClass("header-title");
  });
});
