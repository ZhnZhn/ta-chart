"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.BollingerSeries = void 0;
var _uiApi = require("../../uiApi");
var _LineSeries = require("./LineSeries");
var _AreaOnlySeries = _interopRequireDefault(require("./AreaOnlySeries"));
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types';

class BollingerSeries extends _uiApi.Component {
  constructor() {
    super(...arguments);
    this.yAccessorForTop = d => {
      const {
          yAccessor
        } = this.props,
        _d = yAccessor(d);
      return _d && _d.top;
    };
    this.yAccessorForMiddle = d => {
      const {
          yAccessor
        } = this.props,
        _d = yAccessor(d);
      return _d && _d.middle;
    };
    this.yAccessorForBottom = d => {
      const {
          yAccessor
        } = this.props,
        _d = yAccessor(d);
      return _d && _d.bottom;
    };
    this.yAccessorForScalledBottom = (scale, d) => {
      const {
          yAccessor
        } = this.props,
        _d = yAccessor(d);
      return scale(_d && _d.bottom);
    };
  }
  render() {
    const {
      className,
      areaClassName,
      opacity,
      stroke,
      fill
    } = this.props;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
      className: className,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_LineSeries.LineSeries, {
        yAccessor: this.yAccessorForTop,
        stroke: stroke.top,
        fill: "none"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineSeries.LineSeries, {
        yAccessor: this.yAccessorForMiddle,
        stroke: stroke.middle,
        fill: "none"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_LineSeries.LineSeries, {
        yAccessor: this.yAccessorForBottom,
        stroke: stroke.bottom,
        fill: "none"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AreaOnlySeries.default, {
        className: areaClassName,
        yAccessor: this.yAccessorForTop,
        base: this.yAccessorForScalledBottom,
        opacity: opacity,
        stroke: "none",
        fill: fill
      })]
    });
  }
}

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
exports.BollingerSeries = BollingerSeries;
BollingerSeries.defaultProps = {
  className: _CL.CL_BB_SERIES,
  areaClassName: _CL.CL_BB_SERIES_AREA,
  opacity: 0.2
};
//# sourceMappingURL=BollingerSeries.js.map