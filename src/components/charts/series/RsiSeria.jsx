import React from 'react'

import Ch from '../Ch'
import fns from '../chartFns'

const { format } = fns;

const _rsiStroke = {
  line: "#000000",
  top: "#b8b2bb",
  //middle: "#8795a1",
  middle: "transparent",
  bottom: "#b8c2cc",
  outsideThreshold: "#b300b3",
  insideThreshold: "#4699cb"
};

const RsiSeria = ({ id, height, width, rsi }) => (
  <Ch.Chart
    id={id} height={height}
    yExtents={[0, 100]}
    origin={(w, h) => [0, h - 510]}
  >
    <Ch.YAxis
      axisAt="right" orient="right"
      stroke="black"
      tickStroke="#4699cb"
      tickValues={[30, 50, 70]}
    />
    <Ch.MouseCoordinateY
      at="left" orient="left"
      displayFormat={format(".2f")}
    />
    <Ch.RSISeries
      yAccessor={d => d.rsi}
      stroke={_rsiStroke}
    />
    <Ch.RSITooltip
      origin={[width-160, 10]}
      fontSize={15}
      //labelFill="#1b2836"
      yAccessor={d => d.rsi}
      options={rsi.options()}
    />
  </Ch.Chart>
);

export default RsiSeria
