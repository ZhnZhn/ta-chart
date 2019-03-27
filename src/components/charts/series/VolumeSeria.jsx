import React from 'react'

import Ch from '../Ch'
import fns from '../chartFns'

const {
  C,
  timeIntervalBarWidth,
  format,
  timeFormat,
  utcDay
} = fns;

const _fill = (d, dPrev) => d.close > dPrev.close
 ? C.UP
 : C.DOWN;

const VolumeSeria = ({ id, height }) => (
  <Ch.Chart
      id={id} height={height}
      yExtents={d => d.volume}
      //origin={(w, h) => [0, h - 220]}
      origin={(w, h) => [0, h - 140]}
  >
    <Ch.YAxis
      axisAt="left" orient="left"
      ticks={5} tickFormat={format(".0s")}
      stroke="black"
    />
    <Ch.MouseCoordinateY
        at="left" orient="left"
        displayFormat={format(".4s")}
    />

    <Ch.BarSeries
        width={timeIntervalBarWidth(utcDay)}
        yAccessor={d => d.volume}
        fill={_fill}
        stroke={_fill}
    />

    <Ch.XAxis
      axisAt="bottom" orient="bottom"
      ticks={6}
    />
    <Ch.MouseCoordinateX
      at="bottom" orient="bottom"
      displayFormat={timeFormat("%Y-%m-%d")}
    />
  </Ch.Chart>
);

export default VolumeSeria
