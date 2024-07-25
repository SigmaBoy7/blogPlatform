import React, { useState, useEffect } from 'react';

import './PostsPagination.modules.scss';

import arrowLeft from '../../assets/left.svg';
import arrowRight from '../../assets/right.svg';

export default function PostsPagination({ currentPage, setCurrentPage, totalPostsCount }) {
  const [pagesList, setPagesList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  function createPaginationNumbers(currentPage) {
    const maxPagesToShow = 5;
    const prevPages = [];
    const nextPages = [];
    const totalPagesCount = Math.ceil(totalPostsCount / maxPagesToShow);

    setTotalPages(() => {
      return totalPagesCount;
    });

    if (currentPage !== 1) {
      for (let i = 1; i < currentPage; i++) {
        if (currentPage - i <= 2) {
          prevPages.push(i);
        }
      }
    }
    let nextPagesCount = 4;
    if (currentPage !== 1) {
      nextPagesCount = maxPagesToShow - (prevPages.length + 1);
    }
    for (let i = 1; i <= nextPagesCount; i++) {
      if (currentPage !== totalPagesCount) {
        if (currentPage + i <= totalPagesCount) {
          nextPages.push(currentPage + i);
        }
      }
    }

    const newTotalPages = [...prevPages, currentPage, ...nextPages];

    return newTotalPages;
  }

  useEffect(() => {
    const newTotalPages = createPaginationNumbers(currentPage);
    setPagesList(() => {
      return newTotalPages;
    });
  }, [currentPage, totalPostsCount]);

  function handlePageClick(e) {
    setCurrentPage(Number(e.target.value));
  }

  const pageButtons = pagesList.map((item) => {
    return (
      <button
        className={item === currentPage ? 'pagination-button pagination-button__active' : 'pagination-button'}
        value={item}
        key={item}
        onClick={handlePageClick}
      >
        {item}
      </button>
    );
  });

  function handlePrevButton() {
    if (currentPage !== 1) {
      const newPage = currentPage - 1;
      setCurrentPage(() => {
        return newPage;
      });
    }
  }

  function handleNextButton() {
    if (currentPage !== totalPages) {
      const newPage = currentPage === totalPages ? totalPages : currentPage + 1;
      setCurrentPage(() => {
        return newPage;
      });
    }
  }

  return (
    <ul className="paginations-list" style={{ display: 'flex', listStyle: 'none' }}>
      <button onClick={handlePrevButton} className="prev-page">
        <img className="arrow-left" src={arrowLeft}></img>
      </button>
      {pageButtons}
      <button onClick={handleNextButton} className="next-page">
        <img className="arrow-right" src={arrowRight}></img>
      </button>
    </ul>
  );
}
