"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _helperX = require("./helperX");

var _crMouseCoordinate = _interopRequireDefault(require("./crMouseCoordinate"));

var _MouseCoordinateStyle = require("./MouseCoordinateStyle");

//import PropTypes from "prop-types";
var MouseCoordinateX = (0, _crMouseCoordinate["default"])(_helperX.crCoordinateProps);
MouseCoordinateX.defaultProps = {
  fill: _MouseCoordinateStyle.fill,
  textFill: _MouseCoordinateStyle.textFill,
  fontFamily: _MouseCoordinateStyle.fontFamily,
  fontSize: _MouseCoordinateStyle.fontSize,
  yAxisPad: 0,
  rectWidth: 80,
  rectHeight: 20,
  // rectRadius: 5,
  // stroke: "#684f1d",
  strokeOpacity: 1,
  strokeWidth: 1,
  orient: "bottom",
  at: "bottom",
  opacity: 1,
  snapX: true,
  customX: _helperX.customX
};
/*
MouseCoordinateX.propTypes = {
	displayFormat: PropTypes.func.isRequired,
	yAxisPad: PropTypes.number,
	rectWidth: PropTypes.number,
	rectHeight: PropTypes.number,
	orient: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	at: PropTypes.oneOf(["bottom", "top", "left", "right"]),
	fill: PropTypes.string,
	opacity: PropTypes.number,
	fontFamily: PropTypes.string,
	fontSize: PropTypes.number,
	textFill: PropTypes.string,
	snapX: PropTypes.bool
};
*/

var _default = MouseCoordinateX;
exports["default"] = _default;
//# sourceMappingURL=MouseCoordinateX.js.map