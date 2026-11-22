import { getStockData } from "../stockAPI";

async function testValidSymbol() {
  const symbol = 'TSLA'
  try {
    const stockData = await getStockData({ symbol: symbol })
    console.log(stockData);
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
  }
}

testValidSymbol();