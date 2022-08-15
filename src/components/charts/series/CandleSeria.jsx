import { useMemo } from '../../uiApi';

import Ch from '../Ch';
import {
  COLOR,
  numberFormat4F,
  numberFormat8Trim
} from '../chartFns';
import useTimeIntervalBarWidth from './useTimeIntervalBarWidth';

const CL_TOOLTIP = 'rs-tooltip';

const _stroke = (
  d,
  dPrev
) => (d || {}).close > (dPrev || {}).close
  ? COLOR.UP
  : COLOR.DOWN;

const _fill = (
  d,
  dPrev
) => (d || {}).close > (d || {}).open
  ? COLOR.TRANSPARENT
  : _stroke(d, dPrev);

const bbStroke = {
	top: '#964b00',
	middle: '#000000',
	bottom: '#964b00'
};

const bbFill = '#4682b4';

const _crMaTooltipOption = (
  accessor,
  options
) => ({
  type: 'SMA',
  yAccessor: accessor,
  stroke: options.stroke,
  windowSize: options.windowSize
});

const CHART_Y_EXTENDS = d => [d.high, d.low]
, CHART_ORIGIN = (w, h) => [0, h - 420]

, OHCL_TOOLTIP_ORIGIN = [5, -90]

, MA_TOOLTIP_ORIGIN = [5, 320]

, BB_TOOLTIP_ORIGIN = [190, 440]
, BB_Y_ACCESSOR = d => d.bb;


const CandleSeria = ({
  id,
  height,
  timeInterval,
  timeFormat,
  sma20,
  sma50,
  bb
}) => {
  const _csWidth = useTimeIntervalBarWidth(timeInterval)
  , [
    accessorSma20,
    optionsSma20
  ] = useMemo(() => [
    sma20.accessor(),
    sma20.options()
  ], [sma20])
  , [
    accessorSma50,
    optionsSma50
  ] = useMemo(() => [
    sma50.accessor(),
    sma50.options()
  ], [sma50])
  , _maTooltipOption = useMemo(() => [
    _crMaTooltipOption(accessorSma20, optionsSma20),
    _crMaTooltipOption(accessorSma50, optionsSma50)
  ], [accessorSma20, optionsSma20, accessorSma50, optionsSma50])
  , _bbTooltipOptions = useMemo(
    () => bb.options()
  , [bb]);

  return (
  <Ch.Chart
    id={id}
    height={height}
    yExtents={CHART_Y_EXTENDS}
    origin={CHART_ORIGIN}
  >
    <Ch.YAxis
      axisAt="right"
      orient="right"
      ticks={5}
      stroke="black"
    />
    <Ch.BollingerSeries
      yAccessor={BB_Y_ACCESSOR}
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
       width={_csWidth}
       fill={_fill}
       stroke={_stroke}
       wickStroke={_stroke}
       candleStrokeWidth={0.8}
    />
    <Ch.MouseCoordinateY
      at="right"
      orient="right"
      displayFormat={numberFormat4F}
    />
    <Ch.OHLCTooltip
      fontSize={15}
      xDisplayFormat={timeFormat}
      textFill="black"
      ohlcFormat={numberFormat8Trim}
      forChart={3}
      origin={OHCL_TOOLTIP_ORIGIN}
    />
    <Ch.MovingAverageTooltip
      className={CL_TOOLTIP}
      width={100}
      fontSize={15}
      origin={MA_TOOLTIP_ORIGIN}
      options={_maTooltipOption}
    />
    <Ch.BollingerBandTooltip
      className={CL_TOOLTIP}
      fontSize={15}
      origin={BB_TOOLTIP_ORIGIN}
      yAccessor={BB_Y_ACCESSOR}
      options={_bbTooltipOptions}
    />
  </Ch.Chart>
  );
}

export default CandleSeria
