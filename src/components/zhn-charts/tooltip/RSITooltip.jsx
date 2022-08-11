import { format } from 'd3-format';

import useEventCallback from '../../hooks/useEventCallback';

import GenericChartComponent from '../core/GenericChartComponent';
import {
  functor,
  isDefined
} from '../utils';

import {
  CL_TOOLTIP
} from '../CL';

import TooltipText from './TooltipText';
import TooltipTSpan from './TooltipTSpan';

const DF_DISPLAY_FORMAT = format('.2f')
, DF_DISPLAY_INIT = 'n/a'
, DF_DISPLAY_VALUES_FOR = (_, props) => props.currentItem
, DF_ORIGIN = [0, 0]
, DRAW_ON = ['mousemove'];

const RSITooltip = (props) => {
  const {
    className=CL_TOOLTIP,
    displayInit=DF_DISPLAY_INIT,
    displayFormat=DF_DISPLAY_FORMAT,
    displayValuesFor=DF_DISPLAY_VALUES_FOR,
    origin: originProp=DF_ORIGIN,
    fontFamily,
    fontSize,
    fontWeight,
    yAccessor,
    options,
    labelFill,
    labelFontWeight,
    textFill,
    onClick
  } = props
  const _renderSvg = useEventCallback(moreProps => {
    const {
      chartConfig: { width, height }
    } = moreProps
    , currentItem = displayValuesFor(props, moreProps)
    , rsi = isDefined(currentItem) && yAccessor(currentItem)
    , value = (rsi && displayFormat(rsi)) || displayInit
    , origin = functor(originProp)
    , [
      x,
      y
    ] = origin(width, height)
    , tooltipLabel = `RSI (${options.windowSize}): `;

    return (
      <g
        className={className}
        transform={`translate(${x}, ${y})`}
        onClick={onClick}
      >
        <TooltipText
          x={0}
          y={0}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
        >
          <TooltipTSpan
            fill={labelFill}
            fontWeight={labelFontWeight}
          >
            {tooltipLabel}
          </TooltipTSpan>
          <tspan
            fill={textFill}
          >
            {value}
          </tspan>
        </TooltipText>
      </g>
    );
  });

  return (
    <GenericChartComponent
      clip={false}
      svgDraw={_renderSvg}
      drawOn={DRAW_ON}
    />
  );
}

export default RSITooltip
