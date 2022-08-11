"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uiApi = require("../../uiApi");

var _GenericComponent = require("./GenericComponent");

var _utils = require("./utils");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["refComp"];
var _isArr = Array.isArray,
    ALWAYS_TRUE_TYPES = ['drag', 'dragend'];

var _drawRectClip = function _drawRectClip(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.rect(x1, y1, x2, y2);
  ctx.clip();
};

var GenericChartComponent = function GenericChartComponent(props, context) {
  var refComp = props.refComp,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(props, _excluded),
      clip = restProps.clip,
      edgeClip = restProps.edgeClip,
      disablePan = restProps.disablePan,
      chartId = context.chartId,
      ratio = context.ratio,
      _context$margin = context.margin,
      left = _context$margin.left,
      right = _context$margin.right,
      top = _context$margin.top,
      _preCanvasDraw = (0, _uiApi.useCallback)(function (ctx, moreProps) {
    ctx.save();

    var _moreProps$chartConfi = moreProps.chartConfig,
        width = _moreProps$chartConfi.width,
        height = _moreProps$chartConfi.height,
        origin = _moreProps$chartConfi.origin,
        _ratio = 0.5 * ratio,
        canvasOriginX = _ratio + origin[0] + left,
        canvasOriginY = _ratio + origin[1] + top;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(ratio, ratio);

    if (edgeClip) {
      _drawRectClip(ctx, -1, canvasOriginY - 10, width + left + right + 1, height + 20);
    }

    ctx.translate(canvasOriginX, canvasOriginY);

    if (clip) {
      _drawRectClip(ctx, -1, -1, width + 1, height + 1);
    }
  }, [left, right, top, ratio, clip, edgeClip]),
      _postCanvasDraw = (0, _uiApi.useCallback)(function (ctx, moreProps) {
    ctx.restore();
  }, []),
      _updateMoreProps = (0, _uiApi.useCallback)(function (fromMoreProps, toMoreProps) {
    var chartConfig = fromMoreProps.chartConfig;

    if (chartConfig && _isArr(chartConfig)) {
      toMoreProps.chartConfig = chartConfig.find(function (each) {
        return each.id === chartId;
      });
    }

    if ((0, _utils.isDefined)(toMoreProps.chartConfig)) {
      var _toMoreProps$chartCon = toMoreProps.chartConfig.origin,
          ox = _toMoreProps$chartCon[0],
          oy = _toMoreProps$chartCon[1],
          mouseXY = fromMoreProps.mouseXY,
          startPos = fromMoreProps.startPos;

      if ((0, _utils.isDefined)(mouseXY)) {
        var x = mouseXY[0],
            y = mouseXY[1];
        toMoreProps.mouseXY = [x - ox, y - oy];
      }

      if ((0, _utils.isDefined)(startPos)) {
        var _x = startPos[0],
            _y = startPos[1];
        toMoreProps.startPos = [_x - ox, _y - oy];
      }
    }
  }, [chartId]),
      _shouldTypeProceed = (0, _uiApi.useCallback)(function (type, moreProps) {
    if (disablePan && (type === 'mousemove' || type === 'click')) {
      return true;
    }

    var _ref = moreProps || {},
        currentCharts = _ref.currentCharts;

    if ((0, _utils.isDefined)(currentCharts) && ALWAYS_TRUE_TYPES.indexOf(type) === -1) {
      return currentCharts.indexOf(chartId) > -1;
    }

    return true;
  }, [disablePan, chartId]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericComponent.GenericComponent, (0, _extends2["default"])({}, restProps, {
    ref: refComp,
    preCanvasDraw: _preCanvasDraw,
    postCanvasDraw: _postCanvasDraw,
    updateMoreProps: _updateMoreProps,
    shouldTypeProceed: _shouldTypeProceed
  }));
};

var DF_DRAW_ON = [];
GenericChartComponent.defaultProps = {
  drawOn: DF_DRAW_ON
};
GenericChartComponent.contextTypes = {
  chartId: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  ratio: _propTypes["default"].number.isRequired,
  margin: _propTypes["default"].object.isRequired
};
var _default = GenericChartComponent;
exports["default"] = _default;
//# sourceMappingURL=GenericChartComponent.js.map