import { useGetCurrencies } from "../../hooks/use-get-currencies";

export function TableCurrencies() {
  const { data, loading, error } = useGetCurrencies();

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
          {Object.entries(data).map(([currencyCode, rate], index) => (
            <tr key={currencyCode}>
              <td>{index + 1}</td>
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
    </>
  );
}
