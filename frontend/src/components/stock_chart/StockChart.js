import { Checkbox, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function StockChart({ stockData }) {
  const chartData = Array.isArray(stockData) ? stockData : [];
  const [hoveringDataKey, setHoveringDataKey] = useState(undefined);
  
  const [showVolume, setShowVolume] = useState(true);
  const [showAvgLow, setShowAvgLow] = useState(false);
  const [showAvgHigh, setShowAvgHigh] = useState(false);

  const displayValues = ['Volume', 'Average Low', 'Average High'];
  const isDisplayedValues = [showVolume, showAvgLow, showAvgHigh];
  const displayActionValues = [setShowVolume, setShowAvgLow, setShowAvgHigh];

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
    <Flex>
      <>
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
          {showVolume && (
            <Line type="monotone" dataKey="volume" name="Volume" strokeOpacity={volumeOpacity} activeDot={{ r: 8 }} />
          )}
          {showAvgLow && (
            <Line type="monotone" dataKey="lowAverage" name="Average Low ($)" strokeOpacity={avgLowOpacity} />
          )}
          {showAvgHigh && (
            <Line type="monotone" dataKey="highAverage" name="AverageHigh ($)" strokeOpacity={avgHighOpacity} />
          )}
        </LineChart>
      </>

      <Flex flexDirection='column' justifyContent='center' gap={4} ml={4}>
        {displayValues.map((val, idx) => {
          return (
            <Checkbox.Root
              key={val}
              checked={isDisplayedValues[idx]}
              onChange={(e) => displayActionValues[idx](e.target.checked)}
            >
              <Checkbox.HiddenInput />
                <Checkbox.Control />
              <Checkbox.Label>Show {val}</Checkbox.Label>
            </Checkbox.Root>
          )
        })}
      </Flex>
    </Flex>

  )
}
