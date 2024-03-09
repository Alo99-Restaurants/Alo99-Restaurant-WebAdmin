import { useState } from 'react';

const usePaginationLoadMore = (totalRowsProps = 10, pageIndexProps = 1) => {
  const [pageIndex, stPageIndex] = useState(pageIndexProps);
  const [totalRows, stTotalRows] = useState(totalRowsProps);

  const setPageIndex = (newIndex) => {
    stTotalRows(newIndex * 10);
    stPageIndex(newIndex);
  };

  return [totalRows, pageIndex, setPageIndex];
};

export default usePaginationLoadMore;
