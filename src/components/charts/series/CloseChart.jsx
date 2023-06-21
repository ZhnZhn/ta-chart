import {
  Chart,
  YAxis,
  LineSeries,
  MouseCoordinateY
} from '../Ch';
import { numberFormat2F } from '../chartFns';

const LS_Y_ACCESSOR = d => d.close;

const CloseChart = ({
  id,
  height,
  yExtents,
  origin
}) => (
  <Chart
    id={id}
    height={height}
    yExtents={yExtents}
    origin={origin}
  >
    <YAxis
      axisAt="left"
      orient="left"
      stroke="black"
      ticks={5}
    />
    <LineSeries
      yAccessor={LS_Y_ACCESSOR}
      stroke="black"
    />
    <MouseCoordinateY
      at="left"
      orient="left"
      displayFormat={numberFormat2F}
    />
  </Chart>
);

export default CloseChart
