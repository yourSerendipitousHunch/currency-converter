import React, { useState } from "react";

interface ExchangeRate {
  [key: string]: number;
  USD: number;
  EUR: number;
  UAH: number;
}

export default function CurrencyConverter() {
  const [exchangeRate] = useState<ExchangeRate>({
    USD: 1,
    EUR: 0.85,
    UAH: 27.7,
  });
  const [currency1, setCurrency1] = useState<string>("USD");
  const [currency2, setCurrency2] = useState<string>("UAH");
  const [amount1, setAmount1] = useState<number>(0);
  const [amount2, setAmount2] = useState<number>(0);

  const handleAmount1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount1(value);
    setAmount2(value * exchangeRate[currency1] / exchangeRate[currency2]);
  };

  const handleAmount2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount2(value);
    setAmount1(value * exchangeRate[currency2] / exchangeRate[currency1]);
  };

  const handleCurrency1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCurrency1(value);
    setAmount2(amount1 * exchangeRate[value] / exchangeRate[currency2]);
  };

  const handleCurrency2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCurrency2(value);
    setAmount2(amount1 * exchangeRate[currency1] / exchangeRate[value]);
  };

  return (
    <div className="main__page">
      <div className="currency-select">
        <select value={currency1} onChange={handleCurrency1Change}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <input type="number" value={amount1} onChange={handleAmount1Change} />
      </div>
      <div className="currency-select">
        <select value={currency2} onChange={handleCurrency2Change}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <input type="number" value={amount2} onChange={handleAmount2Change} />
      </div>
    </div>
  );
}
