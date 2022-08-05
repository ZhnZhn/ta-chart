"use strict";

exports.__esModule = true;
exports.getYCoordinate = exports.crCoordinateProps = void 0;

var _utils = require("../utils");

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
    coordinate: displayValue,
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
  var chartId = moreProps.chartId,
      currentCharts = moreProps.currentCharts,
      mouseXY = moreProps.mouseXY,
      show = moreProps.show;
  if ((0, _utils.isNotDefined)(mouseXY)) return null;
  if (currentCharts.indexOf(chartId) < 0) return null;
  if (!show) return null;
  var y = mouseXY[1],
      yScale = moreProps.chartConfig.yScale,
      displayFormat = props.displayFormat,
      coordinate = displayFormat(yScale.invert(y));
  return getYCoordinate(y, coordinate, props, moreProps);
};

exports.crCoordinateProps = crCoordinateProps;
//# sourceMappingURL=helperY.js.map