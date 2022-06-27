type Props = {
  setPageNumber: (prev: any) => void;
  pageNumber: number;
};

export const PagePagination = ({ setPageNumber, pageNumber }: Props) => {
  return (
    <div className="buttons">
      <button
        disabled={pageNumber === 1}
        onClick={() => setPageNumber((prev: number) => prev - 1)}
      >
        Previous
      </button>
      <button onClick={() => setPageNumber(1)}>1</button>
      <p className="current-page">{pageNumber}</p>
      <button onClick={() => setPageNumber(10)}>10</button>

      <button onClick={() => setPageNumber((prev: number) => prev + 1)}>
        Next
      </button>
    </div>
  );
};
