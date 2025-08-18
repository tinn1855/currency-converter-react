import { useState, useEffect } from "react";

export function SearchForm({ onSearch, searchValue }) {
  const [localSearchValue, setLocalSearchValue] = useState(searchValue || "");

  // Đồng bộ localSearchValue với searchValue từ props (từ URL)
  useEffect(() => {
    setLocalSearchValue(searchValue || "");
  }, [searchValue]);

  // Debounce search để tránh cập nhật URL quá thường xuyên
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearchValue !== searchValue) {
        onSearch(localSearchValue);
      }
    }, 300); // Đợi 300ms sau khi user ngừng gõ

    return () => clearTimeout(timeoutId);
  }, [localSearchValue, onSearch, searchValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchValue(value);
  };

  const handleClear = () => {
    setLocalSearchValue("");
    onSearch("");
  };

  return (
    <section className="search-section">
      <div className="search-form">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search by currency code or name..."
          value={localSearchValue}
          onChange={handleInputChange}
        />
        {localSearchValue && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        )}
      </div>
    </section>
  );
}
