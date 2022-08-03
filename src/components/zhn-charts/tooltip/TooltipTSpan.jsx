import {
  CL_TOOLTIP_LABEL
} from '../CL';

const DF_FILL = '#4682b4';

const TooltipTSpan = ({
  className=CL_TOOLTIP_LABEL,
  fill=DF_FILL,
  children,
  ...restProps
}) => (
  <tspan
    className={className}
    fill={fill}
    {...restProps}
  >
   {children}
  </tspan>
);

export default TooltipTSpan
