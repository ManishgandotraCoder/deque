import {
  BookRecordInterface,
  ColumnInterface,
} from "../../pages/Books/interface";

export interface TableComponentProps {
  arr: BookRecordInterface[];
  handlePageSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  pageSize: number;
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  columns: ColumnInterface[];
  expandedRowRender: (record: BookRecordInterface) => React.ReactNode;
  loading: boolean;
}
