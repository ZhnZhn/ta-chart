import {
  CL_TOOLTIP
} from '../CL'

const DF_FONT_SIZE = 11
, DF_FONT_FAMILY = "-apple-system, system-ui, 'Helvetica Neue', Ubuntu, sans-serif";

const TooltipText = ({
  className=CL_TOOLTIP,
  fontFamily=DF_FONT_FAMILY,
  fontSize=DF_FONT_SIZE,
  children,
  ...restProps
}) => (
  <text
    className={className}
    fontFamily={fontFamily}
    fontSize={fontSize}
    {...restProps}
  >
    {children}
  </text>
);

export default TooltipText
