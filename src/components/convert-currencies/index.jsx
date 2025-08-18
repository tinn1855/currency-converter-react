import { useState } from "react";
import { useConvertCurrency } from "../../hooks/use-convert-currencies";
import { useGetCurrencies } from "../../hooks/use-get-currencies";

export function ConvertCurrencies() {
  const [form, setForm] = useState({
    amount: 1,
    from: "USD",
    to: "VND",
  });

  const { data: currencies } = useGetCurrencies();

  const { result, rate, loadingConvert, errorConvert } = useConvertCurrency(
    form.from,
    form.to,
    form.amount
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSwap = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="convert-card">
      <h2>Currencies Converter</h2>
      <form className="convert-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            className="input"
            placeholder="Enter amount"
            min="1"
            id="amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </div>

        <div className="form-item">
          <div className="select-option">
            <label htmlFor="from">From:</label>
            <select
              id="from"
              name="from"
              value={form.from}
              onChange={handleChange}
            >
              {currencies &&
                Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
            </select>
          </div>

          <button
            className="btn btn-primary"
            id="btn-swap"
            onClick={handleSwap}
          >
            <i className="fa-solid fa-arrow-right-arrow-left"></i>
          </button>

          <div className="select-option">
            <label htmlFor="to">To:</label>
            <select id="to" name="to" value={form.to} onChange={handleChange}>
              {currencies &&
                Object.keys(currencies).map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Convert
        </button>
      </form>

      <div className="result-convert">
        {loadingConvert && <p className="loading-message">Converting...</p>}
        {errorConvert && (
          <p className="error-message">{errorConvert.message}</p>
        )}
        {!loadingConvert && !errorConvert && result && (
          <>
            <h2>Converted Amount</h2>
            <hr />
            <p id="converted-amount">
              {form.amount} {form.from} ={" "}
              <strong>
                {result.toLocaleString()} {form.to}
              </strong>
            </p>
            <p>
              Rate: 1 {form.from} = {rate} {form.to}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
