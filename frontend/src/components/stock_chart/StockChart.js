import { Checkbox, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function StockChart({ stockData }) {
  const chartData = Array.isArray(stockData) ? stockData : [];
  const [hoveringDataKey, setHoveringDataKey] = useState(undefined);
  
  const [showVolume, setShowVolume] = useState(true);
  const [showAvgLow, setShowAvgLow] = useState(false);
  const [showAvgHigh, setShowAvgHigh] = useState(false);

  const displayValues = ['Volume', 'Average High', 'Average Low'];
  const isDisplayedValues = [showVolume, showAvgHigh, showAvgLow];
  const displayActionValues = [setShowVolume, setShowAvgHigh, setShowAvgLow];

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
            <Line type="monotone" dataKey="volume" name="Volume" />
          )}
          {showAvgHigh && (
            <Line type="monotone" dataKey="highAverage" name="Avg. High ($)" stroke='green'/>
          )}
          {showAvgLow && (
            <Line type="monotone" dataKey="lowAverage" name="Avg. Low ($)" stroke='red'/>
          )}
        </LineChart>
      </>

      <Flex flexDirection='column' justifyContent='center' gap={4} ml={4}>
        {displayValues.map((val, idx) => {
          return (
            <Checkbox.Root
              key={val}
              checked={isDisplayedValues[idx]}
              onCheckedChange={(e) => displayActionValues[idx](e.checked)}
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
