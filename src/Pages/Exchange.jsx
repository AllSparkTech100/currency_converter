import { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, Button, MenuItem, TextField } from "@mui/material";

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

function Exchange() {
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [conversionRate, setConversionRate] = useState(null);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch(API_URL + baseCurrency)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
        setExchangeRates(data.rates);
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, [baseCurrency]);

  const convertCurrency = () => {
    if (exchangeRates[targetCurrency]) {
      const rate = exchangeRates[targetCurrency];
      setConversionRate(rate);
      setConvertedAmount(amount * rate);
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };


  return (
    <Container className="p-6 flex flex-col items-center">
      <Typography variant="h4" className="mb-4">Exchange Rates</Typography>
      <Card className="p-6 w-full max-w-lg shadow-lg">
        <CardContent className="flex flex-col gap-4">
          <Typography variant="h6">Select Currencies</Typography>

          <TextField
            label="Base Currency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value.toUpperCase())}
            select
            fullWidth
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>{currency}</MenuItem>
            ))}
          </TextField>

          <TextField
            label="Target Currency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value.toUpperCase())}
            select
            fullWidth
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>{currency}</MenuItem>
            ))}
          </TextField>

          <TextField
            label={`Amount in ${baseCurrency}`}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />

          <Button variant="contained" onClick={convertCurrency}>Convert</Button>

          {conversionRate && (
            <Typography variant="h6" className="mt-2 flex">
              <div className="font-bold uppercase">Conversion Rate:</div> &nbsp; 1 {baseCurrency} = {formatNumber(conversionRate.toFixed(4))} {targetCurrency}
            </Typography>
          )}

          {convertedAmount && (
            <Typography variant="h6" className='flex'>
              <div className="font-bold uppercase">Converted Amt:</div> &nbsp; {formatNumber(amount)} {baseCurrency} = {formatNumber(convertedAmount.toFixed(2))} {targetCurrency}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Exchange;
