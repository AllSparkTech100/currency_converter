/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, TextField, MenuItem, Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const HISTORICAL_API = "http://data.fixer.io/api/timeseries?access_key={41afc54c6713b161423f2204cf230b5c}&symbols=USD,EUR&start_date=2012-05-01&end_date=2012-05-25'";
const NEWS_API = "https://gnews.io/api/v4/top-headlines?topic=business&lang=en&token=ee3b519682f0f397245b380660ab98ab";

const currencies = ["USD", "EUR", "GBP", "NGN", "JPY", "AUD", "CAD", "INR", "CNY", "CHF"];

function History() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [chartData, setChartData] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const options = {
      method: 'GET'
    };
    const fetchRates = async () => {
      try {
       const res = await fetch(`${HISTORICAL_API}?start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}&symbols=${targetCurrency}`);
        const data = await res.json();

        console.log("Full API Response:", data);

        if (data?.rates) {
          const formatted = Object.entries(data.rates)
            .filter(([_, rateObj]) => rateObj[targetCurrency] !== undefined)
            .map(([date, rateObj]) => ({
              date,
              rate: rateObj[targetCurrency],
            }));

          setChartData(formatted);
        } else {
          console.log("No valid rates object found in response");
          setChartData([]);
        }
      } catch (error) {
        console.error("Chart API Error:", error);
        setChartData([]);
      }
}
     if (baseCurrency && targetCurrency) {
      fetchRates;
    }
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    fetch(NEWS_API)
      .then(res => res.json())
      .then(data => {
        if (data.articles) {
          setNews(data.articles);
        } else {
          console.warn("No news articles found.");
          setNews([]);
        }
      })
      .catch(err => console.error("News API Error:", err));
  }, []);

  return (
    <Container className="p-6">
      <Typography variant="h4" className="mb-4">Historical Exchange Rates</Typography>
      <Card className="p-4 mb-6">
        <CardContent className="flex flex-col gap-4">
          <TextField
            label="Base Currency"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            select
            fullWidth
          >
            {currencies.map(cur => <MenuItem key={cur} value={cur}>{cur}</MenuItem>)}
          </TextField>

          <TextField
            label="Target Currency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            select
            fullWidth
          >
            {currencies.map(cur => <MenuItem key={cur} value={cur}>{cur}</MenuItem>)}
          </TextField>

          {chartData.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Exchange Rate ({baseCurrency} to {targetCurrency})</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chartData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No historical data available for selected currencies.</Typography>
          )}
        </CardContent>
      </Card>

      <Typography variant="h5" className="mb-2">Latest Exchange News</Typography>
      {news.map((article, idx) => (
        <Card key={idx} className="mb-4">
          <CardContent>
            <Link href={article.url} target="_blank" rel="noopener noreferrer" underline="none">
              <Typography variant="h6" color="primary">{article.title}</Typography>
            </Link>
            <Typography variant="body2">{article.description}</Typography>
            <Typography variant="caption">Source: {article.source.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
    };

export default History;
