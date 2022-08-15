import Ch from '../Ch';
import { numberFormat2F } from '../chartFns';

const LS_Y_ACCESSOR = d => d.close;

const CloseChart = ({
  id,
  height,
  yExtents,
  origin
}) => (
  <Ch.Chart
    id={id}
    height={height}
    yExtents={yExtents}
    origin={origin}
  >
    <Ch.YAxis
      axisAt="left"
      orient="left"
      stroke="black"
      ticks={5}
    />
    <Ch.LineSeries
      yAccessor={LS_Y_ACCESSOR}
      stroke="black"
    />
    <Ch.MouseCoordinateY
      at="left"
      orient="left"
      displayFormat={numberFormat2F}
    />
  </Ch.Chart>
);

export default CloseChart
