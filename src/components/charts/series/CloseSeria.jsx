import Ch from '../Ch';
import { numberFormat2F } from '../chartFns';

const CloseSeria = ({
  id,
  height
}) => (
  <Ch.Chart
    id={id}
    height={height}
    yExtents={d => [d.high, d.low]}
    origin={(w, h) => [0, h - 510]}
  >
    <Ch.YAxis
      axisAt="left"
      orient="left"
      stroke="black"
      ticks={5}
    />
    <Ch.LineSeries
      yAccessor={d => d.close}
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
