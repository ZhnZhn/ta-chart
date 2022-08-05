"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _LineSeries = _interopRequireDefault(require("./LineSeries"));

var _AreaOnlySeries = _interopRequireDefault(require("./AreaOnlySeries"));

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
var BollingerSeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(BollingerSeries, _Component);

  function BollingerSeries(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.yAccessorForTop = _this.yAccessorForTop.bind((0, _assertThisInitialized2["default"])(_this));
    _this.yAccessorForMiddle = _this.yAccessorForMiddle.bind((0, _assertThisInitialized2["default"])(_this));
    _this.yAccessorForBottom = _this.yAccessorForBottom.bind((0, _assertThisInitialized2["default"])(_this));
    _this.yAccessorForScalledBottom = _this.yAccessorForScalledBottom.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  var _proto = BollingerSeries.prototype;

  _proto.yAccessorForTop = function yAccessorForTop(d) {
    var yAccessor = this.props.yAccessor;
    return yAccessor(d) && yAccessor(d).top;
  };

  _proto.yAccessorForMiddle = function yAccessorForMiddle(d) {
    var yAccessor = this.props.yAccessor;
    return yAccessor(d) && yAccessor(d).middle;
  };

  _proto.yAccessorForBottom = function yAccessorForBottom(d) {
    var yAccessor = this.props.yAccessor;
    return yAccessor(d) && yAccessor(d).bottom;
  };

  _proto.yAccessorForScalledBottom = function yAccessorForScalledBottom(scale, d) {
    var yAccessor = this.props.yAccessor;
    return scale(yAccessor(d) && yAccessor(d).bottom);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        areaClassName = _this$props.areaClassName,
        className = _this$props.className,
        opacity = _this$props.opacity;
    var _this$props2 = this.props,
        stroke = _this$props2.stroke,
        fill = _this$props2.fill;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LineSeries["default"], {
        yAccessor: this.yAccessorForTop,
        stroke: stroke.top,
        fill: "none"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineSeries["default"], {
        yAccessor: this.yAccessorForMiddle,
        stroke: stroke.middle,
        fill: "none"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineSeries["default"], {
        yAccessor: this.yAccessorForBottom,
        stroke: stroke.bottom,
        fill: "none"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AreaOnlySeries["default"], {
        className: areaClassName,
        yAccessor: this.yAccessorForTop,
        base: this.yAccessorForScalledBottom,
        stroke: "none",
        fill: fill,
        opacity: opacity
      })]
    });
  };

  return BollingerSeries;
}(_react.Component);
/*
BollingerSeries.propTypes = {
	yAccessor: PropTypes.func.isRequired,
	className: PropTypes.string,
	areaClassName: PropTypes.string,
	opacity: PropTypes.number,
	type: PropTypes.string,
	stroke: PropTypes.shape({
		top: PropTypes.string.isRequired,
		middle: PropTypes.string.isRequired,
		bottom: PropTypes.string.isRequired,
	}).isRequired,
	fill: PropTypes.string.isRequired,
};
*/


BollingerSeries.defaultProps = {
  className: _CL.CL_BB_SERIES,
  areaClassName: _CL.CL_BB_SERIES_AREA,
  opacity: 0.2
};
var _default = BollingerSeries;
exports["default"] = _default;
//# sourceMappingURL=BollingerSeries.js.map