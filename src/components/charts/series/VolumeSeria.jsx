import Ch from '../Ch'
import fns from '../chartFns'

const {
  C,
  timeIntervalBarWidth,
  format
} = fns;

const _fill = (d, dPrev) => d.close > dPrev.close
 ? C.UP
 : C.DOWN;

const VolumeSeria = ({
  id, height,
  timeInterval, timeFormat
}) => (
  <Ch.Chart
      id={id} height={height}
      yExtents={d => d.volume}
      origin={(w, h) => [0, h - 140]}
  >
    <Ch.YAxis
      axisAt="left" orient="left"
      ticks={5} tickFormat={format(".0s")}
      stroke="black"
    />
    <Ch.MouseCoordinateY
        at="left" orient="left"
        displayFormat={format(".4s")}
    />

    <Ch.BarSeries
        width={timeIntervalBarWidth(timeInterval)}
        yAccessor={d => d.volume}
        fill={_fill}
        stroke={_fill}
    />

    <Ch.XAxis
      axisAt="bottom" orient="bottom"
      ticks={6}
    />
    <Ch.MouseCoordinateX
      at="bottom" orient="bottom"
      displayFormat={timeFormat}
    />
  </Ch.Chart>
);

export default VolumeSeria
