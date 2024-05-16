"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _GenericComponent = require("./GenericComponent");
var _Chart = require("./Chart");
var _ChartFn = require("./ChartFn");
var _jsxRuntime = require("react/jsx-runtime");
const _isArr = Array.isArray,
  ALWAYS_TRUE_TYPES = ['drag', 'dragend'];
const _drawRectClip = (ctx, x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.rect(x1, y1, x2, y2);
  ctx.clip();
};
const DF_DRAW_ON = [];
const GenericChartComponent = _ref => {
  let {
    refComp,
    drawOn = DF_DRAW_ON,
    ...restProps
  } = _ref;
  const chartContexValue = (0, _uiApi.useContext)(_Chart.ChartContext),
    {
      clip,
      edgeClip,
      disablePan
    } = restProps,
    {
      chartId,
      ratio,
      margin: {
        left,
        right,
        top
      }
    } = chartContexValue,
    _preCanvasDraw = (0, _uiApi.useCallback)((ctx, moreProps) => {
      const chartConfig = (0, _ChartFn.findChartConfig)(moreProps.chartConfigs, chartId);
      if (!chartConfig) {
        return;
      }
      ctx.save();
      const {
          width,
          height,
          origin
        } = chartConfig,
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
    }, [left, right, top, ratio, clip, edgeClip, chartId]),
    _postCanvasDraw = (0, _uiApi.useCallback)((ctx, moreProps) => {
      ctx.restore();
    }, []),
    _updateMoreProps = (0, _uiApi.useCallback)((fromMoreProps, toMoreProps) => {
      const {
        chartConfig
      } = fromMoreProps || toMoreProps;
      if (chartConfig && _isArr(chartConfig)) {
        toMoreProps.chartConfig = chartConfig.find(each => each.id === chartId);
      }
      if (toMoreProps.chartConfig) {
        const {
            origin: [ox, oy]
          } = toMoreProps.chartConfig,
          {
            mouseXY,
            startPos
          } = fromMoreProps;
        if (mouseXY) {
          const [x, y] = mouseXY;
          toMoreProps.mouseXY = [x - ox, y - oy];
        }
        if (startPos) {
          const [x, y] = startPos;
          toMoreProps.startPos = [x - ox, y - oy];
        }
      }
    }, [chartId]),
    _shouldTypeProceed = (0, _uiApi.useCallback)((type, moreProps) => {
      if (disablePan && (type === 'mousemove' || type === 'click')) {
        return true;
      }
      const {
        currentCharts
      } = moreProps || {};
      if (currentCharts && ALWAYS_TRUE_TYPES.indexOf(type) === -1) {
        return currentCharts.indexOf(chartId) > -1;
      }
      return true;
    }, [disablePan, chartId]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericComponent.GenericComponent, {
    ...restProps,
    refEl: refComp,
    drawOn: drawOn,
    preCanvasDraw: _preCanvasDraw,
    postCanvasDraw: _postCanvasDraw,
    updateMoreProps: _updateMoreProps,
    shouldTypeProceed: _shouldTypeProceed
  });
};
var _default = exports.default = GenericChartComponent;
//# sourceMappingURL=GenericChartComponent.js.map