import React from "react";

import "./Pagination.css";

const Pagination = ({
  totalProducts,
  productsPerPage,
  onClick,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pages.push(i);
  }
  return (
    <>
      {pages.length > 1 && (
        <ul className="pagination">
          {pages.map((page) => (
            <li key={page}>
              <button
                className={
                  currentPage == page
                    ? "pagination_button active"
                    : "pagination_button"
                }
                onClick={() => onClick(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Pagination;
