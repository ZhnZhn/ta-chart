"use strict";

exports.__esModule = true;
exports.findChartConfig = exports.crSubscribeId = void 0;
var crSubscribeId = function crSubscribeId(id) {
  return "chart_" + id;
};
exports.crSubscribeId = crSubscribeId;
var findChartConfig = function findChartConfig(chartConfig, chartId) {
  return (chartConfig || []).find(function (_ref) {
    var id = _ref.id;
    return id === chartId;
  });
};
exports.findChartConfig = findChartConfig;
//# sourceMappingURL=ChartFn.js.map