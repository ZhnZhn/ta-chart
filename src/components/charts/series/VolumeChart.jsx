import {
  Chart,
  YAxis,
  MouseCoordinateY,
  BarSeries,
  XAxis,
  MouseCoordinateX
} from '../Ch';
import {
  COLOR,
  numberFormat4S,
  numberFormat0S
} from '../chartFns';
import useTimeIntervalBarWidth from './useTimeIntervalBarWidth';

const _fill = (d, dPrev) => (d || {}).close > (dPrev || {}).close
 ? COLOR.UP
 : COLOR.DOWN;

const BS_Y_ACCESOR = d => d.volume;

const VolumeChart = ({
  id,
  height,
  timeInterval,
  timeFormat,
  yExtents,
  origin
}) => {
  const _bsWidth = useTimeIntervalBarWidth(timeInterval);
  return (
     <Chart
       id={id}
       height={height}
       yExtents={yExtents}
       origin={origin}
     >
       <YAxis
         axisAt="left"
         orient="left"
         ticks={3}
         tickFormat={numberFormat0S}
         stroke="black"
       />
       <MouseCoordinateY
         at="left"
         orient="left"
         displayFormat={numberFormat4S}
       />
       <BarSeries
          width={_bsWidth}
          yAccessor={BS_Y_ACCESOR}
          fill={_fill}
          stroke={_fill}
       />
       <XAxis
         axisAt="bottom"
         orient="bottom"
         ticks={6}
       />
       <MouseCoordinateX
         at="bottom"
         orient="bottom"
         displayFormat={timeFormat}
       />
     </Chart>
  );
}

export default VolumeChart
