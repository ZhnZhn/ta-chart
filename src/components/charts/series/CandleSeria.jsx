import React from 'react'

import Ch from '../Ch'
import fns from '../chartFns'

const {
  C,
  timeIntervalBarWidth,
  utcDay,
  format
} = fns;

const _stroke = (d, dPrev) => d.close > dPrev.close
  ? C.UP
  : C.DOWN;

const _fill = (d, dPrev) => d.close > d.open
  ? C.TRANSPARENT
  : _stroke(d, dPrev);





const _onContextMenu = (...args) => {
  console.log(args)
}

const bbStroke = {
	top: "#964B00",
	middle: "#000000",
	bottom: "#964B00",
};

const bbFill = "#4682B4";

const CandleSeria = ({
  id, height,
  sma20, sma50, bb
}) => (
  <Ch.Chart
    id={id}
    height={height}
    yExtents={d => [d.high, d.low]}
    origin={(w, h) => [0, h - 420]}
    onContextMenu={_onContextMenu}
  >
    <Ch.YAxis
      axisAt="right" orient="right"
      ticks={5} stroke="black"
    />
    <Ch.BollingerSeries
      yAccessor={d => d.bb}
      stroke={bbStroke}
      fill={bbFill}
    />
    <Ch.LineSeries
      yAccessor={sma20.accessor()}
      stroke={sma20.options().stroke}
    />
    <Ch.LineSeries
      yAccessor={sma50.accessor()}
      stroke={sma50.options().stroke}
    />
    <Ch.CandlestickSeries
       width={timeIntervalBarWidth(utcDay)}
       fill={_fill}
       stroke={_stroke}
       wickStroke={_stroke}
       candleStrokeWidth={0.8}
    />
    {/*
    <EdgeIndicator
       itemType="last"
       orient="right" edgeAt="right"
       yAccessor={d => d.close} fill="blue" />
    */}
    <Ch.MouseCoordinateY
      at="right"
      orient="right"
      displayFormat={format(".4f")}
    />
    <Ch.OHLCTooltip
      fontSize={15}
      //labelFill="#1b2836"
      textFill="black"
      ohclFormat={format(".4f")}
      forChart={1} origin={[10, -85]}
    />
    <Ch.MovingAverageTooltip
      fontSize={15}
      onClick={e => console.log(e)}
      origin={[5, 320]}
      options={[
         {
          yAccessor: sma20.accessor(),
          type: "SMA",
          stroke: sma20.options().stroke,
          windowSize: sma20.options().windowSize,
          echo: "some echo here",
        },{
         yAccessor: sma50.accessor(),
         type: "SMA",
         stroke: sma50.options().stroke,
         windowSize: sma50.options().windowSize,
         echo: "some echo here",
       }
      ]}
    />
    <Ch.BollingerBandTooltip
      fontSize={15}
      origin={[190, 440]}
      yAccessor={d => d.bb}
      options={bb.options()}
    />
  </Ch.Chart>
);

export default CandleSeria
