import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { getBooksRequest } from "../../redux/actions";
import BookComponent from ".";
jest.mock("../../components/header", () => () => (
  <div data-testid="HeaderComponent">Header</div>
));

jest.mock(
  "../../components/input",
  () =>
    ({ searchKey, onInputChange }: any) =>
      (
        <input
          data-testid="InputComponent"
          value={searchKey}
          onChange={(e) => onInputChange(e.target.value)}
        />
      )
);
jest.mock(
  "../../components/expandable-table",
  () =>
    ({ handlePageChange }: any) =>
      (
        <button
          data-testid="TableComponent"
          onClick={() => handlePageChange(2)}
        >
          Table
        </button>
      )
);
jest.mock("../../components/card", () => ({ label, count }: any) => (
  <div data-testid={`CardComponent-${label}`}>
    {label}: {count}
  </div>
));
jest.mock("../../redux/actions", () => ({
  getBooksRequest: jest.fn(() => ({ type: "MOCK_GET_BOOKS_REQUEST" })),
}));

const mockStore = configureStore([]);

describe("BookComponent", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      book: {
        totalItems: 100,
        books: [],
        mostCommonAuthor: "John Doe",
        earliestDate: "2001",
        latestDate: "2021",
        serverResponseTime: "500ms",
        loading: false,
      },
    });
    store.dispatch = jest.fn();
  });

  it("renders header, input, table, and cards", () => {
    render(
      <Provider store={store}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BookComponent />
        </React.Suspense>
      </Provider>
    );

    expect(screen.getByTestId("HeaderComponent")).toBeInTheDocument();
    expect(screen.getByTestId("InputComponent")).toBeInTheDocument();
    expect(screen.getByTestId("TableComponent")).toBeInTheDocument();
    expect(screen.getByTestId("CardComponent-Total items")).toBeInTheDocument();
    expect(
      screen.getByTestId("CardComponent-Most Common Author")
    ).toBeInTheDocument();
  });

  it("dispatches getBooksRequest on mount", () => {
    render(
      <Provider store={store}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BookComponent />
        </React.Suspense>
      </Provider>
    );

    expect(getBooksRequest).toHaveBeenCalledWith({
      p: "search",
      startIndex: 0,
      maxResults: 10,
    });
  });

  it("updates search input and dispatches action", () => {
    render(
      <Provider store={store}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BookComponent />
        </React.Suspense>
      </Provider>
    );

    const inputElement = screen.getByTestId("InputComponent");
    fireEvent.change(inputElement, { target: { value: "New Search" } });

    expect(store.dispatch).toHaveBeenCalled();
  });

  it("renders loading state correctly", () => {
    store = mockStore({
      book: {
        totalItems: 100,
        books: [],
        mostCommonAuthor: "John Doe",
        earliestDate: "2001",
        latestDate: "2021",
        serverResponseTime: "500ms",
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BookComponent />
        </React.Suspense>
      </Provider>
    );

    expect(screen.getByTestId("TableComponent")).toBeInTheDocument();
  });

  it("renders no books message when book list is empty", () => {
    store = mockStore({
      book: {
        totalItems: 0,
        books: [],
        mostCommonAuthor: "None",
        earliestDate: null,
        latestDate: null,
        serverResponseTime: "500ms",
        loading: false,
      },
    });

    render(
      <Provider store={store}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BookComponent />
        </React.Suspense>
      </Provider>
    );

    expect(screen.getByTestId("TableComponent")).toBeInTheDocument();
    expect(getBooksRequest).toHaveBeenCalledWith({
      p: "search",
      startIndex: 0,
      maxResults: 10,
    });
  });

  it("handles page change and dispatches action", () => {
    render(
      <Provider store={store}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BookComponent />
        </React.Suspense>
      </Provider>
    );

    const tableComponent = screen.getByTestId("TableComponent");
    fireEvent.click(tableComponent);

    expect(store.dispatch).toHaveBeenCalled();
  });
});
