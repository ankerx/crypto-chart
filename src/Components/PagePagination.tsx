type Props = {
  pageNumber: number;
  nextPage: () => void;
  previousPage: () => void;
  setPageNumber: (arg: number) => void;
};

export const PagePagination = ({
  nextPage,
  previousPage,
  pageNumber,
  setPageNumber,
}: Props) => {
  return (
    <div className="buttons">
      <button disabled={pageNumber === 1} onClick={previousPage}>
        Previous
      </button>
      <button onClick={() => setPageNumber(1)}>1</button>
      <p className="current-page">{pageNumber}</p>
      <button onClick={() => setPageNumber(10)}>10</button>

      <button onClick={nextPage}>Next</button>
    </div>
  );
};
