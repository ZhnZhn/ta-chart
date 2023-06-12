import { format } from "../d3Format";

import GenericChartComponent from '../core/GenericChartComponent';
import {
  functor,
  last,
  crCssTranslate
} from '../utils';
import {
  CL_BB_TOOLTIP
} from '../CL';

import TooltipText from './TooltipText';
import TooltipTSpan from './TooltipTSpan';

const DRAW_ON = ['mousemove'];

const BollingerBandTooltip = (
  props
) => {
  const _renderSVG = (moreProps) => {
      const {
        onClick,
        displayFormat,
        yAccessor,
        options,
        origin: originProp,
        textFill,
        labelFill,
        labelFontWeight,
        className,
        displayValuesFor,
        displayInit,
        fontFamily,
        fontSize,
        fontWeight,
      } = props
      , {
        chartConfig: { width, height },
        fullData,
      } = moreProps
      , currentItem = displayValuesFor(props, moreProps)
          ?? last(fullData);

      let top = displayInit
      , middle = displayInit
      , bottom = displayInit;

      if (currentItem !== undefined) {
        const item = yAccessor(currentItem);
        if (item !== undefined) {
          top = displayFormat(item.top);
          middle = displayFormat(item.middle);
          bottom = displayFormat(item.bottom);
        }
      }

      const origin = functor(originProp)
      , [x, y] = origin(width, height)
      , {
        sourcePath,
        windowSize,
        multiplier,
        movingAverageType
      } = options
      , tooltipLabel = `BB(${sourcePath}, ${windowSize}, ${multiplier}, ${movingAverageType})`
      , tooltipValue = `${top}, ${middle}, ${bottom}`
      , _transform = crCssTranslate([x, y]);

      return (
          <g
            transform={_transform}
            className={className}
            onClick={onClick}
          >
              <TooltipText
                x={0} y={0}
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
                    x={0}
                    dy={15}
                    fill={textFill}
                  >
                    {tooltipValue}
                  </tspan>
              </TooltipText>
          </g>
      );
  };

  return (
    <GenericChartComponent
       clip={false}
       svgDraw={_renderSVG}
       drawOn={DRAW_ON}
    />
  );
};

BollingerBandTooltip.defaultProps = {
  className: CL_BB_TOOLTIP,
  displayFormat: format('.2f'),
  displayValuesFor: (_, props) => props.currentItem,
  displayInit: 'n/a',
  origin: [8, 8],
  yAccessor: data => data.bb
}

export default BollingerBandTooltip
