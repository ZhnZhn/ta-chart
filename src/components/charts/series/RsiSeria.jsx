import Ch from '../Ch';
import { numberFormat2F } from '../chartFns';

const CL_TOOLTIP = 'rs-tooltip';

const FN_NOOP = () => {}

const _rsiStroke = {
  line: '#000000',
  top: '#b8b2bb',
  middle: 'transparent',
  bottom: '#b8c2cc',
  outsideThreshold: '#b300b3',
  insideThreshold: '#4699cb'
};

const RsiSeria = ({
  id,
  height,
  width,
  rsi
}) => (
  <Ch.Chart
    id={id}
    height={height}
    yExtents={[0, 100]}
    origin={(w, h) => [0, h - 510]}
  >
    <Ch.YAxis
      axisAt="right"
      orient="right"
      stroke="black"
      tickStroke="#4699cb"
      tickValues={[30, 50, 70]}
    />
    <Ch.MouseCoordinateY
      at="right"
      orient="right"
      displayFormat={numberFormat2F}
    />
    <Ch.RSISeries
      yAccessor={d => d.rsi}
      stroke={_rsiStroke}
    />
    <Ch.RSITooltip
      className={CL_TOOLTIP}
      origin={[width-160, 10]}
      fontSize={15}
      yAccessor={d => d.rsi}
      options={rsi.options()}
      onClick={FN_NOOP}
    />
  </Ch.Chart>
);

export default RsiSeria
