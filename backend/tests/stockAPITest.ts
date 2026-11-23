import { getStockData } from "../src/stockAPI";

// Test valid symbol
async function testValidSymbolReturnsData(validSymbol: string) {
  try {
    const stockData = await getStockData({ symbol: validSymbol })
    console.log(stockData)
    return true
  } catch (error) {
    console.error(`Error fetching stock data for ${validSymbol}:`, error)
    return false
  }
}

// Test Invalid symbol is rejected
async function testInvalidSymbolReturnsError(validSymbol: string) {
  try {
    const stockData = await getStockData({ symbol: validSymbol })
    console.error(stockData);
    return false
  } catch (error) {
    console.log(`Sucessful Error for ${validSymbol}:`, error)
    return true
  }
}
// Test no object have the same date
async function testDatesAreUnique(validSymbol: string) {
  const stockData = await getStockData({ symbol: validSymbol })
  const seenDates = new Set()
  for (const obj of stockData) {
    const objDate = obj.day
    if (seenDates.has(objDate)) {
      console.error(`Date '${objDate}' is already in the stock data`)
      return false
    }
    seenDates.add(objDate)
  }
  return true
}

async function main() {
  const valid_symbol = 'TSLA'
  const invalid_symbol = 'INVALID_SYMBOL'

  const tests: [string, () => Promise<boolean>][] = [
    ["Valid symbol", () => testValidSymbolReturnsData(valid_symbol)],
    ["Invalid symbol", () => testInvalidSymbolReturnsError(invalid_symbol)],
    ["Date aggregation", () => testDatesAreUnique(valid_symbol)]
  ];

  let totalPassed = 0;
  for (const [name, test] of tests) {
    const passed = await test();
    console.log(`${name}: ${passed ? "PASSED" : "FAILED"}`);
    if (passed) totalPassed++;
  }

  console.log('---------------------------------------------------')
  console.log(`${totalPassed} out of ${tests.length} tests passed.`)
  console.log('---------------------------------------------------')

}

main()
