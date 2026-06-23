import React from 'react';
import './Pagination.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Generate page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    // Show first, last, current, and adjacent pages
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing <span>{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> to <span>{Math.min(currentPage * itemsPerPage, totalItems)}</span> of <span>{totalItems}</span> items
      </div>
      
      <div className="pagination-controls">
        <button 
          className="page-btn prev-next" 
          onClick={handlePrev} 
          disabled={currentPage === 1}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {pages.map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="page-ellipsis">...</span>
          ) : (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        ))}

        <button 
          className="page-btn prev-next" 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
