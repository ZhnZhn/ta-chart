import React from 'react'

import Ch from '../Ch'
import fns from '../chartFns'

const {
  C,
  timeIntervalBarWidth,
  format
} = fns;

const CL_TOOLTIP = 'rs-tooltip'

const _noop = () => {}

const _stroke = (d, dPrev) => d.close > dPrev.close
  ? C.UP
  : C.DOWN;

const _fill = (d, dPrev) => d.close > d.open
  ? C.TRANSPARENT
  : _stroke(d, dPrev);

const bbStroke = {
	top: "#964B00",
	middle: "#000000",
	bottom: "#964B00",
};

const bbFill = "#4682B4";

const _crMaTooltipOption = (accessor, options) => ({
  type: "SMA",
  yAccessor: accessor,
  stroke: options.stroke,
  windowSize: options.windowSize
});

const CandleSeria = ({
  id, height,
  timeInterval, timeFormat,
  sma20, sma50, bb
}) => {
  const accessorSma20 = sma20.accessor()
  , optionsSma20 = sma20.options()
  , accessorSma50 = sma50.accessor()
  , optionsSma50 = sma50.options();
  return (
  <Ch.Chart
    id={id}
    height={height}
    yExtents={d => [d.high, d.low]}
    origin={(w, h) => [0, h - 420]}
    //onContextMenu={_onContextMenu}
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
      yAccessor={accessorSma20}
      stroke={optionsSma20.stroke}
    />
    <Ch.LineSeries
      yAccessor={accessorSma50}
      stroke={optionsSma50.stroke}
    />
    <Ch.CandlestickSeries
       width={timeIntervalBarWidth(timeInterval)}
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
      xDisplayFormat={timeFormat}
      textFill="black"
      ohlcFormat={format(".8f")}
      forChart={3}
      origin={[5, -90]}
      onClick={_noop}
    />
    <Ch.MovingAverageTooltip
      className={CL_TOOLTIP}
      width={100}
      fontSize={15}
      origin={[5, 320]}
      options={[
        _crMaTooltipOption(accessorSma20, optionsSma20),
        _crMaTooltipOption(accessorSma50, optionsSma50)
      ]}
      onClick={_noop}
    />
    <Ch.BollingerBandTooltip
      className={CL_TOOLTIP}
      fontSize={15}
      origin={[190, 440]}
      yAccessor={d => d.bb}
      options={bb.options()}
      onClick={_noop}
    />
  </Ch.Chart>
  );
}

export default CandleSeria
