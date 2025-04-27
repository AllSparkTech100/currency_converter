import { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Link } from "@mui/material";

// const HISTORICAL_API = "https://data.fixer.io/api/timeseries?access_key={41afc54c6713b161423f2204cf230b5c}&symbols=USD,EUR&start_date=2012-05-01&end_date=2012-05-25";
// const NEWS_API = "https://gnews.io/api/v4/top-headlines?topic=business&lang=en&token=ee3b519682f0f397245b380660ab98ab";

// const currencies = ["USD", "EUR", "GBP", "NGN", "JPY", "AUD", "CAD", "INR", "CNY", "CHF"];

function History() {
  const [historyData, setHistoryData] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      try {
        const endDate = new Date().toISOString().split("T")[0];
        const startDate = "2020-12-01"
        //  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
        const response = await fetch(`https://api.exchangerate.host/timeseries?access_key=${import.meta.env.VITE_REACT_APP_API_KEY}start_date=${startDate}&end_date=${endDate}&base=USD&symbols=EUR`);
        const data = await response.json();

        if (data.rates) {
          const formattedData = Object.entries(data.rates).map(([date, rate]) => ({
            date,
            rate: rate["EUR"] || 0
          }));
          setHistoryData(formattedData);
        } else {
          setHistoryData([]);
        }
      } catch (error) {
        console.error("Error fetching historical rates:", error);
      }
    };

    fetchHistoricalRates();
  }, []);

  useEffect(() => {
    fetch(`https://gnews.io/api/v4/top-headlines?topic=business&lang=en&token=${import.meta.env.VITE_REACT_APP_GNEWS_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.articles) {
          setNews(data.articles);
        } else {
          setNews([]);
        }
      })
      .catch(error => console.error("Error fetching news:", error));
  }, []);

  return (
    <Container className="py-6">
      <Typography variant="h4" className="mb-6">Currency Historical Rates (USD to EUR)</Typography>

      <Card className="mb-6 p-4">
        <CardContent>
          {historyData.length > 0 ? (
            <Table className="mt-6">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Exchange Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.rate.toFixed(4)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography className="mt-4">No data available for the selected period.</Typography>
          )}
        </CardContent>
      </Card>

      <Typography variant="h5" className="mb-4">Latest Exchange News</Typography>
      {news.map((article, index) => (
        <Card key={index} className="mb-4 p-4">
          <CardContent>
            <Link href={article.url} target="_blank" rel="noopener noreferrer" underline="hover">
              <Typography variant="h6" color="primary">{article.title}</Typography>
            </Link>
            <Typography variant="body2" className="mt-2">{article.description}</Typography>
            <Typography variant="caption" className="block mt-2">Source: {article.source.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default History;
