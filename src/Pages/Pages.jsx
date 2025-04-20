import { Routes, Route } from "react-router-dom";
import Home from "./Home"
import Exchange from "./Exchange"
import HistoricalData from "./History"

function Pages() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange" element={<Exchange />} />
        {/* <Route path="/rates" element={<Exchange />} /> */}
        <Route path="/history" element={<HistoricalData />} />
        {/* <Route path="/about" element={<AboutUs />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </>
  )
}

export default Pages