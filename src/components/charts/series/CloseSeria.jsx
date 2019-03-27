import React from 'react'

import Ch from '../Ch'
import fns from '../chartFns'

const { format } = fns;

const CloseSeria = ({ id, height }) => (
  <Ch.Chart
    id={id} height={height}
    yExtents={d => [d.high, d.low]}
    origin={(w, h) => [0, h - 510]}
  >
    <Ch.YAxis
      axisAt="left" orient="left"
      stroke="black" ticks={5}
    />
    <Ch.LineSeries
      yAccessor={d => d.close}
      stroke="black"
    />
    <Ch.MouseCoordinateY
      at="right" orient="right"
      displayFormat={format(".4f")}
    />
  </Ch.Chart>
);

export default CloseSeria
