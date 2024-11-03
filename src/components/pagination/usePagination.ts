import React from 'react';

const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);

// data, :records-result
// rowsCount, :selectedOption
// pageNeighbours : 2

interface UsePaginationProps {
  data: any;
  pageNeighbours: number;
  rowsCount: number;
}

function usePagination({
  data,
  rowsCount,
  pageNeighbours,
}: UsePaginationProps) {
  const [currentPageTest, setcurrentPageTest] = React.useState(1);

  const itemsPerPage = typeof rowsCount === 'number' ? rowsCount : data.length;

  // Number of  pages
  const maxPage = rowsCount;

  function createPageNumbers(currentPageTest: number) {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (maxPage > totalBlocks) {
      let pages = [];

      const leftBound = currentPageTest - pageNeighbours;
      const rightBound = currentPageTest + pageNeighbours;
      const beforeLastPage = maxPage - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = ['LEFT', ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, 'RIGHT'];
      } else if (leftSpill && rightSpill) {
        pages = ['LEFT', ...pages, 'RIGHT'];
      }

      return [1, ...pages, maxPage];
    }
    return range(1, maxPage);
  }

  const gotoPage = (page: any) => {
    const currentPageTest = Math.max(0, Math.min(page, data.length));

    setcurrentPageTest(currentPageTest);
  };
  function nextPage() {
    setcurrentPageTest(() => Math.min(currentPageTest + 1, maxPage));
  }

  function prevPage() {
    setcurrentPageTest(() => Math.min(currentPageTest - 1, currentPageTest));
  }

  function next() {
    gotoPage(currentPageTest + 1 * 2 + 1);
  }

  function prev() {
    gotoPage(currentPageTest - 1 * 2 - 1);
  }

  function jump(page: any) {
    gotoPage(page);
  }

  function currentData() {
    const begin = (currentPageTest - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return data.slice(begin, end);
  }

  const pages = createPageNumbers(currentPageTest);

  React.useEffect(() => {
    if (currentPageTest >= data.length) {
      setcurrentPageTest(1);
    }
    if (data.length <= itemsPerPage) {
      setcurrentPageTest(1);
    }
    if (currentPageTest >= itemsPerPage) {
      setcurrentPageTest(1);
    }
  });

  return {
    next,
    prev,
    jump,
    currentData,
    currentPageTest,
    maxPage,
    pages,
    nextPage,
    prevPage,
  };
}

export default usePagination;
