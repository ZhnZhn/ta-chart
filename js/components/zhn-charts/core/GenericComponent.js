"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getMouseCanvas = exports.getAxisCanvas = exports.GenericComponent = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _useRerender = _interopRequireDefault(require("../../hooks/useRerender"));
var _useEventCallback = _interopRequireDefault(require("../../hooks/useEventCallback"));
var _ChartCanvas = require("./ChartCanvas");
var _Chart = require("./Chart");
var _ChartFn = require("./ChartFn");
var _jsxRuntime = require("react/jsx-runtime");
var _assign = Object.assign;
var aliases = {
  mouseleave: "mousemove",
  // to draw interactive after mouse exit
  panend: "pan",
  pinchzoom: "pan",
  mousedown: "mousemove",
  click: "mousemove",
  contextmenu: "mousemove",
  dblclick: "mousemove",
  dragstart: "drag",
  dragend: "drag",
  dragcancel: "drag",
  zoom: "zoom"
};
var DF_CANVAS_TO_DRAW = function DF_CANVAS_TO_DRAW(contexts) {
  return contexts.mouseCoord;
};
var _crStyle = function _crStyle(chartId, clip) {
  var _suffix = chartId !== void 0 ? "-" + chartId : "";
  return clip ? {
    clipPath: "url(#chart-area-clip" + _suffix + ")"
  } : void 0;
};
var GenericComponent = (0, _uiApi.memo)((0, _uiApi.forwardRef)(function (props, ref) {
  var isHover = props.isHover,
    _props$clip = props.clip,
    clip = _props$clip === void 0 ? true : _props$clip,
    _props$edgeClip = props.edgeClip,
    edgeClip = _props$edgeClip === void 0 ? false : _props$edgeClip,
    _props$canvasToDraw = props.canvasToDraw,
    canvasToDraw = _props$canvasToDraw === void 0 ? DF_CANVAS_TO_DRAW : _props$canvasToDraw,
    canvasDraw = props.canvasDraw,
    svgDraw = props.svgDraw,
    preCanvasDraw = props.preCanvasDraw,
    postCanvasDraw = props.postCanvasDraw,
    updateMoreProps = props.updateMoreProps,
    getMoreProps = props.getMoreProps,
    context = (0, _uiApi.useContext)(_ChartCanvas.ChartCanvasContext),
    _useContext = (0, _uiApi.useContext)(_Chart.ChartContext),
    chartId = _useContext.chartId,
    subscriberId = (0, _uiApi.useMemo)(function () {
      return (context.generateSubscriptionId == null ? void 0 : context.generateSubscriptionId()) || 0;
    }, []),
    rerenderComponent = (0, _useRerender["default"])(),
    getCanvasContexts = context.getCanvasContexts,
    subscribe = context.subscribe,
    unsubscribe = context.unsubscribe,
    moreProps = (0, _uiApi.useRef)({
      chartId: context.chartId,
      hovering: false,
      currentCharts: [],
      chartConfigs: context.chartConfigs,
      fullData: context.fullData,
      plotData: context.plotData,
      xScale: context.xScale,
      xAccessor: context.xAccessor
    }),
    dragInProgressRef = (0, _uiApi.useRef)(false),
    evaluationInProgressRef = (0, _uiApi.useRef)(false),
    iSetTheCursorClassRef = (0, _uiApi.useRef)(false);
  var _updateMoreProps = (0, _uiApi.useCallback)(function (newMoreProps, moreProps) {
    _assign(moreProps, newMoreProps || {});
    updateMoreProps == null ? void 0 : updateMoreProps(newMoreProps, moreProps);
  }, [updateMoreProps]);
  var _getMoreProps = (0, _uiApi.useCallback)(function () {
    var chartConfigs = context.chartConfigs,
      xAccessor = context.xAccessor,
      displayXAccessor = context.displayXAccessor,
      width = context.width,
      height = context.height,
      fullData = context.fullData,
      otherMoreProps = getMoreProps == null ? void 0 : getMoreProps(moreProps.current);
    return (0, _extends2["default"])({
      displayXAccessor: displayXAccessor,
      width: width,
      height: height
    }, moreProps.current, {
      fullData: fullData,
      chartConfigs: chartConfigs,
      xAccessor: xAccessor
    }, otherMoreProps, {
      chartConfig: (0, _ChartFn.findChartConfig)(chartConfigs, chartId)
    });
  }, [context, getMoreProps, chartId]);
  (0, _uiApi.useImperativeHandle)(ref, function () {
    return {
      getMoreProps: _getMoreProps
    };
  }, [_getMoreProps]);
  var _isHover = (0, _uiApi.useCallback)(function (e) {
      return isHover === undefined ? false : isHover(_getMoreProps(), e);
    }, [isHover, _getMoreProps]),
    _preCanvasDraw = (0, _uiApi.useCallback)(function (ctx, moreProps) {
      preCanvasDraw == null ? void 0 : preCanvasDraw(ctx, moreProps);
    }, [preCanvasDraw]),
    _postCanvasDraw = (0, _uiApi.useCallback)(function (ctx, moreProps) {
      postCanvasDraw == null ? void 0 : postCanvasDraw(ctx, moreProps);
    }, [postCanvasDraw]);
  var evaluateType = (0, _useEventCallback["default"])(function (type, e) {
    var newType = aliases[type] || type,
      proceed = props.drawOn.includes(newType);
    if (!proceed) {
      return;
    }
    if (props.shouldTypeProceed && !props.shouldTypeProceed(type, moreProps.current)) {
      return;
    }
    switch (type) {
      case "zoom":
      case "mouseenter":
        // DO NOT DRAW FOR THESE EVENTS
        break;
      case "mouseleave":
        {
          moreProps.current.hovering = false;
          if (props.onUnHover) {
            props.onUnHover(e, _getMoreProps());
          }
          break;
        }
      case "contextmenu":
        {
          if (props.onContextMenu) {
            props.onContextMenu(e, _getMoreProps());
          }
          if (moreProps.current.hovering && props.onContextMenuWhenHover) {
            props.onContextMenuWhenHover(e, _getMoreProps());
          }
          break;
        }
      case "mousedown":
        {
          if (props.onMouseDown) {
            props.onMouseDown(e, _getMoreProps());
          }
          break;
        }
      case "click":
        {
          var onClick = props.onClick,
            onClickOutside = props.onClickOutside,
            onClickWhenHover = props.onClickWhenHover;
          var _moreProps = _getMoreProps();
          if (_moreProps.hovering && onClickWhenHover !== undefined) {
            onClickWhenHover(e, _moreProps);
          } else if (onClickOutside !== undefined) {
            onClickOutside(e, _moreProps);
          }
          if (onClick !== undefined) {
            onClick(e, _moreProps);
          }
          break;
        }
      case "mousemove":
        {
          var prevHover = moreProps.current.hovering;
          moreProps.current.hovering = _isHover(e);
          var amIOnTop = context.amIOnTop,
            setCursorClass = context.setCursorClass;
          if (moreProps.current.hovering && !props.selected && /* && !prevHover */
          amIOnTop(subscriberId) && props.onHover !== undefined) {
            setCursorClass("react-financial-charts-pointer-cursor");
            iSetTheCursorClassRef.current = true;
          } else if (moreProps.current.hovering && props.selected && amIOnTop(subscriberId)) {
            setCursorClass(props.interactiveCursorClass);
            iSetTheCursorClassRef.current = true;
          } else if (prevHover && !moreProps.current.hovering && iSetTheCursorClassRef.current) {
            iSetTheCursorClassRef.current = false;
            setCursorClass(null);
          }
          var morePropsSub = _getMoreProps();
          if (moreProps.current.hovering && !prevHover) {
            if (props.onHover) {
              props.onHover(e, morePropsSub);
            }
          }
          if (prevHover && !moreProps.current.hovering) {
            if (props.onUnHover) {
              props.onUnHover(e, morePropsSub);
            }
          }
          if (props.onMouseMove) {
            props.onMouseMove(e, morePropsSub);
          }
          break;
        }
      case "dblclick":
        {
          var _morePropsSub = _getMoreProps();
          if (props.onDoubleClick) {
            props.onDoubleClick(e, _morePropsSub);
          }
          if (moreProps.current.hovering && props.onDoubleClickWhenHover) {
            props.onDoubleClickWhenHover(e, _morePropsSub);
          }
          break;
        }
      case "pan":
        {
          moreProps.current.hovering = false;
          if (props.onPan) {
            props.onPan(e, _getMoreProps());
          }
          break;
        }
      case "panend":
        {
          if (props.onPanEnd) {
            props.onPanEnd(e, _getMoreProps());
          }
          break;
        }
      case "dragstart":
        {
          if (getPanConditions().draggable) {
            var _amIOnTop = context.amIOnTop;
            if (_amIOnTop(subscriberId)) {
              dragInProgressRef.current = true;
              if (props.onDragStart !== undefined) {
                props.onDragStart(e, _getMoreProps());
              }
            }
          }
          break;
        }
      case "drag":
        {
          if (dragInProgressRef.current && props.onDrag) {
            props.onDrag(e, _getMoreProps());
          }
          break;
        }
      case "dragend":
        {
          if (dragInProgressRef.current && props.onDragComplete) {
            props.onDragComplete(e, _getMoreProps());
          }
          dragInProgressRef.current = false;
          break;
        }
      case "dragcancel":
        {
          if (dragInProgressRef.current || iSetTheCursorClassRef.current) {
            var _setCursorClass = context.setCursorClass;
            _setCursorClass(null);
          }
          break;
        }
      default:
        return;
    }
  });
  var listener = (0, _useEventCallback["default"])(function (type, newMoreProps, state, e) {
    if (newMoreProps) {
      _updateMoreProps(newMoreProps, moreProps.current);
    }
    evaluationInProgressRef.current = true;
    evaluateType(type, e);
    evaluationInProgressRef.current = false;
  });
  var drawOnCanvas = (0, _uiApi.useCallback)(function () {
    if (canvasDraw === void 0 || canvasToDraw === void 0) {
      return;
    }
    var moreProps = _getMoreProps(),
      contexts = getCanvasContexts == null ? void 0 : getCanvasContexts();
    if (contexts === void 0) {
      return;
    }
    var ctx = canvasToDraw(contexts);
    if (ctx !== void 0) {
      _preCanvasDraw(ctx, moreProps);
      canvasDraw(ctx, moreProps);
      _postCanvasDraw(ctx, moreProps);
    }
  }, [canvasToDraw, canvasDraw, getCanvasContexts, _preCanvasDraw, _postCanvasDraw, _getMoreProps]);
  var draw = (0, _useEventCallback["default"])(function (_ref) {
    var trigger = _ref.trigger,
      _ref$force = _ref.force,
      force = _ref$force === void 0 ? false : _ref$force;
    var type = aliases[trigger] || trigger,
      proceed = props.drawOn.indexOf(type) > -1;
    if (proceed || props.selected /* this is to draw as soon as you select */ || force) {
      if (canvasDraw === undefined) {
        rerenderComponent();
      } else {
        drawOnCanvas();
      }
    }
  });
  var getPanConditions = (0, _useEventCallback["default"])(function () {
    var draggable = moreProps.current.hovering && (props.selected || props.enableDragOnHover);
    return {
      draggable: !!draggable,
      panEnabled: !props.disablePan
    };
  });

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(function () {
    var setCursorClass = context.setCursorClass;
    if (props.selected && moreProps.current.hovering) {
      iSetTheCursorClassRef.current = true;
      setCursorClass(props.interactiveCursorClass);
    } else {
      iSetTheCursorClassRef.current = false;
      setCursorClass(null);
    }
  }, [props.selected]);
  // context, props.interactiveCursorClass
  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _uiApi.useEffect)(function () {
    if (canvasDraw !== void 0 && !evaluationInProgressRef.current) {
      _updateMoreProps(void 0, moreProps.current);
      drawOnCanvas();
    }
  });

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(function () {
    subscribe(subscriberId, {
      chartId: chartId,
      clip: clip,
      edgeClip: edgeClip,
      listener: listener,
      draw: draw,
      getPanConditions: getPanConditions
    });
    return function () {
      unsubscribe(subscriberId);
      if (iSetTheCursorClassRef.current) {
        context.setCursorClass(null);
      }
    };
  }, [chartId, subscriberId, edgeClip, clip]);
  // context, draw, getPanConditions, listener, subscribe, unsubscribe
  /*eslint-enable react-hooks/exhaustive-deps */

  return canvasDraw !== void 0 || svgDraw === void 0 ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    style: _crStyle(chartId, clip),
    children: svgDraw(_getMoreProps())
  });
}));
exports.GenericComponent = GenericComponent;
var getAxisCanvas = function getAxisCanvas(contexts) {
  return contexts.axes;
};
exports.getAxisCanvas = getAxisCanvas;
var getMouseCanvas = function getMouseCanvas(contexts) {
  return contexts.mouseCoord;
};
exports.getMouseCanvas = getMouseCanvas;
//# sourceMappingURL=GenericComponent.js.map