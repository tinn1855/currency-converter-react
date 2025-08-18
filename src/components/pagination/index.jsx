export function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    let pages = [];

    // hiển thị 1 vài trang đầu/cuối + ...
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            className={`btn ${currentPage === i ? "active" : ""}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <button key={`dots-${i}`} className="btn" disabled>
            ...
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <section className="pagination">
      <button className="btn" disabled={currentPage === 1} onClick={handlePrev}>
        Prev
      </button>
      {renderPageNumbers()}
      <button
        className="btn"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        Next
      </button>
    </section>
  );
}
