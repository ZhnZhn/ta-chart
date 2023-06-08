"use strict";

exports.__esModule = true;
exports.getYCoordinate = exports.crCoordinateProps = void 0;
var getYCoordinate = function getYCoordinate(y, displayValue, props, moreProps) {
  var width = moreProps.width,
    orient = props.orient,
    at = props.at,
    rectWidth = props.rectWidth,
    rectHeight = props.rectHeight,
    dx = props.dx,
    fill = props.fill,
    opacity = props.opacity,
    fontFamily = props.fontFamily,
    fontSize = props.fontSize,
    textFill = props.textFill,
    arrowWidth = props.arrowWidth,
    stroke = props.stroke,
    strokeOpacity = props.strokeOpacity,
    strokeWidth = props.strokeWidth;
  return {
    coordinate: displayValue === 'NaNundefined' ? 'no data' : displayValue,
    show: true,
    type: "horizontal",
    hideLine: true,
    edgeAt: at === "right" ? width : 0,
    orient: orient,
    fill: fill,
    opacity: opacity,
    fontFamily: fontFamily,
    fontSize: fontSize,
    textFill: textFill,
    stroke: stroke,
    strokeOpacity: strokeOpacity,
    strokeWidth: strokeWidth,
    rectWidth: rectWidth,
    rectHeight: rectHeight,
    arrowWidth: arrowWidth,
    dx: dx,
    x1: 0,
    x2: width,
    y1: y,
    y2: y
  };
};
exports.getYCoordinate = getYCoordinate;
var crCoordinateProps = function crCoordinateProps(props, moreProps) {
  var displayFormat = props.displayFormat,
    yAccessor = props.yAccessor,
    chartConfig = moreProps.chartConfig,
    currentCharts = moreProps.currentCharts,
    currentItem = moreProps.currentItem,
    mouseXY = moreProps.mouseXY,
    show = moreProps.show,
    _ref = chartConfig || {},
    id = _ref.id,
    yScale = _ref.yScale;
  if (mouseXY == null || currentCharts.indexOf(id) < 0 || !show || yAccessor && !currentItem) {
    return null;
  }
  var y = yAccessor ? yScale(yAccessor(currentItem)) : mouseXY[1] - chartConfig.origin[1],
    coordinate = displayFormat(yScale.invert(y));
  return getYCoordinate(y, coordinate, props, moreProps);
};
exports.crCoordinateProps = crCoordinateProps;
//# sourceMappingURL=helperY.js.map