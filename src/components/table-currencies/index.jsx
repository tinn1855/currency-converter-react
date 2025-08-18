import { useEffect, useState } from "react";
import { useGetCurrencies } from "../../hooks/use-get-currencies";
import { Pagination } from "../pagination";
import { useSearchParams } from "react-router-dom";

export function TableCurrencies() {
  const { data, loading, error } = useGetCurrencies();
  const [searchParam, setSearchParam] = useSearchParams();

  const pageParam = parseInt(searchParam.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);
  const rowsPerPage = 20;

  // Đồng bộ state <-> URL param
  useEffect(() => {
    if (currentPage > 1) {
      setSearchParam({ page: currentPage });
    } else {
      setSearchParam({});
    }
  }, [currentPage, setSearchParam]);

  useEffect(() => {
    setCurrentPage(pageParam);
  }, [pageParam]);

  // Bảo vệ Object.entries
  const entries = data ? Object.entries(data) : [];
  const totalPages = Math.ceil(entries.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = entries.slice(startIndex, startIndex + rowsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Currency Code</th>
            <th>Currency Name</th>
            <th>Buy</th>
            <th>Exchange Rate</th>
            <th>Sell</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map(([currencyCode, rate], index) => (
            <tr key={currencyCode}>
              <td>{startIndex + index + 1}</td>
              <td>{currencyCode}</td>
              <td>{currencyCode}</td>
              <td>-</td>
              <td>{rate}</td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="table-description">
        Rates are converted to 1 USD. Data updated according to API at current
        time.
      </p>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
