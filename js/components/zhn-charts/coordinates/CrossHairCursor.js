"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _GenericComponent = _interopRequireDefault(require("../core/GenericComponent"));

var _jsxRuntime = require("react/jsx-runtime");

var getStrokeDasharray = function getStrokeDasharray(type) {
  switch (type) {
    default:
    case "Solid":
      return "none";

    case "ShortDash":
      return "6, 2";

    case "ShortDash2":
      return "6, 3";

    case "ShortDot":
      return "2, 2";

    case "ShortDashDot":
      return "6, 2, 2, 2";

    case "ShortDashDotDot":
      return "6, 2, 2, 2, 2, 2";

    case "Dot":
      return "2, 6";

    case "Dash":
      return "4, 6";

    case "LongDash":
      return "16, 6";

    case "DashDot":
      return "8, 6, 2, 6";

    case "LongDashDot":
      return "16, 6, 2, 6";

    case "LongDashDotDot":
      return "16, 6, 2, 6, 2, 6";
  }
};

var getStrokeDasharrayCanvas = function getStrokeDasharrayCanvas(type) {
  var a = getStrokeDasharray(type).split(",");

  if (a.length === 1) {
    return [];
  }

  return a.map(function (d) {
    return Number(d);
  });
};

var getMouseCanvas = function getMouseCanvas(contexts) {
  return contexts.mouseCoord;
};

var defaultCustomX = function defaultCustomX(props, moreProps) {
  var xScale = moreProps.xScale,
      xAccessor = moreProps.xAccessor,
      currentItem = moreProps.currentItem,
      mouseXY = moreProps.mouseXY;
  var snapX = props.snapX;
  var x = snapX ? Math.round(xScale(xAccessor(currentItem))) : mouseXY[0] + 0.5;
  return x;
};
/*
export interface CrossHairCursorProps {
    readonly customX?: (props: CrossHairCursorProps, moreProps: any) => number;
    readonly snapX?: boolean;
    readonly strokeStyle?: string;
    readonly strokeDasharray?: strokeDashTypes;
    readonly strokeWidth?: number;
}
*/


var CrossHairCursor = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(CrossHairCursor, _React$Component);

  function CrossHairCursor() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.drawOnCanvas = function (ctx, moreProps) {
      var lines = _this.getLines(_this.props, moreProps);

      if (lines === undefined) {
        return;
      }

      var _this$context = _this.context,
          margin = _this$context.margin,
          ratio = _this$context.ratio;
      var originX = 0.5 * ratio + margin.left;
      var originY = 0.5 * ratio + margin.top;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(ratio, ratio);
      ctx.translate(originX, originY);
      lines.forEach(function (line) {
        var dashArray = getStrokeDasharrayCanvas(line.strokeDasharray);
        ctx.strokeStyle = line.strokeStyle;
        ctx.lineWidth = line.strokeWidth;
        ctx.setLineDash(dashArray);
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });
      ctx.restore();
    };

    _this.getLines = function (props, moreProps) {
      var mouseXY = moreProps.mouseXY,
          currentItem = moreProps.currentItem,
          show = moreProps.show,
          height = moreProps.height,
          width = moreProps.width;
      var _props$customX = props.customX,
          customX = _props$customX === void 0 ? CrossHairCursor.defaultProps.customX : _props$customX,
          _props$strokeStyle = props.strokeStyle,
          strokeStyle = _props$strokeStyle === void 0 ? CrossHairCursor.defaultProps.strokeStyle : _props$strokeStyle,
          strokeDasharray = props.strokeDasharray,
          _props$strokeWidth = props.strokeWidth,
          strokeWidth = _props$strokeWidth === void 0 ? CrossHairCursor.defaultProps.strokeWidth : _props$strokeWidth;

      if (!show || currentItem === undefined) {
        return undefined;
      }

      var line1 = {
        x1: 0,
        x2: width,
        y1: mouseXY[1] + 0.5,
        y2: mouseXY[1] + 0.5,
        strokeStyle: strokeStyle,
        strokeDasharray: strokeDasharray,
        strokeWidth: strokeWidth
      };
      var x = customX(props, moreProps);
      var line2 = {
        x1: x,
        x2: x,
        y1: 0,
        y2: height,
        strokeStyle: strokeStyle,
        strokeDasharray: strokeDasharray,
        strokeWidth: strokeWidth
      };
      return [line1, line2];
    };

    return _this;
  }

  var _proto = CrossHairCursor.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericComponent["default"], {
      clip: false,
      canvasDraw: this.drawOnCanvas,
      canvasToDraw: getMouseCanvas,
      drawOn: ["mousemove", "pan", "drag"]
    });
  };

  return CrossHairCursor;
}(_react["default"].Component);

CrossHairCursor.defaultProps = {
  customX: defaultCustomX,
  snapX: true,
  strokeStyle: "rgba(55, 71, 79, 0.8)",
  strokeDasharray: "Dash",
  strokeWidth: 1
};
CrossHairCursor.contextTypes = {
  margin: _propTypes["default"].object.isRequired,
  ratio: _propTypes["default"].number.isRequired
};
var _default = CrossHairCursor;
exports["default"] = _default;
//# sourceMappingURL=CrossHairCursor.js.map