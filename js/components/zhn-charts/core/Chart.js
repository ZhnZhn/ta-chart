"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Scale = require("d3-scale");

var _utils = require("./utils");

var _utils2 = require("../utils");

var _jsxRuntime = require("react/jsx-runtime");

var _crSubscribeId = function _crSubscribeId(id) {
  return "chart_" + id;
},
    _findChartConfig = function _findChartConfig(context, chartId) {
  return context.chartConfig.find(function (_ref) {
    var id = _ref.id;
    return id === chartId;
  });
};

var Chart = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(Chart, _PureComponent);

  function Chart() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _this.listener = function (type, moreProps, _, e) {
      var _this$props = _this.props,
          id = _this$props.id,
          onContextMenu = _this$props.onContextMenu,
          onDoubleClick = _this$props.onDoubleClick;

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
    };

    return _this;
  }

  var _proto = Chart.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var id = this.props.id,
        subscribe = this.context.subscribe;
    subscribe(_crSubscribeId(id), {
      listener: this.listener
    });
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var id = this.props.id,
        unsubscribe = this.context.unsubscribe;
    unsubscribe(_crSubscribeId(id));
  };

  _proto.getChildContext = function getChildContext() {
    var id = this.props.id;
    return {
      chartId: id,
      chartConfig: _findChartConfig(this.context, id)
    };
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        id = _this$props2.id,
        children = _this$props2.children,
        _findChartConfig2 = _findChartConfig(this.context, id),
        origin = _findChartConfig2.origin,
        _transform = (0, _utils2.crCssTranslate)(origin);

    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      transform: _transform,
      children: children
    });
  };

  return Chart;
}(_utils.PureComponent);

Chart.defaultProps = {
  flipYScale: false,
  id: 0,
  origin: [0, 0],
  padding: 0,
  yPan: true,
  yPanEnabled: false,
  yScale: (0, _d3Scale.scaleLinear)()
};
Chart.contextTypes = {
  chartConfig: _propTypes["default"].array,
  subscribe: _propTypes["default"].func.isRequired,
  unsubscribe: _propTypes["default"].func.isRequired
};
Chart.childContextTypes = {
  chartConfig: _propTypes["default"].object.isRequired,
  chartId: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]).isRequired
};
var _default = Chart;
exports["default"] = _default;
//# sourceMappingURL=Chart.js.map