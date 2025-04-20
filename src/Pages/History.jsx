import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Container, Card, CardContent, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


// const API_URL = "https://api.exchangerate-api.com/v4/latest/";
// const HISTORICAL_API_URL = "https://api.exchangerate-api.com/v4/history/";

function History() {
  // const [currencies, setCurrencies] = useState([]);
  // const [baseCurrency, setBaseCurrency] = useState("USD");
  // const [targetCurrency, setTargetCurrency] = useState("EUR");
  // const [exchangeRate, setExchangeRate] = useState(null);
  // const [historicalRates, setHistoricalRates] = useState({});

  // useEffect(() => {
  //   fetch(API_URL + baseCurrency)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCurrencies(Object.keys(data.rates));
  //       setExchangeRate(data.rates[targetCurrency]);
  //     })
  //     .catch((error) => console.error("Error fetching exchange rates:", error));
  // }, [baseCurrency, targetCurrency]);

  // useEffect(() => {
  //   fetch(HISTORICAL_API_URL + baseCurrency)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setHistoricalRates(data.rates[targetCurrency] || {});
  //     })
  //     .catch((error) => console.error("Error fetching historical exchange rates:", error));
  // }, [baseCurrency, targetCurrency]);

  // const chartData = {
  //   labels: Object.keys(historicalRates),
  //   datasets: [
  //     {
  //       label: `Exchange Rate (${baseCurrency} to ${targetCurrency})`,
  //       data: Object.values(historicalRates),
  //       borderColor: "#3b82f6",
  //       backgroundColor: "rgba(59, 130, 246, 0.5)",
  //     },
  //   ],
  // };

  // eslint-disable-next-line no-unused-vars
  const [currencies, setCurrencies] = useState(["USD", "EUR", "GBP", "JPY", "AUD"]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      const endDate = new Date().toISOString().split("T")[0];
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const formattedStartDate = startDate.toISOString().split("T")[0];

      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}2013-12-24=${formattedStartDate}&2020-12-24=${endDate}?access_key=${import.meta.env.VITE_REACT_APP_API_KEY}&base=${baseCurrency}&symbols=${targetCurrency}`);
        const data = await response.json();
        if (data.rates) {
          const rates = Object.entries(data.rates).map(([date, values]) => ({ date, rate: values[targetCurrency] }));
          setHistoricalData(rates);
        }
      } catch (error) {
        console.error("Error fetching historical rates:", error);
      }
    };
    fetchHistoricalRates();
  }, [baseCurrency, targetCurrency]);

  const chartData = {
    labels: historicalData.map(entry => entry.date),
    datasets: [
      {
        label: `Exchange Rate (${baseCurrency} to ${targetCurrency})`,
        data: historicalData.map(entry => entry.rate),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  return (
    // <Container className="p-6 flex flex-col items-center">
    //   <Typography variant="h4" className="mb-4">Currency Exchange</Typography>
    //   <Card className="p-6 w-full max-w-lg shadow-lg">
    //     <CardContent className="flex flex-col gap-4">
    //       <TextField select label="Base Currency" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
    //         {currencies.map((currency) => (
    //           <MenuItem key={currency} value={currency}>{currency}</MenuItem>
    //         ))}
    //       </TextField>
    //       <TextField select label="Target Currency" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
    //         {currencies.map((currency) => (
    //           <MenuItem key={currency} value={currency}>{currency}</MenuItem>
    //         ))}
    //       </TextField>
    //       {exchangeRate && (
    //         <Typography variant="h6">Exchange Rate: {exchangeRate}</Typography>
    //       )}
    //       {historicalRates && Object.keys(historicalRates).length > 0 && (
    //         <div className="w-full">
    //           <Typography variant="h6" className="mb-2">Historical Data</Typography>
    //           <Line data={chartData} />
    //         </div>
    //       )}
    //     </CardContent>
    //   </Card>
    // </Container>
    <Container className="p-6 flex flex-col items-center">
      <Typography variant="h4" className="mb-4">Historical Exchange Rates</Typography>
      <Card className="p-6 w-full max-w-lg shadow-lg">
        <CardContent className="flex flex-col gap-4">
          <Typography variant="h6">Select Currencies</Typography>
          <ToggleButtonGroup
            value={baseCurrency}
            exclusive
            onChange={(e, newCurrency) => newCurrency && setBaseCurrency(newCurrency)}
          >
            {currencies.map((currency) => (
              <ToggleButton key={currency} value={currency}>{currency}</ToggleButton>
            ))}
          </ToggleButtonGroup>

          <ToggleButtonGroup
            value={targetCurrency}
            exclusive
            onChange={(e, newCurrency) => newCurrency && setTargetCurrency(newCurrency)}
          >
            {currencies.map((currency) => (
              <ToggleButton key={currency} value={currency}>{currency}</ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Line data={chartData} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default History;
