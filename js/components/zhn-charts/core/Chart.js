"use strict";

exports.__esModule = true;
exports.ChartDefaultConfig = exports.ChartContext = exports.Chart = void 0;
var _uiApi = require("../../uiApi");
var _d3Scale = require("../d3Scale");
var _utils = require("../utils");
var _ChartCanvas = require("./ChartCanvas");
var _ChartFn = require("./ChartFn");
var _dfChartCanvasContextValue = require("./dfChartCanvasContextValue");
var _jsxRuntime = require("react/jsx-runtime");
const ChartContext = (0, _uiApi.createContext)({
  ..._dfChartCanvasContextValue.dfChartCanvasContextValue,
  chartConfig: {},
  chartId: 0
});
exports.ChartContext = ChartContext;
const Chart = (0, _uiApi.memo)(_ref => {
  let {
    id = 0,
    onContextMenu,
    onDoubleClick,
    children
  } = _ref;
  const chartCanvasContextValue = (0, _uiApi.useContext)(_ChartCanvas.ChartCanvasContext),
    {
      subscribe,
      unsubscribe,
      chartConfigs
    } = chartCanvasContextValue,
    listener = (0, _uiApi.useCallback)((type, moreProps, _, e) => {
      switch (type) {
        case "contextmenu":
          {
            if (onContextMenu === undefined) {
              return;
            }
            const {
              currentCharts
            } = moreProps;
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
            const {
              currentCharts
            } = moreProps;
            if (currentCharts.indexOf(id) > -1) {
              onDoubleClick(e, moreProps);
            }
            break;
          }
        default:
          return;
      }
    }, [onContextMenu, onDoubleClick, id]),
    chartConfig = (0, _ChartFn.findChartConfig)(chartConfigs, id),
    chartContextValue = (0, _uiApi.useMemo)(() => ({
      ...chartCanvasContextValue,
      chartId: id,
      chartConfig
    }), [chartCanvasContextValue, id, chartConfig]),
    _transform = (0, _utils.crCssTranslate)(chartConfig.origin);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    subscribe((0, _ChartFn.crSubscribeId)(id), {
      listener
    });
    return () => {
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
const ChartDefaultConfig = {
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