import { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, TextField, MenuItem } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const HISTORICAL_API = "https://api.exchangeratesapi.io/v1/2018-12-22?access_key=ed3cc473152d544b17e318dc14e4fee0";

const NEWS_API = "https://api.currentsapi.services/v1/latest-news?category=business&language=en&apiKey=i2NK1_ZBctPSWELV_uHYLcJEKf5eI1adlhp8CqhZoyhJQgaF";

const currencies = ["USD", "EUR", "GBP", "NGN", "JPY", "AUD", "CAD", "INR", "CNY", "CHF"];
// const API_KEY = "ed3cc473152d544b17e318dc14e4fee0";

function History () {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [chartData, setChartData] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    fetch(`${HISTORICAL_API}?start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}&symbols=${targetCurrency}`)
      .then(res => res.json())
      .then(data => {
        console.log("Rates data:", data);
        if (data.success && data.rates) {
          const formatted = Object.entries(data.rates).map(([date, rate]) => ({
            date,
            rate: rate[targetCurrency]
          }));
          setChartData(formatted);
        }
      })
      .catch(err => console.error("Chart API Error:", err));
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    fetch(NEWS_API)
      .then(res => res.json())
      .then(data => setNews(data.news || []))
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
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Typography>Loading chart data...</Typography>
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
            <Typography variant="caption">Source: {article.author || article.source}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default History;