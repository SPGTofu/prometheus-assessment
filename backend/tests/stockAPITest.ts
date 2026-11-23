import { getStockData } from "../stockAPI";

// Test valid symbol
async function testValidSymbol() {
  const symbol = 'TSLA'
  try {
    const stockData = await getStockData({ symbol: symbol })
    console.log(stockData);
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
  }
}

// Test Invalid symbol is rejected
async function testInvalidSymbol() {
  const symbol = 'INVALID_SYMBOL'
  try {
    const stockData = await getStockData({ symbol: symbol })
    console.log(stockData);
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
  }
}
// Test data from last 30 days is aggregated correctly
async function testMonthlyAggregation() {
  const currTime = new Date()
}
// Test low and high averages rounded to nearest 4 decimal places

//




testValidSymbol();
testInvalidSymbol();