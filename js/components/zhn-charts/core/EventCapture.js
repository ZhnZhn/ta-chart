"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.EventCapture = void 0;
var _react = _interopRequireDefault(require("react"));
var _d3Selection = require("../d3Selection");
var _utils = require("./utils");
var _ChartDataUtil = require("./utils/ChartDataUtil");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
const _addMouseMoveHandleIfPanOrDragNotInProgress = function (state, ref, handleMouseMove) {
  if (handleMouseMove === void 0) {
    handleMouseMove = null;
  }
  if (!state.panInProgress && !state.dragInProgress) {
    (0, _d3Selection.select)((0, _utils.d3Window)(ref.current)).on(_utils.MOUSEMOVE, handleMouseMove);
  }
};
class EventCapture extends _react.default.Component {
  constructor(props) {
    super(props);
    this.clicked = void 0;
    this.dx = 0;
    this.dy = 0;
    this.dragHappened = void 0;
    this.focus = void 0;
    this.lastNewPos = void 0;
    this.mouseInside = false;
    this.mouseInteraction = true;
    this.panEndTimeout = void 0;
    this.panHappened = void 0;
    this.ref = /*#__PURE__*/_react.default.createRef();
    this.handleEnter = e => {
      const {
        onMouseEnter
      } = this.props;
      if (onMouseEnter === undefined) {
        return;
      }
      this.mouseInside = true;
      _addMouseMoveHandleIfPanOrDragNotInProgress(this.state, this.ref, this.handleMouseMove);
      onMouseEnter(e);
    };
    this.handleLeave = e => {
      const {
        onMouseLeave
      } = this.props;
      if (onMouseLeave === undefined) {
        return;
      }
      this.mouseInside = false;
      _addMouseMoveHandleIfPanOrDragNotInProgress(this.state, this.ref);
      onMouseLeave(e);
    };
    this.handleWheel = e => {
      const {
        pan,
        onPan,
        zoom,
        onZoom
      } = this.props;
      if (!pan && !zoom) {
        return;
      }
      const {
          panInProgress
        } = this.state,
        yZoom = Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 0,
        mouseXY = (0, _utils.mousePosition)(e);
      e.preventDefault();
      if (zoom && this.focus && yZoom && !panInProgress) {
        const zoomDir = e.deltaY > 0 ? 1 : -1;
        if (onZoom !== undefined) {
          onZoom(zoomDir, mouseXY, e);
        }
      } else if (this.focus) {
        if (this.shouldPan() && this.state.panStart !== undefined) {
          // pan already in progress
          const {
            panStartXScale,
            chartsToPan
          } = this.state.panStart;
          this.lastNewPos = mouseXY;
          this.panHappened = true;
          if (this.dx === undefined) {
            this.dx = 0;
          }
          if (this.dy === undefined) {
            this.dy = 0;
          }
          this.dx -= e.deltaX;
          this.dy += e.deltaY;
          const dxdy = {
            dx: this.dx,
            dy: this.dy
          };
          if (onPan !== undefined) {
            onPan(mouseXY, panStartXScale, dxdy, chartsToPan, e);
          }
        } else {
          const {
              xScale,
              chartConfig
            } = this.props,
            currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfig, mouseXY);
          this.dx = 0;
          this.dy = 0;
          this.setState({
            panInProgress: true,
            panStart: {
              panStartXScale: xScale,
              panOrigin: mouseXY,
              chartsToPan: currentCharts
            }
          });
        }
        this.queuePanEnd(e);
      }
    };
    this.handleMouseMove = e => {
      const {
        onMouseMove,
        mouseMove
      } = this.props;
      if (onMouseMove === undefined) {
        return;
      }
      if (this.mouseInteraction && mouseMove && !this.state.panInProgress) {
        const newPos = (0, _d3Selection.pointer)(e, this.ref.current);
        onMouseMove(newPos, "mouse", e);
      }
    };
    this.handleClick = e => {
      const mouseXY = (0, _utils.mousePosition)(e);
      const {
        onClick,
        onDoubleClick
      } = this.props;
      if (!this.panHappened && !this.dragHappened) {
        if (this.clicked && onDoubleClick !== undefined) {
          onDoubleClick(mouseXY, e);
          this.clicked = false;
        } else if (onClick !== undefined) {
          onClick(mouseXY, e);
          this.clicked = true;
          setTimeout(() => {
            if (this.clicked) {
              this.clicked = false;
            }
          }, 400);
        }
      }
    };
    this.handleRightClick = e => {
      e.stopPropagation();
      e.preventDefault();
      const {
        onContextMenu,
        onPanEnd
      } = this.props;
      const mouseXY = (0, _utils.mousePosition)(e, this.ref.current.getBoundingClientRect());
      if (this.state.panStart !== undefined) {
        const {
          panStartXScale,
          panOrigin: [dx, dy],
          chartsToPan
        } = this.state.panStart;
        if (this.panHappened && onPanEnd !== undefined) {
          onPanEnd(mouseXY, panStartXScale, {
            dx,
            dy
          }, chartsToPan, e);
        }
        const win = (0, _utils.d3Window)(this.ref.current);
        (0, _d3Selection.select)(win).on(_utils.MOUSEMOVE, null).on(_utils.MOUSEUP, null);
        this.setState({
          panInProgress: false,
          panStart: undefined
        });
      }
      if (onContextMenu !== undefined) {
        onContextMenu(mouseXY, e);
      }
    };
    this.handleDrag = e => {
      const {
        onDrag
      } = this.props;
      if (onDrag === undefined) {
        return;
      }
      this.dragHappened = true;
      const {
        dragStartPosition
      } = this.state;
      if (dragStartPosition === undefined) {
        return;
      }
      const mouseXY = (0, _d3Selection.pointer)(e, this.ref.current);
      onDrag({
        startPos: dragStartPosition,
        mouseXY
      }, e);
    };
    this.handleDragEnd = e => {
      const mouseXY = (0, _d3Selection.pointer)(e, this.ref.current);
      (0, _d3Selection.select)((0, _utils.d3Window)(this.ref.current)).on(_utils.MOUSEMOVE, this.mouseInside ? this.handleMouseMove : null).on(_utils.MOUSEUP, null);
      if (this.dragHappened) {
        const {
          onDragComplete
        } = this.props;
        if (onDragComplete !== undefined) {
          onDragComplete({
            mouseXY
          }, e);
        }
      }
      this.mouseInteraction = true;
      this.setState({
        dragInProgress: false
      });
    };
    this.canPan = () => {
      const {
        getAllPanConditions
      } = this.props;
      const {
        pan: initialPanEnabled
      } = this.props;
      const {
        panEnabled,
        draggable: somethingSelected
      } = getAllPanConditions().reduce((returnObj, a) => {
        return {
          draggable: returnObj.draggable || a.draggable,
          panEnabled: returnObj.panEnabled && a.panEnabled
        };
      }, {
        draggable: false,
        panEnabled: initialPanEnabled
      });
      return {
        panEnabled,
        somethingSelected
      };
    };
    this.handleMouseDown = e => {
      if (e.button !== 0) {
        return;
      }
      const {
        xScale,
        chartConfig,
        onMouseDown
      } = this.props;
      this.panHappened = false;
      this.dragHappened = false;
      this.focus = true;
      if (!this.state.panInProgress && this.mouseInteraction) {
        const mouseXY = (0, _utils.mousePosition)(e),
          currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfig, mouseXY),
          {
            panEnabled,
            somethingSelected
          } = this.canPan(),
          pan = panEnabled && !somethingSelected;
        if (pan) {
          this.setState({
            panInProgress: pan,
            panStart: {
              panStartXScale: xScale,
              panOrigin: mouseXY,
              chartsToPan: currentCharts
            }
          });
          (0, _d3Selection.select)((0, _utils.d3Window)(this.ref.current)).on(_utils.MOUSEMOVE, this.handlePan).on(_utils.MOUSEUP, this.handlePanEnd);
        } else if (somethingSelected) {
          this.setState({
            panInProgress: false,
            dragInProgress: true,
            panStart: undefined,
            dragStartPosition: mouseXY
          });
          const {
            onDragStart
          } = this.props;
          if (onDragStart !== undefined) {
            onDragStart({
              startPos: mouseXY
            }, e);
          }
          (0, _d3Selection.select)((0, _utils.d3Window)(this.ref.current)).on(_utils.MOUSEMOVE, this.handleDrag).on(_utils.MOUSEUP, this.handleDragEnd);
        }
        if (onMouseDown !== undefined) {
          onMouseDown(mouseXY, currentCharts, e);
        }
      }
      e.preventDefault();
    };
    this.shouldPan = () => {
      const {
        pan: panEnabled,
        onPan
      } = this.props;
      return panEnabled && onPan && this.state.panStart !== undefined;
    };
    this.handlePan = e => {
      if (this.shouldPan() && this.state.panStart !== undefined) {
        this.panHappened = true;
        const {
          panStartXScale,
          panOrigin,
          chartsToPan
        } = this.state.panStart;
        let dx;
        let dy;
        let mouseXY;
        if (this.mouseInteraction) {
          mouseXY = (0, _d3Selection.pointer)(e, this.ref.current);
          this.lastNewPos = mouseXY;
          dx = mouseXY[0] - panOrigin[0];
          dy = mouseXY[1] - panOrigin[1];
        } else {
          mouseXY = (0, _d3Selection.pointers)(e, this.ref.current)[0];
          this.lastNewPos = mouseXY;
          dx = panOrigin[0] - mouseXY[0];
          dy = panOrigin[1] - mouseXY[1];
        }
        this.dx = dx;
        this.dy = dy;
        const {
          onPan
        } = this.props;
        if (onPan !== undefined) {
          onPan(mouseXY, panStartXScale, {
            dx,
            dy
          }, chartsToPan, e);
        }
      }
    };
    this.handlePanEnd = e => {
      const {
        pan: panEnabled,
        onPanEnd
      } = this.props;
      if (this.state.panStart !== undefined) {
        const {
          panStartXScale,
          chartsToPan
        } = this.state.panStart;
        (0, _d3Selection.select)((0, _utils.d3Window)(this.ref.current)).on(_utils.MOUSEMOVE, this.mouseInside ? this.handleMouseMove : null).on(_utils.MOUSEUP, null).on(_utils.TOUCHMOVE, null).on(_utils.TOUCHEND, null);
        if (this.panHappened && panEnabled && onPanEnd) {
          const {
            dx = 0,
            dy = 0
          } = this;
          delete this.dx;
          delete this.dy;
          if (this.lastNewPos !== undefined) {
            onPanEnd(this.lastNewPos, panStartXScale, {
              dx,
              dy
            }, chartsToPan, e);
          }
        }
        this.setState({
          panInProgress: false,
          panStart: undefined
        });
      }
    };
    this.handleTouchMove = e => {
      const {
        onMouseMove
      } = this.props;
      if (onMouseMove === undefined) {
        return;
      }
      const touch = (0, _utils.getTouchProps)(e.touches[0]);
      const touchXY = (0, _utils.touchPosition)(touch, e);
      onMouseMove(touchXY, "touch", e);
    };
    this.handleTouchStart = e => {
      this.mouseInteraction = false;
      const {
        pan: panEnabled,
        chartConfig,
        onMouseMove,
        xScale,
        onPanEnd
      } = this.props;
      if (e.touches.length === 1) {
        this.panHappened = false;
        const touchXY = (0, _utils.touchPosition)((0, _utils.getTouchProps)(e.touches[0]), e);
        if (onMouseMove !== undefined) {
          onMouseMove(touchXY, "touch", e);
        }
        if (panEnabled) {
          const currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfig, touchXY);
          this.setState({
            panInProgress: true,
            panStart: {
              panStartXScale: xScale,
              panOrigin: touchXY,
              chartsToPan: currentCharts
            }
          });
          (0, _d3Selection.select)((0, _utils.d3Window)(this.ref.current)).on(_utils.TOUCHMOVE, this.handlePan, false).on(_utils.TOUCHEND, this.handlePanEnd, false);
        }
      } else if (e.touches.length === 2) {
        // pinch zoom begin
        // do nothing pinch zoom is handled in handleTouchMove
        const {
          panInProgress,
          panStart
        } = this.state;
        if (panInProgress && panEnabled && onPanEnd && panStart !== undefined) {
          const {
            panStartXScale,
            panOrigin: [dx, dy],
            chartsToPan
          } = panStart;
          (0, _d3Selection.select)((0, _utils.d3Window)(this.ref.current)).on(_utils.MOUSEMOVE, this.mouseInside ? this.handleMouseMove : null).on(_utils.MOUSEUP, null).on(_utils.TOUCHMOVE, this.handlePinchZoom, false).on(_utils.TOUCHEND, this.handlePinchZoomEnd, false);
          const touch1Pos = (0, _utils.touchPosition)((0, _utils.getTouchProps)(e.touches[0]), e);
          const touch2Pos = (0, _utils.touchPosition)((0, _utils.getTouchProps)(e.touches[1]), e);
          if (this.panHappened && panEnabled && onPanEnd && this.lastNewPos !== undefined) {
            onPanEnd(this.lastNewPos, panStartXScale, {
              dx,
              dy
            }, chartsToPan, e);
          }
          this.setState({
            panInProgress: false,
            pinchZoomStart: {
              xScale,
              touch1Pos,
              touch2Pos,
              range: xScale.range(),
              chartsToPan
            }
          });
        }
      }
    };
    this.handlePinchZoom = e => {
      const {
        pinchZoomStart
      } = this.state;
      if (pinchZoomStart === undefined) {
        return;
      }
      const {
        xScale,
        zoom: zoomEnabled,
        onPinchZoom
      } = this.props;
      if (!zoomEnabled || onPinchZoom === undefined) {
        return;
      }
      const [touch1Pos, touch2Pos] = (0, _d3Selection.pointers)(this.ref.current);
      /*eslint-disable no-unused-vars*/
      const {
        chartsToPan,
        ...initialPinch
      } = pinchZoomStart;
      /*eslint-enable no-unused-vars*/
      onPinchZoom(initialPinch, {
        touch1Pos,
        touch2Pos,
        xScale
      }, e);
    };
    this.handlePinchZoomEnd = e => {
      (0, _d3Selection.select)((0, _utils.d3Window)(this.ref.current)).on(_utils.TOUCHMOVE, null).on(_utils.TOUCHEND, null);
      const {
        pinchZoomStart
      } = this.state;
      if (pinchZoomStart === undefined) {
        return;
      }
      /*eslint-disable no-unused-vars*/
      const {
          chartsToPan,
          ...initialPinch
        } = pinchZoomStart
        /*eslint-enable no-unused-vars*/,
        {
          zoom: zoomEnabled,
          onPinchZoomEnd
        } = this.props;
      if (zoomEnabled && onPinchZoomEnd) {
        onPinchZoomEnd(initialPinch, e);
      }
      this.setState({
        pinchZoomStart: undefined
      });
    };
    this.setCursorClass = cursorOverrideClass => {
      if (cursorOverrideClass !== this.state.cursorOverrideClass) {
        this.setState({
          cursorOverrideClass
        });
      }
    };
    this.focus = props.focus;
    this.state = {
      panInProgress: false
    };
  }
  componentDidMount() {
    const {
        disableInteraction
      } = this.props,
      {
        current
      } = this.ref;
    if (current === null) {
      return;
    }
    if (!disableInteraction) {
      (0, _d3Selection.select)(current).on(_utils.MOUSEENTER, this.handleEnter).on(_utils.MOUSELEAVE, this.handleLeave).on(_utils.WHEEL, this.handleWheel, {
        passive: false
      });
    }
  }
  componentDidUpdate() {
    this.componentDidMount();
  }
  componentWillUnmount() {
    const {
      disableInteraction
    } = this.props;
    const {
      current
    } = this.ref;
    if (current === null) {
      return;
    }
    if (!disableInteraction) {
      (0, _d3Selection.select)(current).on(_utils.MOUSEENTER, null).on(_utils.MOUSELEAVE, null).on(_utils.WHEEL, null, {
        passive: false
      });
      (0, _d3Selection.select)((0, _utils.d3Window)(current)).on(_utils.MOUSEMOVE, null);
    }
  }
  queuePanEnd(e) {
    if (this.panEndTimeout !== undefined) {
      window.clearTimeout(this.panEndTimeout);
    }
    this.panEndTimeout = window.setTimeout(() => {
      this.handlePanEnd(e);
    }, 100);
  }
  cancelDrag() {
    (0, _d3Selection.select)((0, _utils.d3Window)(this.ref.current)).on(_utils.MOUSEMOVE, this.mouseInside ? this.handleMouseMove : null).on(_utils.MOUSEUP, null);
    this.mouseInteraction = true;
    this.setState({
      dragInProgress: false
    });
  }
  render() {
    const {
        height,
        width,
        disableInteraction,
        useCrossHairStyleCursor
      } = this.props,
      {
        cursorOverrideClass,
        panInProgress
      } = this.state,
      className = disableInteraction ? void 0 : cursorOverrideClass !== undefined ? cursorOverrideClass : !useCrossHairStyleCursor ? void 0 : panInProgress ? _CL.CL_GRABBING_CURSOR : _CL.CL_CROSSHAIR_CURSOR,
      interactionProps = disableInteraction || {
        onMouseDown: this.handleMouseDown,
        onClick: this.handleClick,
        onContextMenu: this.handleRightClick,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove
      };
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", {
      ref: this.ref,
      className: className,
      width: width,
      height: height,
      style: {
        opacity: 0
      },
      ...interactionProps
    });
  }
}
exports.EventCapture = EventCapture;
EventCapture.defaultProps = {
  mouseMove: false,
  zoom: false,
  pan: false,
  panSpeedMultiplier: 1,
  focus: false,
  disableInteraction: false
};
//# sourceMappingURL=EventCapture.js.map