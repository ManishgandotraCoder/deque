import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { BookRecordInterface, ColumnInterface } from "./interface";
import { getBooksRequest } from "../../redux/actions";

const HeaderComponent = React.lazy(() => import("../../components/header"));
const InputComponent = React.lazy(() => import("../../components/input"));
const TableComponent = React.lazy(
  () => import("../../components/expandable-table")
);
const CardComponent = React.lazy(() => import("../../components/card"));

const columns: ColumnInterface[] = [
  {
    id: "id",
    key: "volumeInfo",
    etag: "etag",
    title: "Book Name",
    dataIndex: "volumeInfo" as keyof BookRecordInterface,
    render: (value: BookRecordInterface["volumeInfo"]) =>
      `${value.title} (${value.authors?.join(", ") || "Unknown Author"})`,
  },
];

const defaultPageCount = 10;

const BookComponent: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("search");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(defaultPageCount);

  const dispatch = useDispatch();
  const {
    totalItems,
    books,
    mostCommonAuthor,
    earliestDate,
    latestDate,
    serverResponseTime,
    loading,
  } = useSelector((state: { book: any }) => state.book);

  // Calculate total pages dynamically
  const totalPages = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize]
  );

  // Fetch initial data on mount or page size change
  useEffect(() => {
    dispatch(
      getBooksRequest({
        p: searchInput,
        startIndex: (currentPage - 1) * pageSize,
        maxResults: pageSize,
      })
    );
  }, [dispatch, searchInput, currentPage, pageSize]);

  // Handle search input change
  const onInputChange = useCallback((value: string) => {
    setSearchInput(value);
    setCurrentPage(1); // Reset to the first page when searching
  }, []);

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  // Handle page size change
  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPageSize(Number(e.target.value));
      setCurrentPage(1); // Reset to the first page when changing page size
    },
    []
  );

  // Expanded row content
  const expandedRowRender = useCallback(
    (record: BookRecordInterface) => (
      <div className="expanded-row">
        <img
          src={record?.volumeInfo?.imageLinks?.thumbnail}
          alt="Book Thumbnail"
        />
        <p>{record.volumeInfo?.description || "No description available."}</p>
      </div>
    ),
    []
  );

  return (
    <div data-testid="BookComponent">
      <HeaderComponent />
      {/* Summary Cards */}
      <div className="grid-container">
        <CardComponent label="Total items" count={totalItems} />
        <CardComponent label="Most Common Author" count={mostCommonAuthor} />
        <CardComponent label="Earliest Date" count={earliestDate} />
        <CardComponent label="Latest Date" count={latestDate} />
        <CardComponent
          label="Server Response Time"
          count={serverResponseTime}
        />
      </div>
      <InputComponent
        searchKey={searchInput}
        onInputChange={onInputChange}
        placeholder={"Search.."}
      />
      {/* Search and Table */}
      <div className="table-container">
        <TableComponent
          arr={books}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          totalPages={totalPages}
          currentPage={currentPage}
          columns={columns}
          expandedRowRender={expandedRowRender}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default BookComponent;
