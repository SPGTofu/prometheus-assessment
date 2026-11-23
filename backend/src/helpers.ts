export const convertUnixToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000) // ms -> s
  return date.toISOString().split('T')[0] || '' // remove time portion
}