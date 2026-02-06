"use strict";

exports.__esModule = true;
exports.customX = exports.crCoordinateProps = void 0;
const customX = (props, moreProps) => {
  const {
      snapX,
      displayFormat
    } = props,
    {
      xScale,
      xAccessor,
      currentItem,
      mouseXY,
      displayXAccessor
    } = moreProps,
    [x, _coordinate] = snapX ? [xScale(xAccessor(currentItem)), displayXAccessor(currentItem)] : [mouseXY[0], xScale.invert(0)];
  return {
    x,
    coordinate: displayFormat(_coordinate)
  };
};
exports.customX = customX;
const crCoordinateProps = (props, moreProps) => {
  const {
    show,
    currentItem,
    chartConfig: {
      height
    }
  } = moreProps;
  if (currentItem == null) return null;
  const {
      orient,
      at,
      stroke,
      strokeOpacity,
      strokeWidth,
      rectRadius,
      rectWidth,
      rectHeight,
      fill,
      opacity,
      fontFamily,
      fontSize,
      textFill,
      customX
    } = props,
    {
      x,
      coordinate
    } = customX(props, moreProps);
  return {
    type: "vertical",
    hideLine: true,
    edgeAt: at === "bottom" ? height : 0,
    coordinate,
    show,
    orient,
    fill,
    opacity,
    fontFamily,
    fontSize,
    textFill,
    stroke,
    strokeOpacity,
    strokeWidth,
    rectWidth,
    rectHeight,
    rectRadius,
    arrowWidth: 0,
    x1: x,
    x2: x,
    y1: 0,
    y2: height
  };
};
exports.crCoordinateProps = crCoordinateProps;
//# sourceMappingURL=helperX.js.map