import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExpandableTableComponent from ".";
import { TableComponentProps } from "./interface";
import { BookRecordInterface } from "../../pages/Books/interface";

const mockHandlePageChange = jest.fn();
const mockHandlePageSizeChange = jest.fn();
const mockExpandedRowRender = jest.fn((record) => (
  <div>{record.description}</div>
));

const mockData: BookRecordInterface[] = [
  {
    id: "1",
    volumeInfo: {
      authors: ["Author 1"],
      title: "title 1",
      imageLinks: {
        thumbnail: "url",
      },
      description: "Description 1",
    },
    etag: "etag1",
  },
  {
    id: "2",
    volumeInfo: {
      authors: ["Author 2"],
      title: "title 2",
      imageLinks: {
        thumbnail: "url",
      },
      description: "Description 2",
    },
    etag: "etag2",
  },
];

const mockColumns = [
  {
    id: "1",
    etag: "etag1",
    key: "name",
    title: "Name",
    dataIndex: "name" as keyof BookRecordInterface,
    render: (value: string) => <span>{value}</span>,
  },
];

const defaultProps: TableComponentProps = {
  arr: mockData,
  handlePageChange: mockHandlePageChange,
  handlePageSizeChange: mockHandlePageSizeChange,
  pageSize: 10,
  totalPages: 5,
  currentPage: 1,
  columns: mockColumns,
  expandedRowRender: mockExpandedRowRender,
  loading: false,
};

describe("ExpandableTableComponent", () => {
  it("renders table with data", () => {
    render(<ExpandableTableComponent {...defaultProps} />);

    // Check if the table header renders correctly
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders expanded row content on click", () => {
    render(<ExpandableTableComponent {...defaultProps} />);

    // Find the expand icon for the first row and click it
    const expandIcon = screen.getAllByText("\u2191")[0]; // Up arrow
    fireEvent.click(expandIcon);

    // Assert that the expanded row content is rendered
    expect(mockExpandedRowRender).toHaveBeenCalledWith(mockData[0]);
  });

  it("renders 'No records found' when no data is passed", () => {
    render(<ExpandableTableComponent {...defaultProps} arr={[]} />);

    expect(screen.getByText("No records found")).toBeInTheDocument();
  });

  it("calls handlePageChange when a pagination button is clicked", () => {
    render(<ExpandableTableComponent {...defaultProps} />);

    // Find the "Next" button and click it
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockHandlePageChange).toHaveBeenCalledWith(2); // Current page + 1
  });

  it("calls handlePageSizeChange when rows per page is changed", () => {
    render(<ExpandableTableComponent {...defaultProps} />);

    const selectElement = screen.getByLabelText("Rows per page:");
    fireEvent.change(selectElement, { target: { value: "20" } });

    expect(mockHandlePageSizeChange).toHaveBeenCalled();
  });

  it("disables 'Previous' button on the first page", () => {
    render(<ExpandableTableComponent {...defaultProps} currentPage={1} />);

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("disables 'Next' button on the last page", () => {
    render(
      <ExpandableTableComponent
        {...defaultProps}
        currentPage={5}
        totalPages={5}
      />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("renders pagination with ellipsis for large ranges", () => {
    render(
      <ExpandableTableComponent
        {...defaultProps}
        totalPages={10}
        currentPage={5}
      />
    );

    expect(screen.getAllByText("...")).toHaveLength(2); // Two ellipses in the pagination
  });
});
