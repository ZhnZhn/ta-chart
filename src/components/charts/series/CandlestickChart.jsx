import { useMemo } from '../../uiApi';

import { HAS_TOUCH } from '../../has';
import {
  Chart,
  YAxis,
  BollingerSeries,
  LineSeries,
  CandlestickSeries,
  MouseCoordinateY,
  OHLCTooltip,
  MovingAverageTooltip,
  BollingerBandTooltip,
  ZoomButtons
} from '../Ch';
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

const OHLC_TOOLTIP_ORIGIN = [5, -90]
, MA_TOOLTIP_ORIGIN = [5, 320]
, BB_TOOLTIP_ORIGIN = [190, 432] //440
, BB_Y_ACCESSOR = d => d.bb;

const CandlestickChart = ({
  id,
  height,
  timeInterval,
  timeFormat,
  sma20,
  sma50,
  bb,
  yExtents,
  origin
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
  <Chart
    id={id}
    height={height}
    yExtents={yExtents}
    origin={origin}
  >
    <YAxis
      axisAt="right"
      orient="right"
      ticks={5}
      stroke="black"
    />
    <BollingerSeries
      yAccessor={BB_Y_ACCESSOR}
      stroke={bbStroke}
      fill={bbFill}
    />
    <LineSeries
      yAccessor={accessorSma20}
      stroke={optionsSma20.stroke}
    />
    <LineSeries
      yAccessor={accessorSma50}
      stroke={optionsSma50.stroke}
    />
    <CandlestickSeries
       width={_csWidth}
       fill={_fill}
       stroke={_stroke}
       wickStroke={_stroke}
       candleStrokeWidth={0.8}
    />
    <MouseCoordinateY
      at="right"
      orient="right"
      displayFormat={numberFormat4F}
    />
    <OHLCTooltip
      fontSize={15}
      xDisplayFormat={timeFormat}
      textFill="black"
      ohlcFormat={numberFormat8Trim}
      forChart={3}
      origin={OHLC_TOOLTIP_ORIGIN}
    />
    <MovingAverageTooltip
      className={CL_TOOLTIP}
      width={100}
      fontSize={15}
      origin={MA_TOOLTIP_ORIGIN}
      options={_maTooltipOption}
    />
    <BollingerBandTooltip
      className={CL_TOOLTIP}
      fontSize={15}
      origin={BB_TOOLTIP_ORIGIN}
      yAccessor={BB_Y_ACCESSOR}
      options={_bbTooltipOptions}
    />
    {HAS_TOUCH && <ZoomButtons />}
  </Chart>
  );
}

export default CandlestickChart
