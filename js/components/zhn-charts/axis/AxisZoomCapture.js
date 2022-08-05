"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.AxisZoomCapture = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireDefault(require("react"));

var _d3Array = require("d3-array");

var _d3Selection = require("d3-selection");

var _utils = require("../core/utils");

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

var AxisZoomCapture = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(AxisZoomCapture, _React$Component);

  function AxisZoomCapture(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.ref = /*#__PURE__*/_react["default"].createRef();
    _this.clicked = false;
    _this.dragHappened = false;

    _this.handleDragEnd = function (e) {
      var container = _this.ref.current;

      if (container === null) {
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
      var container = _this.ref.current;

      if (container === null) {
        return;
      }

      _this.dragHappened = true;
      var _this$props = _this.props,
          getMouseDelta = _this$props.getMouseDelta,
          _this$props$inverted = _this$props.inverted,
          inverted = _this$props$inverted === void 0 ? true : _this$props$inverted,
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
      var container = _this.ref.current;

      if (container === null) {
        return;
      }

      _this.dragHappened = false;
      var _this$props2 = _this.props,
          getScale = _this$props2.getScale,
          getMoreProps = _this$props2.getMoreProps,
          allProps = getMoreProps(),
          startScale = getScale(allProps);

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
      var container = _this.ref.current;

      if (container === null) {
        return;
      }

      _this.dragHappened = false;
      var _this$props3 = _this.props,
          getScale = _this$props3.getScale,
          getMoreProps = _this$props3.getMoreProps,
          allProps = getMoreProps(),
          startScale = getScale(allProps);

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
      var container = _this.ref.current;

      if (container === null) {
        return;
      }

      var onContextMenu = _this.props.onContextMenu;

      if (onContextMenu === undefined) {
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

    _this.state = {
      startPosition: null
    };
    return _this;
  }

  var _proto = AxisZoomCapture.prototype;

  _proto.render = function render() {
    var _this$props4 = this.props,
        bg = _this$props4.bg,
        className = _this$props4.className,
        zoomCursorClassName = _this$props4.zoomCursorClassName,
        cursor = this.state.startPosition !== null ? zoomCursorClassName : _CL.CL_DEFAULT_CURSOR;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      className: _CL.CL_ENABLE_INTERACTION + " " + cursor + " " + className,
      ref: this.ref,
      x: bg.x,
      y: bg.y,
      opacity: 0,
      height: bg.h,
      width: bg.w,
      onContextMenu: this.handleRightClick,
      onMouseDown: this.handleDragStartMouse,
      onTouchStart: this.handleDragStartTouch
    });
  };

  return AxisZoomCapture;
}(_react["default"].Component);

exports.AxisZoomCapture = AxisZoomCapture;
//# sourceMappingURL=AxisZoomCapture.js.map