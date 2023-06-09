"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports["default"] = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _uiApi = require("../../uiApi");
var _d3Array = require("../d3Array");
var _d3Selection = require("d3-selection");
var _utils = require("../core/utils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
var AxisZoomCapture = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(AxisZoomCapture, _Component);
  function AxisZoomCapture() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.ref = (0, _uiApi.createRef)();
    _this.clicked = false;
    _this.dragHappened = false;
    _this.state = {
      startPosition: null
    };
    _this.handleDragEnd = function (e) {
      var container = (0, _uiApi.getRefValue)(_this.ref);
      if (!container) {
        return;
      }
      if (!_this.dragHappened) {
        if (_this.clicked) {
          var mouseXY = (0, _d3Selection.pointer)(e, container),
            onDoubleClick = _this.props.onDoubleClick;
          if (onDoubleClick !== undefined) {
            onDoubleClick(e, mouseXY);
          }
        } else {
          _this.clicked = true;
          setTimeout(function () {
            _this.clicked = false;
          }, 300);
        }
      }
      (0, _d3Selection.select)((0, _utils.d3Window)(container)).on(_utils.MOUSEMOVE, null).on(_utils.MOUSEUP, null).on(_utils.TOUCHMOVE, null).on(_utils.TOUCHEND, null);
      _this.setState({
        startPosition: null
      });
    };
    _this.handleDrag = function (e) {
      var container = (0, _uiApi.getRefValue)(_this.ref);
      if (!container) {
        return;
      }
      _this.dragHappened = true;
      var _this$props = _this.props,
        getMouseDelta = _this$props.getMouseDelta,
        inverted = _this$props.inverted,
        startPosition = _this.state.startPosition;
      if (startPosition !== null) {
        var startScale = startPosition.startScale,
          startXY = startPosition.startXY,
          mouseXY = (0, _d3Selection.pointer)(e, container),
          diff = getMouseDelta(startXY, mouseXY),
          center = (0, _d3Array.mean)(startScale.range());
        if (center === undefined) {
          return;
        }
        var tempRange = startScale.range().map(function (d) {
            return inverted ? d - (0, _utils.sign)(d - center) * diff : d + (0, _utils.sign)(d - center) * diff;
          }),
          newDomain = tempRange.map(startScale.invert);
        if ((0, _utils.sign)((0, _utils.last)(startScale.range()) - (0, _utils.first)(startScale.range())) === (0, _utils.sign)((0, _utils.last)(tempRange) - (0, _utils.first)(tempRange))) {
          var axisZoomCallback = _this.props.axisZoomCallback;
          if (axisZoomCallback !== undefined) {
            axisZoomCallback(newDomain);
          }
        }
      }
    };
    _this.handleDragStartTouch = function (event) {
      var container = (0, _uiApi.getRefValue)(_this.ref);
      if (!container) {
        return;
      }
      _this.dragHappened = false;
      var startScale = _this.props.getScale();
      if (event.touches.length === 1 && startScale.invert !== undefined) {
        (0, _d3Selection.select)((0, _utils.d3Window)(container)).on(_utils.TOUCHMOVE, _this.handleDrag).on(_utils.TOUCHEND, _this.handleDragEnd);
        var startXY = (0, _utils.touchPosition)((0, _utils.getTouchProps)(event.touches[0]), event);
        _this.setState({
          startPosition: {
            startScale: startScale,
            startXY: startXY
          }
        });
      }
    };
    _this.handleDragStartMouse = function (event) {
      event.preventDefault();
      var container = (0, _uiApi.getRefValue)(_this.ref);
      if (!container) {
        return;
      }
      _this.dragHappened = false;
      var startScale = _this.props.getScale();
      if (startScale.invert !== undefined) {
        (0, _d3Selection.select)((0, _utils.d3Window)(container)).on(_utils.MOUSEMOVE, _this.handleDrag, false).on(_utils.MOUSEUP, _this.handleDragEnd, false);
        var startXY = (0, _utils.mousePosition)(event);
        _this.setState({
          startPosition: {
            startXY: startXY,
            startScale: startScale
          }
        });
      }
    };
    _this.handleRightClick = function (event) {
      event.stopPropagation();
      event.preventDefault();
      var container = (0, _uiApi.getRefValue)(_this.ref),
        onContextMenu = _this.props.onContextMenu;
      if (!container || !onContextMenu) {
        return;
      }
      var defaultRect = container.getBoundingClientRect(),
        mouseXY = (0, _utils.mousePosition)(event, defaultRect);
      (0, _d3Selection.select)((0, _utils.d3Window)(container)).on(_utils.MOUSEMOVE, null).on(_utils.MOUSEUP, null);
      _this.setState({
        startPosition: null
      });
      onContextMenu(event, mouseXY);
    };
    return _this;
  }
  var _proto = AxisZoomCapture.prototype;
  _proto.render = function render() {
    var _this$props2 = this.props,
      bg = _this$props2.bg,
      className = _this$props2.className,
      zoomCursorClassName = _this$props2.zoomCursorClassName,
      cursorCn = this.state.startPosition === null ? _CL.CL_DEFAULT_CURSOR : zoomCursorClassName || '';
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      ref: this.ref,
      className: _CL.CL_ENABLE_INTERACTION + " " + cursorCn + " " + className,
      x: bg.x,
      y: bg.y,
      height: bg.h,
      width: bg.w,
      opacity: 0,
      onContextMenu: this.handleRightClick,
      onMouseDown: this.handleDragStartMouse,
      onTouchStart: this.handleDragStartTouch
    });
  };
  return AxisZoomCapture;
}(_uiApi.Component);
AxisZoomCapture.defaultProps = {
  inverted: true,
  className: ''
};
var _default = AxisZoomCapture;
exports["default"] = _default;
//# sourceMappingURL=AxisZoomCapture.js.map