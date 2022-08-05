"use strict";

exports.__esModule = true;
exports.mouseBasedZoomAnchor = void 0;

var _ChartDataUtil = require("../utils/ChartDataUtil");

var mouseBasedZoomAnchor = function mouseBasedZoomAnchor(_ref) {
  var xScale = _ref.xScale,
      xAccessor = _ref.xAccessor,
      mouseXY = _ref.mouseXY,
      plotData = _ref.plotData;
  return xAccessor((0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData));
};

exports.mouseBasedZoomAnchor = mouseBasedZoomAnchor;
//# sourceMappingURL=zoomBehavior.js.map