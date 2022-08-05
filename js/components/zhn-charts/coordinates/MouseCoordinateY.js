"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _helperY = require("./helperY");

var _crMouseCoordinate = _interopRequireDefault(require("./crMouseCoordinate"));

var _MouseCoordinateStyle = require("./MouseCoordinateStyle");

//import PropTypes from "prop-types";
var MouseCoordinateY = (0, _crMouseCoordinate["default"])(_helperY.crCoordinateProps);
MouseCoordinateY.defaultProps = {
  fill: _MouseCoordinateStyle.fill,
  textFill: _MouseCoordinateStyle.textFill,
  fontFamily: _MouseCoordinateStyle.fontFamily,
  fontSize: _MouseCoordinateStyle.fontSize,
  yAxisPad: 0,
  rectWidth: 50,
  rectHeight: 20,
  orient: "left",
  at: "left",
  dx: 0,
  arrowWidth: 10,
  opacity: 1,
  // stroke: "#684F1D",
  strokeOpacity: 1,
  strokeWidth: 1
};
/*
MouseCoordinateY.propTypes = {
	displayFormat: PropTypes.func.isRequired,
	yAxisPad: PropTypes.number,
	rectWidth: PropTypes.number,
	rectHeight: PropTypes.number,
	orient: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	at: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	dx: PropTypes.number,
	fill: PropTypes.string,
	opacity: PropTypes.number,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	textFill: PropTypes.string,
};
*/

var _default = MouseCoordinateY;
exports["default"] = _default;
//# sourceMappingURL=MouseCoordinateY.js.map