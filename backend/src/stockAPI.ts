import { convertUnixToDate } from "./helpers.js";
import type { DailySummary } from "./models.js";

type Input = {
  symbol: string;
}

export async function getStockData(input: Input): Promise<DailySummary[]> {
  const { symbol } = input
  
  // Preset values for the request
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=15m&range=30d`
  const headers = {
    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; 64) AppleWebKit/537.36'
  }

  // Fetch Request, then validate
  const response = await fetch(url, {headers})
  if (!response.ok) throw new Error(`Failed to fetch stock data for ${symbol}: ${response.statusText}`)

  const data = await response.json()
  const result = data?.chart?.result?.[0]

  if (!result) throw new Error(`No stock data found for ${symbol}`)
  
  const timestamps = result.timestamp
  const indicators = result.indicators?.quote?.[0]

  if (!timestamps || !indicators) throw new Error(`Incomplete stock data for ${symbol}`)
  
  const timestampMap = new Map<string, {
    volume: number,
    lowTotal: number,
    highTotal: number,
    count: number
  }>()

  // Aggregate data by date
  for (let i = 0; i < timestamps.length; i++) {
    const date = convertUnixToDate(timestamps[i])
    const currEntry = timestampMap.get(date) ?? {
      volume: 0,
      lowTotal: 0,
      highTotal: 0,
      count: 0
    }
    currEntry.volume += indicators.volume[i]
    currEntry.lowTotal += indicators.low[i]
    currEntry.highTotal += indicators.high[i]
    currEntry.count += 1
    timestampMap.set(date, currEntry)
  }

  // Convert data to list of objects
  const aggregatedData: DailySummary[] = Array.from(timestampMap, ([date, entry]) => ({
    day: date,
    volume: entry.volume,
    lowAverage: (Number)((entry.lowTotal / entry.count).toFixed(4)),
    highAverage: (Number)((entry.highTotal / entry.count).toFixed(4))
  }))

  return aggregatedData
}