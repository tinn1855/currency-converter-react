import { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../constant/baseURL";

export function useGetCurrencies(baseCurrency = "USD") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/${API_KEY}/latest/${baseCurrency}`
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        setData(result.conversion_rates);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, [baseCurrency]);

  return { data, loading, error };
}
