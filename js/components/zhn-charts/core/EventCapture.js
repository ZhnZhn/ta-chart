"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.EventCapture = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _d3Selection = require("d3-selection");

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

var _ChartDataUtil = require("./utils/ChartDataUtil");

var _CL = require("../CL");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["chartsToPan"],
    _excluded2 = ["chartsToPan"];

var _addMouseMoveHandleIfPanOrDragNotInProgress = function _addMouseMoveHandleIfPanOrDragNotInProgress(state, ref, handleMouseMove) {
  if (handleMouseMove === void 0) {
    handleMouseMove = null;
  }

  if (!state.panInProgress && !state.dragInProgress) {
    var win = (0, _utils.d3Window)(ref.current);
    (0, _d3Selection.select)(win).on(_utils.MOUSEMOVE, handleMouseMove);
  }
};

var EventCapture = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(EventCapture, _React$Component);

  function EventCapture(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.clicked = void 0;
    _this.dx = 0;
    _this.dy = 0;
    _this.dragHappened = void 0;
    _this.focus = void 0;
    _this.lastNewPos = void 0;
    _this.mouseInside = false;
    _this.mouseInteraction = true;
    _this.panEndTimeout = void 0;
    _this.panHappened = void 0;
    _this.ref = /*#__PURE__*/_react["default"].createRef();

    _this.handleEnter = function (e) {
      var onMouseEnter = _this.props.onMouseEnter;

      if (onMouseEnter === undefined) {
        return;
      }

      _this.mouseInside = true;

      _addMouseMoveHandleIfPanOrDragNotInProgress(_this.state, _this.ref, _this.handleMouseMove);

      onMouseEnter(e);
    };

    _this.handleLeave = function (e) {
      var onMouseLeave = _this.props.onMouseLeave;

      if (onMouseLeave === undefined) {
        return;
      }

      _this.mouseInside = false;

      _addMouseMoveHandleIfPanOrDragNotInProgress(_this.state, _this.ref);

      onMouseLeave(e);
    };

    _this.handleWheel = function (e) {
      var _this$props = _this.props,
          pan = _this$props.pan,
          onPan = _this$props.onPan,
          zoom = _this$props.zoom,
          onZoom = _this$props.onZoom;

      if (!pan && !zoom) {
        return;
      }

      var panInProgress = _this.state.panInProgress,
          yZoom = Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 0,
          mouseXY = (0, _utils.mousePosition)(e);
      e.preventDefault();

      if (zoom && _this.focus && yZoom && !panInProgress) {
        var zoomDir = e.deltaY > 0 ? 1 : -1;

        if (onZoom !== undefined) {
          onZoom(zoomDir, mouseXY, e);
        }
      } else if (_this.focus) {
        if (_this.shouldPan() && _this.state.panStart !== undefined) {
          // pan already in progress
          var _this$state$panStart = _this.state.panStart,
              panStartXScale = _this$state$panStart.panStartXScale,
              chartsToPan = _this$state$panStart.chartsToPan;
          _this.lastNewPos = mouseXY;
          _this.panHappened = true;

          if (_this.dx === undefined) {
            _this.dx = 0;
          }

          if (_this.dy === undefined) {
            _this.dy = 0;
          }

          _this.dx -= e.deltaX;
          _this.dy += e.deltaY;
          var dxdy = {
            dx: _this.dx,
            dy: _this.dy
          };

          if (onPan !== undefined) {
            onPan(mouseXY, panStartXScale, dxdy, chartsToPan, e);
          }
        } else {
          var _this$props2 = _this.props,
              xScale = _this$props2.xScale,
              chartConfig = _this$props2.chartConfig,
              currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfig, mouseXY);
          _this.dx = 0;
          _this.dy = 0;

          _this.setState({
            panInProgress: true,
            panStart: {
              panStartXScale: xScale,
              panOrigin: mouseXY,
              chartsToPan: currentCharts
            }
          });
        }

        _this.queuePanEnd(e);
      }
    };

    _this.handleMouseMove = function (e) {
      var _this$props3 = _this.props,
          onMouseMove = _this$props3.onMouseMove,
          mouseMove = _this$props3.mouseMove;

      if (onMouseMove === undefined) {
        return;
      }

      if (_this.mouseInteraction && mouseMove && !_this.state.panInProgress) {
        var newPos = (0, _d3Selection.pointer)(e, _this.ref.current);
        onMouseMove(newPos, "mouse", e);
      }
    };

    _this.handleClick = function (e) {
      var mouseXY = (0, _utils.mousePosition)(e);
      var _this$props4 = _this.props,
          onClick = _this$props4.onClick,
          onDoubleClick = _this$props4.onDoubleClick;

      if (!_this.panHappened && !_this.dragHappened) {
        if (_this.clicked && onDoubleClick !== undefined) {
          onDoubleClick(mouseXY, e);
          _this.clicked = false;
        } else if (onClick !== undefined) {
          onClick(mouseXY, e);
          _this.clicked = true;
          setTimeout(function () {
            if (_this.clicked) {
              _this.clicked = false;
            }
          }, 400);
        }
      }
    };

    _this.handleRightClick = function (e) {
      e.stopPropagation();
      e.preventDefault();
      var _this$props5 = _this.props,
          onContextMenu = _this$props5.onContextMenu,
          onPanEnd = _this$props5.onPanEnd;
      var mouseXY = (0, _utils.mousePosition)(e, _this.ref.current.getBoundingClientRect());

      if (_this.state.panStart !== undefined) {
        var _this$state$panStart2 = _this.state.panStart,
            panStartXScale = _this$state$panStart2.panStartXScale,
            _this$state$panStart3 = _this$state$panStart2.panOrigin,
            dx = _this$state$panStart3[0],
            dy = _this$state$panStart3[1],
            chartsToPan = _this$state$panStart2.chartsToPan;

        if (_this.panHappened && onPanEnd !== undefined) {
          onPanEnd(mouseXY, panStartXScale, {
            dx: dx,
            dy: dy
          }, chartsToPan, e);
        }

        var win = (0, _utils.d3Window)(_this.ref.current);
        (0, _d3Selection.select)(win).on(_utils.MOUSEMOVE, null).on(_utils.MOUSEUP, null);

        _this.setState({
          panInProgress: false,
          panStart: undefined
        });
      }

      if (onContextMenu !== undefined) {
        onContextMenu(mouseXY, e);
      }
    };

    _this.handleDrag = function (e) {
      var onDrag = _this.props.onDrag;

      if (onDrag === undefined) {
        return;
      }

      _this.dragHappened = true;
      var dragStartPosition = _this.state.dragStartPosition;

      if (dragStartPosition === undefined) {
        return;
      }

      var mouseXY = (0, _d3Selection.pointer)(e, _this.ref.current);
      onDrag({
        startPos: dragStartPosition,
        mouseXY: mouseXY
      }, e);
    };

    _this.handleDragEnd = function (e) {
      var mouseXY = (0, _d3Selection.pointer)(e, _this.ref.current);
      var win = (0, _utils.d3Window)(_this.ref.current);
      (0, _d3Selection.select)(win) // @ts-ignore
      .on(_utils.MOUSEMOVE, _this.mouseInside ? _this.handleMouseMove : null).on(_utils.MOUSEUP, null);

      if (_this.dragHappened) {
        var onDragComplete = _this.props.onDragComplete;

        if (onDragComplete !== undefined) {
          onDragComplete({
            mouseXY: mouseXY
          }, e);
        }
      }

      _this.setState({
        dragInProgress: false
      });

      _this.mouseInteraction = true;
    };

    _this.canPan = function () {
      var getAllPanConditions = _this.props.getAllPanConditions;
      var initialPanEnabled = _this.props.pan;

      var _getAllPanConditions$ = getAllPanConditions().reduce(function (returnObj, a) {
        return {
          draggable: returnObj.draggable || a.draggable,
          panEnabled: returnObj.panEnabled && a.panEnabled
        };
      }, {
        draggable: false,
        panEnabled: initialPanEnabled
      }),
          panEnabled = _getAllPanConditions$.panEnabled,
          somethingSelected = _getAllPanConditions$.draggable;

      return {
        panEnabled: panEnabled,
        somethingSelected: somethingSelected
      };
    };

    _this.handleMouseDown = function (e) {
      if (e.button !== 0) {
        return;
      }

      var _this$props6 = _this.props,
          xScale = _this$props6.xScale,
          chartConfig = _this$props6.chartConfig,
          onMouseDown = _this$props6.onMouseDown;
      _this.panHappened = false;
      _this.dragHappened = false;
      _this.focus = true;

      if (!_this.state.panInProgress && _this.mouseInteraction) {
        var mouseXY = (0, _utils.mousePosition)(e);
        var currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfig, mouseXY);

        var _this$canPan = _this.canPan(),
            panEnabled = _this$canPan.panEnabled,
            somethingSelected = _this$canPan.somethingSelected;

        var pan = panEnabled && !somethingSelected;

        if (pan) {
          _this.setState({
            panInProgress: pan,
            panStart: {
              panStartXScale: xScale,
              panOrigin: mouseXY,
              chartsToPan: currentCharts
            }
          });

          var win = (0, _utils.d3Window)(_this.ref.current);
          (0, _d3Selection.select)(win).on(_utils.MOUSEMOVE, _this.handlePan).on(_utils.MOUSEUP, _this.handlePanEnd);
        } else if (somethingSelected) {
          _this.setState({
            panInProgress: false,
            dragInProgress: true,
            panStart: undefined,
            dragStartPosition: mouseXY
          });

          var onDragStart = _this.props.onDragStart;

          if (onDragStart !== undefined) {
            onDragStart({
              startPos: mouseXY
            }, e);
          }

          var _win = (0, _utils.d3Window)(_this.ref.current);

          (0, _d3Selection.select)(_win).on(_utils.MOUSEMOVE, _this.handleDrag).on(_utils.MOUSEUP, _this.handleDragEnd);
        }

        if (onMouseDown !== undefined) {
          onMouseDown(mouseXY, currentCharts, e);
        }
      }

      e.preventDefault();
    };

    _this.shouldPan = function () {
      var _this$props7 = _this.props,
          panEnabled = _this$props7.pan,
          onPan = _this$props7.onPan;
      return panEnabled && onPan && _this.state.panStart !== undefined;
    };

    _this.handlePan = function (e) {
      if (_this.shouldPan() && _this.state.panStart !== undefined) {
        _this.panHappened = true;
        var _this$state$panStart4 = _this.state.panStart,
            panStartXScale = _this$state$panStart4.panStartXScale,
            panOrigin = _this$state$panStart4.panOrigin,
            chartsToPan = _this$state$panStart4.chartsToPan;
        var dx;
        var dy;
        var mouseXY;

        if (_this.mouseInteraction) {
          mouseXY = (0, _d3Selection.pointer)(e, _this.ref.current);
          _this.lastNewPos = mouseXY;
          dx = mouseXY[0] - panOrigin[0];
          dy = mouseXY[1] - panOrigin[1];
        } else {
          mouseXY = (0, _d3Selection.pointers)(e, _this.ref.current)[0];
          _this.lastNewPos = mouseXY;
          dx = panOrigin[0] - mouseXY[0];
          dy = panOrigin[1] - mouseXY[1];
        }

        _this.dx = dx;
        _this.dy = dy;
        var onPan = _this.props.onPan;

        if (onPan !== undefined) {
          onPan(mouseXY, panStartXScale, {
            dx: dx,
            dy: dy
          }, chartsToPan, e);
        }
      }
    };

    _this.handlePanEnd = function (e) {
      var _this$props8 = _this.props,
          panEnabled = _this$props8.pan,
          onPanEnd = _this$props8.onPanEnd;

      if (_this.state.panStart !== undefined) {
        var _this$state$panStart5 = _this.state.panStart,
            panStartXScale = _this$state$panStart5.panStartXScale,
            chartsToPan = _this$state$panStart5.chartsToPan;
        var win = (0, _utils.d3Window)(_this.ref.current);
        (0, _d3Selection.select)(win) // @ts-ignore
        .on(_utils.MOUSEMOVE, _this.mouseInside ? _this.handleMouseMove : null).on(_utils.MOUSEUP, null).on(_utils.TOUCHMOVE, null).on(_utils.TOUCHEND, null);

        if (_this.panHappened && panEnabled && onPanEnd) {
          var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
              _assertThisInitialize2 = _assertThisInitialize.dx,
              dx = _assertThisInitialize2 === void 0 ? 0 : _assertThisInitialize2,
              _assertThisInitialize3 = _assertThisInitialize.dy,
              dy = _assertThisInitialize3 === void 0 ? 0 : _assertThisInitialize3;

          delete _this.dx;
          delete _this.dy;

          if (_this.lastNewPos !== undefined) {
            onPanEnd(_this.lastNewPos, panStartXScale, {
              dx: dx,
              dy: dy
            }, chartsToPan, e);
          }
        }

        _this.setState({
          panInProgress: false,
          panStart: undefined
        });
      }
    };

    _this.handleTouchMove = function (e) {
      var onMouseMove = _this.props.onMouseMove;

      if (onMouseMove === undefined) {
        return;
      }

      var touch = (0, _utils.getTouchProps)(e.touches[0]);
      var touchXY = (0, _utils.touchPosition)(touch, e);
      onMouseMove(touchXY, "touch", e);
    };

    _this.handleTouchStart = function (e) {
      _this.mouseInteraction = false;
      var _this$props9 = _this.props,
          panEnabled = _this$props9.pan,
          chartConfig = _this$props9.chartConfig,
          onMouseMove = _this$props9.onMouseMove,
          xScale = _this$props9.xScale,
          onPanEnd = _this$props9.onPanEnd;

      if (e.touches.length === 1) {
        _this.panHappened = false;
        var touchXY = (0, _utils.touchPosition)((0, _utils.getTouchProps)(e.touches[0]), e);

        if (onMouseMove !== undefined) {
          onMouseMove(touchXY, "touch", e);
        }

        if (panEnabled) {
          var currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfig, touchXY);

          _this.setState({
            panInProgress: true,
            panStart: {
              panStartXScale: xScale,
              panOrigin: touchXY,
              chartsToPan: currentCharts
            }
          });

          var win = (0, _utils.d3Window)(_this.ref.current);
          (0, _d3Selection.select)(win).on(_utils.TOUCHMOVE, _this.handlePan, false).on(_utils.TOUCHEND, _this.handlePanEnd, false);
        }
      } else if (e.touches.length === 2) {
        // pinch zoom begin
        // do nothing pinch zoom is handled in handleTouchMove
        var _this$state = _this.state,
            panInProgress = _this$state.panInProgress,
            panStart = _this$state.panStart;

        if (panInProgress && panEnabled && onPanEnd && panStart !== undefined) {
          var panStartXScale = panStart.panStartXScale,
              _panStart$panOrigin = panStart.panOrigin,
              dx = _panStart$panOrigin[0],
              dy = _panStart$panOrigin[1],
              chartsToPan = panStart.chartsToPan;

          var _win2 = (0, _utils.d3Window)(_this.ref.current);

          (0, _d3Selection.select)(_win2) // @ts-ignore
          .on(_utils.MOUSEMOVE, _this.mouseInside ? _this.handleMouseMove : null).on(_utils.MOUSEUP, null).on(_utils.TOUCHMOVE, _this.handlePinchZoom, false).on(_utils.TOUCHEND, _this.handlePinchZoomEnd, false);
          var touch1Pos = (0, _utils.touchPosition)((0, _utils.getTouchProps)(e.touches[0]), e);
          var touch2Pos = (0, _utils.touchPosition)((0, _utils.getTouchProps)(e.touches[1]), e);

          if (_this.panHappened && panEnabled && onPanEnd && _this.lastNewPos !== undefined) {
            onPanEnd(_this.lastNewPos, panStartXScale, {
              dx: dx,
              dy: dy
            }, chartsToPan, e);
          }

          _this.setState({
            panInProgress: false,
            pinchZoomStart: {
              xScale: xScale,
              touch1Pos: touch1Pos,
              touch2Pos: touch2Pos,
              range: xScale.range(),
              chartsToPan: chartsToPan
            }
          });
        }
      }
    };

    _this.handlePinchZoom = function (e) {
      var pinchZoomStart = _this.state.pinchZoomStart;

      if (pinchZoomStart === undefined) {
        return;
      }

      var _this$props10 = _this.props,
          xScale = _this$props10.xScale,
          zoomEnabled = _this$props10.zoom,
          onPinchZoom = _this$props10.onPinchZoom;

      if (!zoomEnabled || onPinchZoom === undefined) {
        return;
      }

      var _pointers = (0, _d3Selection.pointers)(_this.ref.current),
          touch1Pos = _pointers[0],
          touch2Pos = _pointers[1];
      /*eslint-disable no-unused-vars*/


      var chartsToPan = pinchZoomStart.chartsToPan,
          initialPinch = (0, _objectWithoutPropertiesLoose2["default"])(pinchZoomStart, _excluded);
      /*eslint-enable no-unused-vars*/

      onPinchZoom(initialPinch, {
        touch1Pos: touch1Pos,
        touch2Pos: touch2Pos,
        xScale: xScale
      }, e);
    };

    _this.handlePinchZoomEnd = function (e) {
      var win = (0, _utils.d3Window)(_this.ref.current);
      (0, _d3Selection.select)(win).on(_utils.TOUCHMOVE, null).on(_utils.TOUCHEND, null);
      var pinchZoomStart = _this.state.pinchZoomStart;

      if (pinchZoomStart === undefined) {
        return;
      }
      /*eslint-disable no-unused-vars*/


      var chartsToPan = pinchZoomStart.chartsToPan,
          initialPinch = (0, _objectWithoutPropertiesLoose2["default"])(pinchZoomStart, _excluded2);
      /*eslint-enable no-unused-vars*/

      var _this$props11 = _this.props,
          zoomEnabled = _this$props11.zoom,
          onPinchZoomEnd = _this$props11.onPinchZoomEnd;

      if (zoomEnabled && onPinchZoomEnd) {
        onPinchZoomEnd(initialPinch, e);
      }

      _this.setState({
        pinchZoomStart: undefined
      });
    };

    _this.setCursorClass = function (cursorOverrideClass) {
      if (cursorOverrideClass !== _this.state.cursorOverrideClass) {
        _this.setState({
          cursorOverrideClass: cursorOverrideClass
        });
      }
    };

    _this.focus = props.focus;
    _this.state = {
      panInProgress: false
    };
    return _this;
  }

  var _proto = EventCapture.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var disableInteraction = this.props.disableInteraction;
    var current = this.ref.current;

    if (current === null) {
      return;
    }

    if (!disableInteraction) {
      // @ts-ignore
      (0, _d3Selection.select)(current).on(_utils.MOUSEENTER, this.handleEnter).on(_utils.MOUSELEAVE, this.handleLeave); // @ts-ignore

      current.addEventListener("wheel", this.handleWheel, {
        passive: false
      });
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.componentDidMount();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var disableInteraction = this.props.disableInteraction;
    var current = this.ref.current;

    if (current === null) {
      return;
    }

    if (!disableInteraction) {
      (0, _d3Selection.select)(current).on(_utils.MOUSEENTER, null).on(_utils.MOUSELEAVE, null);
      var win = (0, _utils.d3Window)(current);
      (0, _d3Selection.select)(win).on(_utils.MOUSEMOVE, null);
      current.removeEventListener("wheel", this.handleWheel, {
        passive: false
      });
    }
  };

  _proto.queuePanEnd = function queuePanEnd(e) {
    var _this2 = this;

    if (this.panEndTimeout !== undefined) {
      window.clearTimeout(this.panEndTimeout);
    }

    this.panEndTimeout = window.setTimeout(function () {
      _this2.handlePanEnd(e);
    }, 100);
  };

  _proto.cancelDrag = function cancelDrag() {
    var win = (0, _utils.d3Window)(this.ref.current);
    (0, _d3Selection.select)(win) // @ts-ignore
    .on(_utils.MOUSEMOVE, this.mouseInside ? this.handleMouseMove : null).on(_utils.MOUSEUP, null);
    this.setState({
      dragInProgress: false
    });
    this.mouseInteraction = true;
  };

  _proto.render = function render() {
    var _this$props12 = this.props,
        height = _this$props12.height,
        width = _this$props12.width,
        disableInteraction = _this$props12.disableInteraction,
        useCrossHairStyleCursor = _this$props12.useCrossHairStyleCursor,
        _this$state2 = this.state,
        cursorOverrideClass = _this$state2.cursorOverrideClass,
        panInProgress = _this$state2.panInProgress,
        className = disableInteraction ? void 0 : cursorOverrideClass !== undefined ? cursorOverrideClass : !useCrossHairStyleCursor ? void 0 : panInProgress ? _CL.CL_GRABBING_CURSOR : _CL.CL_CROSSHAIR_CURSOR,
        interactionProps = disableInteraction || {
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClick,
      onContextMenu: this.handleRightClick,
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("rect", (0, _extends2["default"])({
      ref: this.ref,
      className: className,
      width: width,
      height: height,
      style: {
        opacity: 0
      }
    }, interactionProps));
  };

  return EventCapture;
}(_react["default"].Component);

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