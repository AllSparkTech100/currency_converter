// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, TextField, MenuItem, Card, CardContent, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


function Home() {
  // const [currencies, setCurrencies] = useState([]);
  // const [baseCurrency, setBaseCurrency] = useState("USD");
  // const [targetCurrency, setTargetCurrency] = useState("EUR");
  // const [exchangeRate, setExchangeRate] = useState(null);

  // useEffect(() => {
  //   axios.get(import.meta.env.VITE_REACT_APP_API_URL + baseCurrency).then((response) => {
  //     setCurrencies(Object.keys(response.data.rates));
  //     setExchangeRate(response.data.rates[targetCurrency]);
  //   }).catch((error) => console.error("Error fetching exchange rates:", error));
  // }, [baseCurrency, targetCurrency]);
  return (
    <>
      {/* <Container className="p-6 flex w-screen bg-slate-950 h-screen justify-center flex-col items-center">
        <Typography variant="h4" className="mb-5 text-white">Currency Exchange</Typography>

        <Card className="p-6 w-full max-w-lg shadow-lg ">
          <CardContent className="flex flex-col gap-4">
            <TextField select label="Base Currency" value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>{currency}</MenuItem>
              ))}
            </TextField>
            <TextField select label="Target Currency" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>{currency}</MenuItem>
              ))}
            </TextField>
            {exchangeRate && (
              <Typography variant="h6">Exchange Rate: {exchangeRate}</Typography>
            )}
          </CardContent>
        </Card>
      </Container> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-6">
      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Current Exchanges</h1>
        <p className="text-gray-600 mb-6">
          Convert currencies in real time, view exchange rates, and check historical trends.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="">
            <Button variant="contained" color="primary">Get Started</Button>
          </Link>
          <Link to="/exchange">
            <Button variant="outlined" color="primary">Live Rates</Button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home