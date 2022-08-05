import {
  getCurrentItem
} from '../utils/ChartDataUtil';

export const mouseBasedZoomAnchor = ({
  xScale,
  xAccessor,
  mouseXY,
  plotData
}) => xAccessor(getCurrentItem(
  xScale,
  xAccessor,
  mouseXY,
  plotData
));
