import React, { useState, useMemo } from "react";
import "./styles.css";
import { TableComponentProps } from "./interface";
import LoaderComponent from "../loader";

const noOfRecords = [5, 10, 20];

const ExpandableTableComponent: React.FC<TableComponentProps> = ({
  arr,
  handlePageChange,
  handlePageSizeChange,
  pageSize,
  totalPages,
  currentPage,
  columns,
  expandedRowRender,
  loading,
}) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  // Memoize pagination range to avoid unnecessary calculations
  const paginationRange = useMemo(() => {
    const delta = 2; // Number of pages shown on either side of the current page
    const range: (number | string)[] = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1); // Always show the first page
    if (left > 2) range.push("..."); // Add ellipsis for skipped pages
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push("..."); // Add ellipsis for skipped pages
    if (totalPages > 1) range.push(totalPages); // Always show the last page

    return range;
  }, [currentPage, totalPages]);

  // Handle row expansion toggle
  const toggleRowExpand = (key: string) => {
    setExpandedRowKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="table-component" data-testid="TableComponent">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading && <LoaderComponent />}
          {!loading && arr?.length > 0 ? (
            arr.map((record) => (
              <React.Fragment key={record.id}>
                <tr>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render
                        ? col.render(
                            col.dataIndex ? (record[col.dataIndex] as any) : {}
                            // record
                          )
                        : col.dataIndex
                        ? (record[col.dataIndex] as React.ReactNode)
                        : "-"}
                    </td>
                  ))}
                  <td className="expand-action">
                    <span
                      onClick={() => toggleRowExpand(record.id)}
                      aria-expanded={expandedRowKeys.includes(record.id)}
                      aria-controls={`expanded-row-${record.id}`}
                      className="expand-icon"
                    >
                      {expandedRowKeys.includes(record.id)
                        ? "\u2193"
                        : "\u2191"}
                    </span>
                  </td>
                </tr>
                {expandedRowKeys.includes(record.id) && (
                  <tr
                    id={`expanded-row-${record.id}`}
                    className="expanded-row"
                    data-testid="Desc Details"
                  >
                    <td colSpan={columns.length + 1}>
                      <div className="expanded-content">
                        {expandedRowRender(record)}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        {/* Rows per Page Selector */}
        <div className="rows-per-page">
          <label htmlFor="page-size">Rows per page:</label>
          <select
            id="page-size"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            {noOfRecords.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination Buttons */}
        <div className="pagination-buttons">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {paginationRange.map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={currentPage === page ? "active-page" : ""}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpandableTableComponent;
