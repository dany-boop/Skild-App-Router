'use client';
import { FC } from 'react';
import { Pagination } from 'react-bootstrap';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
};

const PaginationComponent: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageClick,
}) => {
  const renderPaginationItem = (
    page: number,
    isActive: boolean
  ): JSX.Element => (
    <button
      key={page}
      className={`rounded-3 px-3 py-2 mx-1 ${isActive ? 'active' : ''}`}
      style={
        isActive
          ? { backgroundColor: '#FFD600', border: 'none', font: 'bold' }
          : { border: 'none', color: '#0089C4' }
      }
      onClick={() => onPageClick(page)}
    >
      {page}
    </button>
  );

  const startPage = Math.max(currentPage - Math.floor(3 / 2), 1);
  const endPage = Math.min(startPage + 3 - 1, totalPages);

  return (
    <Pagination className="max-width-pagination">
      {startPage > 1 && (
        <>
          {renderPaginationItem(1, false)}
          {startPage > 2 && (
            <Pagination.Ellipsis className="mx-1" key="ellipsis-start" />
          )}
        </>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) =>
        renderPaginationItem(
          startPage + index,
          startPage + index === currentPage
        )
      )}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <Pagination.Ellipsis className="mx-1" key="ellipsis-end" />
          )}
          {renderPaginationItem(totalPages, false)}
        </>
      )}
    </Pagination>
  );
};

export default PaginationComponent;
