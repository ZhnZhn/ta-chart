import Ch from '../Ch'
import {
  COLOR,
  timeIntervalBarWidth,
  numberFormat4F,
  numberFormat8Trim
} from '../chartFns';

const CL_TOOLTIP = 'rs-tooltip';

const _stroke = (d, dPrev) => (d || {}).close > (dPrev || {}).close
  ? COLOR.UP
  : COLOR.DOWN;

const _fill = (d, dPrev) => (d || {}).close > (d || {}).open
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

const CandleSeria = ({
  id,
  height,
  timeInterval,
  timeFormat,
  sma20,
  sma50,
  bb
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
  >
    <Ch.YAxis
      axisAt="right"
      orient="right"
      ticks={5}
      stroke="black"
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
      origin={[5, -90]}
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
    />
    <Ch.BollingerBandTooltip
      className={CL_TOOLTIP}
      fontSize={15}
      origin={[190, 440]}
      yAccessor={d => d.bb}
      options={bb.options()}
    />
  </Ch.Chart>
  );
}

export default CandleSeria
