import { useEffect, useState } from "react";
import { useGetCurrencies } from "../../hooks/use-get-currencies";
import { Pagination } from "../pagination";
import { useSearchParams } from "react-router-dom";
import { CURRENCY_NAME } from "../../constant/currencyName";
import { FLAG_CURRENCY } from "../../constant/flagCurrency";
import noFlagImage from "../../assets/images/no-flag.png";

export function TableCurrencies({ searchQuery }) {
  const { data, loading, error } = useGetCurrencies();
  const [searchParam] = useSearchParams();

  const pageParam = parseInt(searchParam.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);
  const rowsPerPage = 20;

  const filteredEntries = data
    ? Object.entries(data).filter(([currencyCode]) => {
        if (!searchQuery) return true;

        const currencyName = CURRENCY_NAME[currencyCode] || currencyCode;
        const query = searchQuery.toLowerCase();

        return (
          currencyCode.toLowerCase().includes(query) ||
          currencyName.toLowerCase().includes(query)
        );
      })
    : [];

  const totalPages = Math.ceil(filteredEntries.length / rowsPerPage);

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);

    if (currentPage > 1) {
      currentParams.set("page", currentPage);
    } else {
      currentParams.delete("page");
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
    }
    setCurrentPage(pageParam);
  }, [pageParam, searchQuery]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredEntries.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {searchQuery && (
        <div className="search-results-info">
          <p>
            Found {filteredEntries.length} results for "{searchQuery}"
          </p>
        </div>
      )}

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
          {currentRows.length > 0 ? (
            currentRows.map(([currencyCode, rate], index) => (
              <tr key={currencyCode}>
                <td>{startIndex + index + 1}</td>
                <td>{currencyCode}</td>
                <td className="currency-name">
                  <img
                    src={
                      FLAG_CURRENCY[currencyCode.toLowerCase()] || noFlagImage
                    }
                    alt={`Flag of ${
                      CURRENCY_NAME[currencyCode] || currencyCode
                    }`}
                    width={24}
                  />
                  <span>{CURRENCY_NAME[currencyCode] || currencyCode}</span>
                </td>
                <td>-</td>
                <td>{rate}</td>
                <td>-</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">
                {searchQuery
                  ? `No currencies found for "${searchQuery}"`
                  : "No data available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <p className="table-description">
        Rates are converted to 1 USD. Data updated according to API at current
        time.
      </p>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
