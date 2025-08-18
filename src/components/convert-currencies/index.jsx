import { UseGetCurrencies } from "../../hooks/use-get-currencies";

export function ConvertCurrencies() {
  const { data } = UseGetCurrencies();

  return (
    <section className="convert-card">
      <h2>Currencies Converter</h2>
      <form className="convert-form">
        <div className="">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            className="input"
            placeholder="Enter amount"
            min="1"
            id="amount"
          />
        </div>
        <div className="form-item">
          <div className="select-option">
            <label htmlFor="from-currency">From:</label>
            <select name="from-currency" id="from-currency">
              {data &&
                Object.entries(data).map(([code, rate]) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
            </select>
          </div>
          <button className="btn btn-primary " id="btn-swap">
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </button>
          <div className="select-option">
            <label htmlFor="to-currency">To:</label>
            <select name="to-currency" id="to-currency">
              {data &&
                Object.entries(data).map(([code, rate]) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button className="btn btn-primary">Convert</button>
      </form>
      <div className="result-convert">
        <h2>Converted Amount</h2>
        <hr />
        <p id="converted-amount">
          1 USD = <strong>26,000 VND</strong>
        </p>
        <p>Rate: 1 USD = 26,000 VND</p>
      </div>
    </section>
  );
}
