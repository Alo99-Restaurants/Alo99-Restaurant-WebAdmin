import { useState } from 'react';

const usePagination = (totalRows = 10, pageIndexProps = 1) => {
  const [pageIndex, stPageIndex] = useState(pageIndexProps);
  const [skipRows, setSkipRows] = useState((pageIndex - 1) * totalRows);

  const setPageIndex = (newIndex) => {
    setSkipRows((newIndex - 1) * totalRows);
    stPageIndex(newIndex);
  };

  return [totalRows, skipRows, pageIndex, setPageIndex];
};

export default usePagination;
