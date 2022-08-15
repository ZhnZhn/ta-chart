import Ch from '../Ch';
import { numberFormat2F } from '../chartFns';

const CHART_Y_EXTENDS = d => [d.high, d.low]
, CHART_ORIGIN = (w, h) => [0, h - 510]
, LS_Y_ACCESSOR = d => d.close;

const CloseSeria = ({
  id,
  height
}) => (
  <Ch.Chart
    id={id}
    height={height}
    yExtents={CHART_Y_EXTENDS}
    origin={CHART_ORIGIN}
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

export default CloseSeria
