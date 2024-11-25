export interface BookRecordInterface {
  volumeInfo: {
    authors: string[];
    title: string;
    imageLinks: {
      thumbnail: string;
    };
    description: string;
  };
  id: string;
  etag: string;
}

export interface ColumnInterface {
  title: string;
  id: string;
  etag: string;
  key: string;
  render: (value: any) => React.ReactNode;
  dataIndex: keyof BookRecordInterface;
}
