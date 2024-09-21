import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= 1) return pageNumbers;

    // Always show the first page
    if (currentPage > 3) {
      pageNumbers.push(1);
      if (currentPage > 4) {
        pageNumbers.push("...");
      }
    }

    // Show the pages around the current page
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(currentPage + 2, totalPages);
      i++
    ) {
      pageNumbers.push(i);
    }

    // Always show the last two pages
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages - 1);
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-4 text-sm text-clayGray">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === 1 ? "bg-gray-300" : "bg-gray-200"
        }`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={index} className="mx-1 px-3 py-1">
            {page}
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === totalPages ? "bg-gray-300" : "bg-gray-200"
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
