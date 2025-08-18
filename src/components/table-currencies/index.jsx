export function TableCurrencies() {
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
          <tr>
            <td>1</td>
            <td>USD</td>
            <td>United States Dollar</td>
            <td>1.00</td>
            <td>1.00</td>
            <td>1.00</td>
          </tr>
        </tbody>
      </table>
      <p className="table-description">
        Rates are converted to 1 USD. Data updated according to API at current
        time.
      </p>
    </>
  );
}
