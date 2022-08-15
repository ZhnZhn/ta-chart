import { useMemo } from '../../uiApi';

import Ch from '../Ch';
import { numberFormat2F } from '../chartFns';

const CL_TOOLTIP = 'rs-tooltip';

const _rsiStroke = {
  line: '#000000',
  top: '#b8b2bb',
  middle: 'transparent',
  bottom: '#b8c2cc',
  outsideThreshold: '#b300b3',
  insideThreshold: '#4699cb'
};

const CHART_Y_EXTENDS = [0, 100]
, CHART_ORIGIN = (w, h) => [0, h - 510]
, YAXIS_TICK_VALUES = [30, 50, 70]
, RSI_Y_ACCESOR = d => d.rsi;

const RsiSeria = ({
  id,
  height,
  width,
  rsi
}) => {
  const _rsiTooltipOrigin = useMemo(
    ()=>[width-160, 10],
    [width]
  ),
  _rsiOptions = useMemo(
    () => rsi.options(),
    [rsi]
  );

  return (
    <Ch.Chart
      id={id}
      height={height}
      yExtents={CHART_Y_EXTENDS}
      origin={CHART_ORIGIN}
    >
      <Ch.YAxis
        axisAt="right"
        orient="right"
        stroke="black"
        tickStroke="#4699cb"
        tickValues={YAXIS_TICK_VALUES}
      />
      <Ch.MouseCoordinateY
        at="right"
        orient="right"
        displayFormat={numberFormat2F}
      />
      <Ch.RSISeries
        yAccessor={RSI_Y_ACCESOR}
        stroke={_rsiStroke}
      />
      <Ch.RSITooltip
        className={CL_TOOLTIP}
        fontSize={15}
        yAccessor={RSI_Y_ACCESOR}
        origin={_rsiTooltipOrigin}
        options={_rsiOptions}
      />
    </Ch.Chart>
  );
}

export default RsiSeria
