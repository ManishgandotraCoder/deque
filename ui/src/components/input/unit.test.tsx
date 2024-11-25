import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputComponent from ".";
import { InputComponentProps } from "./interface";

describe("InputComponent", () => {
  const mockOnInputChange = jest.fn();

  const defaultProps: InputComponentProps = {
    placeholder: "Search...",
    searchKey: "",
    onInputChange: mockOnInputChange,
  };

  it("renders the input field with the correct placeholder", () => {
    render(<InputComponent {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders the input field with the correct value", () => {
    render(<InputComponent {...defaultProps} searchKey="Test Value" />);
    const inputElement = screen.getByPlaceholderText("Search...");
    expect(inputElement).toHaveValue("Test Value");
  });

  it("calls onInputChange when the input value changes", () => {
    render(<InputComponent {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputElement, { target: { value: "New Value" } });
    expect(mockOnInputChange).toHaveBeenCalledWith("New Value");
  });

  it("renders the label correctly", () => {
    render(<InputComponent {...defaultProps} />);
    const labelElement = screen.getByText("Search");
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass("input-label");
  });
});
