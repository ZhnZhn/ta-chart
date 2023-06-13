"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _d3Array = require("../d3Array");
var _d3Selection = require("../d3Selection");
var _utils = require("../core/utils");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
class AxisZoomCapture extends _uiApi.Component {
  constructor() {
    super(...arguments);
    this.ref = (0, _uiApi.createRef)();
    this.clicked = false;
    this.dragHappened = false;
    this.state = {
      startPosition: null
    };
    this.handleDragEnd = e => {
      const container = (0, _uiApi.getRefValue)(this.ref);
      if (!container) {
        return;
      }
      if (!this.dragHappened) {
        if (this.clicked) {
          const mouseXY = (0, _d3Selection.pointer)(e, container),
            {
              onDoubleClick
            } = this.props;
          if (onDoubleClick !== undefined) {
            onDoubleClick(e, mouseXY);
          }
        } else {
          this.clicked = true;
          setTimeout(() => {
            this.clicked = false;
          }, 300);
        }
      }
      (0, _d3Selection.select)((0, _utils.d3Window)(container)).on(_utils.MOUSEMOVE, null).on(_utils.MOUSEUP, null).on(_utils.TOUCHMOVE, null).on(_utils.TOUCHEND, null);
      this.setState({
        startPosition: null
      });
    };
    this.handleDrag = e => {
      const container = (0, _uiApi.getRefValue)(this.ref);
      if (!container) {
        return;
      }
      this.dragHappened = true;
      const {
          getMouseDelta,
          inverted
        } = this.props,
        {
          startPosition
        } = this.state;
      if (startPosition !== null) {
        const {
            startScale,
            startXY
          } = startPosition,
          mouseXY = (0, _d3Selection.pointer)(e, container),
          diff = getMouseDelta(startXY, mouseXY),
          center = (0, _d3Array.mean)(startScale.range());
        if (center === undefined) {
          return;
        }
        const tempRange = startScale.range().map(d => inverted ? d - (0, _utils.sign)(d - center) * diff : d + (0, _utils.sign)(d - center) * diff),
          newDomain = tempRange.map(startScale.invert);
        if ((0, _utils.sign)((0, _utils.last)(startScale.range()) - (0, _utils.first)(startScale.range())) === (0, _utils.sign)((0, _utils.last)(tempRange) - (0, _utils.first)(tempRange))) {
          const {
            axisZoomCallback
          } = this.props;
          if (axisZoomCallback !== undefined) {
            axisZoomCallback(newDomain);
          }
        }
      }
    };
    this.handleDragStartTouch = event => {
      const container = (0, _uiApi.getRefValue)(this.ref);
      if (!container) {
        return;
      }
      this.dragHappened = false;
      const startScale = this.props.getScale();
      if (event.touches.length === 1 && startScale.invert !== undefined) {
        (0, _d3Selection.select)((0, _utils.d3Window)(container)).on(_utils.TOUCHMOVE, this.handleDrag).on(_utils.TOUCHEND, this.handleDragEnd);
        const startXY = (0, _utils.touchPosition)((0, _utils.getTouchProps)(event.touches[0]), event);
        this.setState({
          startPosition: {
            startScale,
            startXY
          }
        });
      }
    };
    this.handleDragStartMouse = event => {
      event.preventDefault();
      const container = (0, _uiApi.getRefValue)(this.ref);
      if (!container) {
        return;
      }
      this.dragHappened = false;
      const startScale = this.props.getScale();
      if (startScale.invert !== undefined) {
        (0, _d3Selection.select)((0, _utils.d3Window)(container)).on(_utils.MOUSEMOVE, this.handleDrag, false).on(_utils.MOUSEUP, this.handleDragEnd, false);
        const startXY = (0, _utils.mousePosition)(event);
        this.setState({
          startPosition: {
            startXY,
            startScale
          }
        });
      }
    };
    this.handleRightClick = event => {
      event.stopPropagation();
      event.preventDefault();
      const container = (0, _uiApi.getRefValue)(this.ref),
        {
          onContextMenu
        } = this.props;
      if (!container || !onContextMenu) {
        return;
      }
      const defaultRect = container.getBoundingClientRect(),
        mouseXY = (0, _utils.mousePosition)(event, defaultRect);
      (0, _d3Selection.select)((0, _utils.d3Window)(container)).on(_utils.MOUSEMOVE, null).on(_utils.MOUSEUP, null);
      this.setState({
        startPosition: null
      });
      onContextMenu(event, mouseXY);
    };
  }
  render() {
    const {
        bg,
        className,
        zoomCursorClassName
      } = this.props,
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
  }
}
AxisZoomCapture.defaultProps = {
  inverted: true,
  className: ''
};
var _default = AxisZoomCapture;
exports.default = _default;
//# sourceMappingURL=AxisZoomCapture.js.map