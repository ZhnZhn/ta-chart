"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ChartDefaultConfig = exports.ChartContext = exports.Chart = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _d3Scale = require("d3-scale");
var _utils = require("../utils");
var _ChartCanvas = require("./ChartCanvas");
var _ChartFn = require("./ChartFn");
var _jsxRuntime = require("react/jsx-runtime");
var ChartContext = (0, _uiApi.createContext)((0, _extends2["default"])({}, _ChartCanvas.dfChartCanvasContextValue, {
  chartConfig: {},
  chartId: 0
}));
exports.ChartContext = ChartContext;
var Chart = (0, _uiApi.memo)(function (_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? 0 : _ref$id,
    onContextMenu = _ref.onContextMenu,
    onDoubleClick = _ref.onDoubleClick,
    children = _ref.children;
  var chartCanvasContextValue = (0, _uiApi.useContext)(_ChartCanvas.ChartCanvasContext),
    subscribe = chartCanvasContextValue.subscribe,
    unsubscribe = chartCanvasContextValue.unsubscribe,
    chartConfigs = chartCanvasContextValue.chartConfigs,
    listener = (0, _uiApi.useCallback)(function (type, moreProps, _, e) {
      switch (type) {
        case "contextmenu":
          {
            if (onContextMenu === undefined) {
              return;
            }
            var currentCharts = moreProps.currentCharts;
            if (currentCharts.indexOf(id) > -1) {
              onContextMenu(e, moreProps);
            }
            break;
          }
        case "dblclick":
          {
            if (onDoubleClick === undefined) {
              return;
            }
            var _currentCharts = moreProps.currentCharts;
            if (_currentCharts.indexOf(id) > -1) {
              onDoubleClick(e, moreProps);
            }
            break;
          }
        default:
          return;
      }
    }, [onContextMenu, onDoubleClick, id]),
    chartConfig = (0, _ChartFn.findChartConfig)(chartConfigs, id),
    chartContextValue = (0, _uiApi.useMemo)(function () {
      return (0, _extends2["default"])({}, chartCanvasContextValue, {
        chartId: id,
        chartConfig: chartConfig
      });
    }, [chartCanvasContextValue, id, chartConfig]),
    _transform = (0, _utils.crCssTranslate)(chartConfig.origin);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(function () {
    subscribe((0, _ChartFn.crSubscribeId)(id), {
      listener: listener
    });
    return function () {
      unsubscribe((0, _ChartFn.crSubscribeId)(id));
    };
  }, []);
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ChartContext.Provider, {
    value: chartContextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: _transform,
      children: children
    })
  });
});
exports.Chart = Chart;
var ChartDefaultConfig = {
  id: 0,
  flipYScale: false,
  origin: [0, 0],
  padding: 0,
  yPan: true,
  yPanEnabled: false,
  yScale: (0, _d3Scale.scaleLinear)()
};
exports.ChartDefaultConfig = ChartDefaultConfig;
//# sourceMappingURL=Chart.js.map