import { useState, useEffect } from "react";
import { API_KEY, BASE_URL } from "../constant/baseURL";

export function useConvertCurrency(from = "USD", to = "EUR", amount = 1) {
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [loadingConvert, setLoadingConvert] = useState(false);
  const [errorConvert, setErrorConvert] = useState(null);

  useEffect(() => {
    const convert = async () => {
      if (amount <= 0) {
        setErrorConvert(new Error("Amount must be greater than 0"));
        setResult(null);
        setRate(null);
        return;
      }
      if (amount > 1e9) {
        setErrorConvert(new Error("Amount too large, not supported"));
        setResult(null);
        setRate(null);
        return;
      }

      setLoadingConvert(true);
      setErrorConvert(null);

      try {
        const url = `${BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        if (data.result !== "success") {
          throw new Error("API conversion error");
        }

        setRate(data.conversion_rate);
        setResult(data.conversion_result);
      } catch (err) {
        setErrorConvert(err);
      } finally {
        setLoadingConvert(false);
      }
    };

    convert();
  }, [from, to, amount]);

  return { rate, result, loadingConvert, errorConvert };
}
