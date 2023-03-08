import React, { useState, useEffect } from 'react';

interface ExchangeRate {
  USD: number;
  EUR: number;
}

export function Header() {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({
    USD: 0,
    EUR: 0,
  });
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const response = await fetch(
          'https://openexchangerates.org/api/latest.json?app_id=951c25ec7e2643d29f0f7ed23fa0ff10'
        );
        const data = await response.json();
        setExchangeRate(data.rates);
      } catch (err: unknown) {
        setError(err as Error);
      }
    };

    getExchangeRate();
  }, []);

  return (
    <header>
      <h1>Exchange Rates</h1>
      <p>USD/UAH: {exchangeRate.USD}</p>
      <p>EUR/UAH: {exchangeRate.EUR}</p>
      {error && <div>Failed to fetch exchange rates: {error.message}</div>}
    </header>
  );
}


