import Ch from '../Ch';
import {
  COLOR,
  numberFormat4S,
  numberFormat0S
} from '../chartFns';
import useTimeIntervalBarWidth from './useTimeIntervalBarWidth';

const _fill = (d, dPrev) => (d || {}).close > (dPrev || {}).close
 ? COLOR.UP
 : COLOR.DOWN;

const CHART_Y_EXTENDS = d => d.volume
, CHART_ORIGIN = (w, h) => [0, h - 140]
, BS_Y_ACCESOR = d => d.volume;

const VolumeSeria = ({
  id,
  height,
  timeInterval,
  timeFormat
}) => {
  const _bsWidth = useTimeIntervalBarWidth(timeInterval);
  return (
     <Ch.Chart
       id={id}
       height={height}
       yExtents={CHART_Y_EXTENDS}
       origin={CHART_ORIGIN}
     >
       <Ch.YAxis
         axisAt="left"
         orient="left"
         ticks={5}
         tickFormat={numberFormat0S}
         stroke="black"
       />
       <Ch.MouseCoordinateY
         at="left"
         orient="left"
         displayFormat={numberFormat4S}
       />
       <Ch.BarSeries
          width={_bsWidth}
          yAccessor={BS_Y_ACCESOR}
          fill={_fill}
          stroke={_fill}
       />
       <Ch.XAxis
         axisAt="bottom"
         orient="bottom"
         ticks={6}
       />
       <Ch.MouseCoordinateX
         at="bottom"
         orient="bottom"
         displayFormat={timeFormat}
       />
     </Ch.Chart>
  );
}

export default VolumeSeria
