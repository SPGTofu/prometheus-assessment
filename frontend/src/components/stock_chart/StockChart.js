import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function StockChart({ stockData }) {
  const chartData = Array.isArray(stockData) ? stockData : [];
  const [hoveringDataKey, setHoveringDataKey] = useState(undefined);

  let volumeOpacity = 1;
  let avgLowOpacity = 1;
  let avgHighOpacity = 1;

  if (hoveringDataKey === 'ah') {
    volumeOpacity = 0.5;
  }

  if (hoveringDataKey === 'al') {
    avgLowOpacity = 0.5;
  }

  if (hoveringDataKey === 'amt') {
    avgHighOpacity = 0.5;
  }

  const handleMouseEnter = (payload) => {
    setHoveringDataKey(payload.dataKey);
    };

  const handleMouseLeave = () => {
    setHoveringDataKey(undefined);
  };

  return (
    <LineChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={chartData}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid />
      <XAxis dataKey="day" niceTicks="snap125" />
      <YAxis width="auto" niceTicks="snap125" />
      <Tooltip />
      <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      <Line type="monotone" dataKey="volume" strokeOpacity={volumeOpacity} activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="lowAverage" strokeOpacity={avgLowOpacity} />
      <Line type="monotone" dataKey="highAverage" strokeOpacity={avgHighOpacity} />
    </LineChart>
  )
}
