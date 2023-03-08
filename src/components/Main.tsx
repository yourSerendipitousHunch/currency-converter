import React, { useState, useEffect } from "react";

interface ExchangeRate {
  [key: string]: number;
  USD: number;
  EUR: number;
  UAH: number;
}

export default function CurrencyConverter() {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate>({
    USD: 0,
    EUR: 0,
    UAH: 0,
  });
  const [currency1, setCurrency1] = useState<string>('USD');
  const [currency2, setCurrency2] = useState<string>('UAH');
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
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

  function handleCurrency1Change(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrency1(event.target.value);
    setConvertedAmount(amount / exchangeRate[event.target.value] * exchangeRate[currency2]);
  }

  function handleCurrency2Change(event: React.ChangeEvent<HTMLSelectElement>) {
    setCurrency2(event.target.value);
    setConvertedAmount(amount / exchangeRate[currency1] * exchangeRate[event.target.value]);
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(parseFloat(event.target.value));
    setConvertedAmount(parseFloat(event.target.value) / exchangeRate[currency1] * exchangeRate[currency2]);
  }

  function handleConvert() {
    setConvertedAmount(amount / exchangeRate[currency1] * exchangeRate[currency2]);
  }

  return (
    <div>
      <div className="currency-select">
        <select value={currency1} onChange={handleCurrency1Change}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="currency-select">
        <select value={currency2} onChange={handleCurrency2Change}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <input type="number" value={convertedAmount} readOnly />
      </div>
      <button onClick={handleConvert}>Convert</button>
      {error && <div>Failed to fetch exchange rates: {error.message}</div>}
    </div>
  );
}
