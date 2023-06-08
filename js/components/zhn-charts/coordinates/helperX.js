"use strict";

exports.__esModule = true;
exports.customX = exports.crCoordinateProps = void 0;
var customX = function customX(props, moreProps) {
  var snapX = props.snapX,
    displayFormat = props.displayFormat,
    xScale = moreProps.xScale,
    xAccessor = moreProps.xAccessor,
    currentItem = moreProps.currentItem,
    mouseXY = moreProps.mouseXY,
    displayXAccessor = moreProps.displayXAccessor,
    _ref = snapX ? [xScale(xAccessor(currentItem)), displayXAccessor(currentItem)] : [mouseXY[0], xScale.invert(x)],
    x = _ref[0],
    _coordinate = _ref[1];
  return {
    x: x,
    coordinate: displayFormat(_coordinate)
  };
};
exports.customX = customX;
var crCoordinateProps = function crCoordinateProps(props, moreProps) {
  var show = moreProps.show,
    currentItem = moreProps.currentItem,
    height = moreProps.chartConfig.height;
  if (currentItem == null) return null;
  var orient = props.orient,
    at = props.at,
    stroke = props.stroke,
    strokeOpacity = props.strokeOpacity,
    strokeWidth = props.strokeWidth,
    rectRadius = props.rectRadius,
    rectWidth = props.rectWidth,
    rectHeight = props.rectHeight,
    fill = props.fill,
    opacity = props.opacity,
    fontFamily = props.fontFamily,
    fontSize = props.fontSize,
    textFill = props.textFill,
    customX = props.customX,
    _customX = customX(props, moreProps),
    x = _customX.x,
    coordinate = _customX.coordinate;
  return {
    type: "vertical",
    hideLine: true,
    edgeAt: at === "bottom" ? height : 0,
    coordinate: coordinate,
    show: show,
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
    rectRadius: rectRadius,
    arrowWidth: 0,
    x1: x,
    x2: x,
    y1: 0,
    y2: height
  };
};
exports.crCoordinateProps = crCoordinateProps;
//# sourceMappingURL=helperX.js.map