"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.GenericChartComponent = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _GenericComponent2 = require("./GenericComponent");

var _utils = require("./utils");

var ALWAYS_TRUE_TYPES = ["drag", "dragend"];

var GenericChartComponent = /*#__PURE__*/function (_GenericComponent) {
  (0, _inheritsLoose2["default"])(GenericChartComponent, _GenericComponent);

  function GenericChartComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _GenericComponent.call.apply(_GenericComponent, [this].concat(args)) || this;

    _this.preCanvasDraw = function (ctx, moreProps) {
      _GenericComponent.prototype.preCanvasDraw.call((0, _assertThisInitialized2["default"])(_this), ctx, moreProps);

      ctx.save();
      var _this$context = _this.context,
          margin = _this$context.margin,
          ratio = _this$context.ratio,
          _moreProps$chartConfi = moreProps.chartConfig,
          width = _moreProps$chartConfi.width,
          height = _moreProps$chartConfi.height,
          origin = _moreProps$chartConfi.origin,
          canvasOriginX = 0.5 * ratio + origin[0] + margin.left,
          canvasOriginY = 0.5 * ratio + origin[1] + margin.top,
          _this$props = _this.props,
          clip = _this$props.clip,
          edgeClip = _this$props.edgeClip;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(ratio, ratio);

      if (edgeClip) {
        ctx.beginPath();
        ctx.rect(-1, canvasOriginY - 10, width + margin.left + margin.right + 1, height + 20);
        ctx.clip();
      }

      ctx.translate(canvasOriginX, canvasOriginY);

      if (clip) {
        ctx.beginPath();
        ctx.rect(-1, -1, width + 1, height + 1);
        ctx.clip();
      }
    };

    _this.postCanvasDraw = function (ctx, moreProps) {
      _GenericComponent.prototype.postCanvasDraw.call((0, _assertThisInitialized2["default"])(_this), ctx, moreProps);

      ctx.restore();
    };

    _this.updateMoreProps = function (moreProps) {
      _GenericComponent.prototype.updateMoreProps.call((0, _assertThisInitialized2["default"])(_this), moreProps);

      var chartConfigList = moreProps.chartConfig;

      if (chartConfigList && Array.isArray(chartConfigList)) {
        var chartId = _this.context.chartId,
            chartConfig = chartConfigList.find(function (each) {
          return each.id === chartId;
        });
        _this.moreProps.chartConfig = chartConfig;
      }

      if ((0, _utils.isDefined)(_this.moreProps.chartConfig)) {
        var _this$moreProps$chart = _this.moreProps.chartConfig.origin,
            ox = _this$moreProps$chart[0],
            oy = _this$moreProps$chart[1];

        if ((0, _utils.isDefined)(moreProps.mouseXY)) {
          var _moreProps$mouseXY = moreProps.mouseXY,
              x = _moreProps$mouseXY[0],
              y = _moreProps$mouseXY[1];
          _this.moreProps.mouseXY = [x - ox, y - oy];
        }

        if ((0, _utils.isDefined)(moreProps.startPos)) {
          var _moreProps$startPos = moreProps.startPos,
              _x = _moreProps$startPos[0],
              _y = _moreProps$startPos[1];
          _this.moreProps.startPos = [_x - ox, _y - oy];
        }
      }
    };

    _this.preEvaluate = function
      /* type, moreProps */
    () {///
    };

    _this.shouldTypeProceed = function (type, moreProps) {
      if ((type === "mousemove" || type === "click") && _this.props.disablePan) {
        return true;
      }

      if (ALWAYS_TRUE_TYPES.indexOf(type) === -1 && (0, _utils.isDefined)(moreProps) && (0, _utils.isDefined)(moreProps.currentCharts)) {
        return moreProps.currentCharts.indexOf(_this.context.chartId) > -1;
      }

      return true;
    };

    return _this;
  }

  return GenericChartComponent;
}(_GenericComponent2.GenericComponent);

exports.GenericChartComponent = GenericChartComponent;
GenericChartComponent.defaultProps = _GenericComponent2.GenericComponent.defaultProps;
GenericChartComponent.contextTypes = {
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  margin: _propTypes["default"].object.isRequired,
  chartId: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  getCanvasContexts: _propTypes["default"].func,
  xScale: _propTypes["default"].func.isRequired,
  xAccessor: _propTypes["default"].func.isRequired,
  displayXAccessor: _propTypes["default"].func.isRequired,
  plotData: _propTypes["default"].array.isRequired,
  fullData: _propTypes["default"].array.isRequired,
  chartConfig: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,
  morePropsDecorator: _propTypes["default"].func,
  generateSubscriptionId: _propTypes["default"].func,
  getMutableState: _propTypes["default"].func.isRequired,
  amIOnTop: _propTypes["default"].func.isRequired,
  subscribe: _propTypes["default"].func.isRequired,
  unsubscribe: _propTypes["default"].func.isRequired,
  setCursorClass: _propTypes["default"].func.isRequired,
  canvasOriginX: _propTypes["default"].number,
  canvasOriginY: _propTypes["default"].number,
  ratio: _propTypes["default"].number.isRequired
};
//# sourceMappingURL=GenericChartComponent.js.map