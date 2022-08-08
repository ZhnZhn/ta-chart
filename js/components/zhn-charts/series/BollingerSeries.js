"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = require("react");

var _LineSeries = _interopRequireDefault(require("./LineSeries"));

var _AreaOnlySeries = _interopRequireDefault(require("./AreaOnlySeries"));

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types';
var BollingerSeries = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(BollingerSeries, _Component);

  function BollingerSeries() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this.yAccessorForTop = function (d) {
      var yAccessor = _this.props.yAccessor,
          _d = yAccessor(d);

      return _d && _d.top;
    };

    _this.yAccessorForMiddle = function (d) {
      var yAccessor = _this.props.yAccessor,
          _d = yAccessor(d);

      return _d && _d.middle;
    };

    _this.yAccessorForBottom = function (d) {
      var yAccessor = _this.props.yAccessor,
          _d = yAccessor(d);

      return _d && _d.bottom;
    };

    _this.yAccessorForScalledBottom = function (scale, d) {
      var yAccessor = _this.props.yAccessor,
          _d = yAccessor(d);

      return scale(_d && _d.bottom);
    };

    return _this;
  }

  var _proto = BollingerSeries.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        className = _this$props.className,
        areaClassName = _this$props.areaClassName,
        opacity = _this$props.opacity,
        stroke = _this$props.stroke,
        fill = _this$props.fill;
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
        opacity: opacity,
        stroke: "none",
        fill: fill
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