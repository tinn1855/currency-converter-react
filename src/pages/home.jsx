import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ConvertCurrencies } from "../components/convert-currencies";
import { Header } from "../components/header";
import { PopularCurrencies } from "../components/popular-currencies";
import { SearchForm } from "../components/search-form";
import { TableCurrencies } from "../components/table-currencies";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Đọc search query từ URL khi component mount và khi URL thay đổi
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") || "";
    setSearchQuery(searchFromUrl);
  }, [searchParams]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Cập nhật URL params
    const newParams = new URLSearchParams(searchParams);
    if (query && query.trim()) {
      newParams.set("search", query.trim());
      newParams.delete("page"); // Reset page khi search
    } else {
      newParams.delete("search");
      newParams.delete("page");
    }
    setSearchParams(newParams);
  };

  return (
    <div className="container">
      <Header />
      <div className="convert-section">
        <ConvertCurrencies />
        <PopularCurrencies />
      </div>
      <SearchForm onSearch={handleSearch} searchValue={searchQuery} />
      <TableCurrencies searchQuery={searchQuery} />
    </div>
  );
}
