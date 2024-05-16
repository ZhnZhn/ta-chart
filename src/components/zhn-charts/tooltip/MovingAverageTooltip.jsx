import { getProps } from '../../uiApi';
import { format } from '../d3Format';

import GenericChartComponent from '../core/GenericChartComponent';
import {
  functor,
  last,
  crCssTranslate
} from '../utils';
import {
  CL_MA_TOOLTIP
} from '../CL';

import MovingAverage from './MovingAverage';

const DRAW_ON = ['mousemove']
, DF_PROPS = {
  className: CL_MA_TOOLTIP,
  displayFormat: format('.2f'),
  displayInit: 'n/a',
  displayValuesFor: (_, props) => props.currentItem,
  origin: [0, 10],
  width: 65,
};

export const MovingAverageTooltip = props => {
  const _props = getProps(props, DF_PROPS)
  , _renderSVG = (moreProps) => {
     const {
       chartId,
       chartConfig,
       chartConfig: { height },
       fullData,
     } = moreProps
     , {
        className,
        displayInit,
        onClick,
        width,
        fontFamily,
        fontSize,
        fontWeight,
        textFill,
        labelFill,
        origin: originProp,
        displayFormat,
        displayValuesFor,
        options,
     } = _props
     , currentItem = displayValuesFor(_props, moreProps)
         ?? last(fullData)
     , origin = functor(originProp)
     , [x, y] = origin(width, height)
     , [ox, oy] = chartConfig.origin
     , _transform = crCssTranslate([ox + x, oy + y]);

     return (
       <g
        transform={_transform}
        className={className}
       >
        {options.map((each, idx) => {
            const yValue = currentItem && each.yAccessor(currentItem)
            , tooltipLabel = `${each.type} (${each.windowSize})`
            , yDisplayValue = yValue
                ? displayFormat(yValue)
                : displayInit;
            return (
             <MovingAverage
                key={idx}
                origin={[width * idx, 0]}
                color={each.stroke}
                displayName={tooltipLabel}
                value={yDisplayValue}
                options={each}
                forChart={chartId}
                onClick={onClick}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                textFill={textFill}
                labelFill={labelFill}
             />
            );
         })}
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
}
