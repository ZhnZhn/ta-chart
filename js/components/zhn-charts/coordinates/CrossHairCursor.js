"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _GenericComponent = require("../core/GenericComponent");

var _contextFn = require("../core/contextFn");

var _utils = require("../utils");

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["strokeDasharray"];

function customX(props, moreProps) {
  var xScale = moreProps.xScale,
      xAccessor = moreProps.xAccessor,
      currentItem = moreProps.currentItem,
      mouseXY = moreProps.mouseXY,
      snapX = props.snapX;
  return snapX ? Math.round(xScale(xAccessor(currentItem))) : mouseXY[0];
}

function helper(props, moreProps) {
  var mouseXY = moreProps.mouseXY,
      currentItem = moreProps.currentItem,
      show = moreProps.show,
      height = moreProps.height,
      width = moreProps.width,
      customX = props.customX,
      stroke = props.stroke,
      opacity = props.opacity,
      strokeDasharray = props.strokeDasharray;

  if (!show || (0, _utils.isNotDefined)(currentItem)) {
    return null;
  }

  var line1 = {
    x1: 0,
    x2: width,
    y1: mouseXY[1],
    y2: mouseXY[1],
    stroke: stroke,
    strokeDasharray: strokeDasharray,
    opacity: opacity
  },
      x = customX(props, moreProps),
      line2 = {
    x1: x,
    x2: x,
    y1: 0,
    y2: height,
    stroke: stroke,
    strokeDasharray: strokeDasharray,
    opacity: opacity
  };
  return [line1, line2];
}

var CrossHairCursor = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(CrossHairCursor, _Component);

  function CrossHairCursor(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.renderSVG = _this.renderSVG.bind((0, _assertThisInitialized2["default"])(_this));
    _this.drawOnCanvas = _this.drawOnCanvas.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  var _proto = CrossHairCursor.prototype;

  _proto.drawOnCanvas = function drawOnCanvas(ctx, moreProps) {
    var lines = helper(this.props, moreProps);

    if ((0, _utils.isDefined)(lines)) {
      var _this$context = this.context,
          margin = _this$context.margin,
          ratio = _this$context.ratio,
          originX = 0.5 * ratio + margin.left,
          originY = 0.5 * ratio + margin.top;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(ratio, ratio);
      ctx.translate(originX, originY);
      lines.forEach(function (line) {
        var dashArray = (0, _utils.getStrokeDasharray)(line.strokeDasharray).split(",").map(function (d) {
          return +d;
        });
        ctx.strokeStyle = (0, _utils.hexToRGBA)(line.stroke, line.opacity);
        ctx.setLineDash(dashArray);
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });
      ctx.restore();
    }
  };

  _proto.renderSVG = function renderSVG(moreProps) {
    var className = this.props.className,
        lines = helper(this.props, moreProps);
    return (0, _utils.isNotDefined)(lines) ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      className: _CL.CL_CHARTS_CROSSHAIR + " " + className,
      children: lines.map(function (_ref, index) {
        var strokeDasharray = _ref.strokeDasharray,
            rest = (0, _objectWithoutPropertiesLoose2["default"])(_ref, _excluded);
        return /*#__PURE__*/(0, _jsxRuntime.jsx)("line", (0, _extends2["default"])({
          strokeDasharray: (0, _utils.getStrokeDasharray)(strokeDasharray)
        }, rest), index);
      })
    });
  };

  _proto.render = function render() {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GenericComponent.GenericComponent, {
      svgDraw: this.renderSVG,
      clip: false,
      canvasDraw: this.drawOnCanvas,
      canvasToDraw: _contextFn.getMouseCanvas,
      drawOn: ["mousemove", "pan", "drag"]
    });
  };

  return CrossHairCursor;
}(_react.Component);
/*
CrossHairCursor.propTypes = {
	className: PropTypes.string,
	strokeDasharray: PropTypes.oneOf(strokeDashTypes),
};
*/


CrossHairCursor.contextTypes = {
  margin: _propTypes["default"].object.isRequired,
  ratio: _propTypes["default"].number.isRequired // xScale for getting update event upon pan end, this is needed to get past the PureComponent shouldComponentUpdate
  // xScale: PropTypes.func.isRequired,

};
CrossHairCursor.defaultProps = {
  stroke: "#000000",
  opacity: 0.3,
  strokeDasharray: "ShortDash",
  snapX: true,
  customX: customX
};
var _default = CrossHairCursor;
exports["default"] = _default;
//# sourceMappingURL=CrossHairCursor.js.map