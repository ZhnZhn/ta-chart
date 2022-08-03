import { useCallback } from '../../uiApi';

import TooltipText from './TooltipText';
import TooltipTSpan from './TooltipTSpan';

import {
  crCssTranslate
} from '../utils';

const MovingAverage = ({
  color,
  displayName,
  fontSize,
  fontFamily,
  fontWeight,
  textFill,
  labelFill,
  labelFontWeight,
  value,
  origin,

  onClick,
  forChart,
  options
}) => {
  const _onClick = useCallback(event => {
    if (onClick !== undefined) {
      onClick(event, { chartId: forChart, ...options });
    }
  }, [onClick, forChart, options])
  , translate = crCssTranslate(origin);

  return (
    <g transform={translate}>
       <line
         x1={0}
         y1={2}
         x2={0}
         y2={28}
         stroke={color}
         strokeWidth={4}
       />
       <TooltipText
         x={5}
         y={11}
         fontFamily={fontFamily}
         fontSize={fontSize}
         fontWeight={fontWeight}
       >
          <TooltipTSpan
            fill={labelFill}
            fontWeight={labelFontWeight}
          >
            {displayName}
          </TooltipTSpan>
          <tspan
            x={5}
            dy={15}
            fill={textFill}
          >
            {value}
          </tspan>
       </TooltipText>
       <rect
         x={0}
         y={0}
         width={55}
         height={30}
         fill="none"
         stroke="none"
         onClick={_onClick}
       />
    </g>
  );
}

export default MovingAverage
