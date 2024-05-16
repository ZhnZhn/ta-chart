"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.getMouseCanvas = exports.getAxisCanvas = exports.GenericComponent = void 0;
var _uiApi = require("../../uiApi");
var _useRerender = _interopRequireDefault(require("../../hooks/useRerender"));
var _useEventCallback = _interopRequireDefault(require("../../hooks/useEventCallback"));
var _ChartCanvas = require("./ChartCanvas");
var _Chart = require("./Chart");
var _ChartFn = require("./ChartFn");
var _jsxRuntime = require("react/jsx-runtime");
const _assign = Object.assign;
const aliases = {
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
const DF_CANVAS_TO_DRAW = contexts => contexts.mouseCoord;
const _crStyle = (chartId, clip) => {
  const _suffix = chartId !== void 0 ? "-" + chartId : "";
  return clip ? {
    clipPath: "url(#chart-area-clip" + _suffix + ")"
  } : void 0;
};
const GenericComponent = exports.GenericComponent = (0, _uiApi.memo)(props => {
  const {
      refEl,
      isHover,
      clip = true,
      edgeClip = false,
      canvasToDraw = DF_CANVAS_TO_DRAW,
      canvasDraw,
      svgDraw,
      preCanvasDraw,
      postCanvasDraw,
      updateMoreProps,
      getMoreProps
    } = props,
    context = (0, _uiApi.useContext)(_ChartCanvas.ChartCanvasContext),
    {
      chartId
    } = (0, _uiApi.useContext)(_Chart.ChartContext)

    /*eslint-disable react-hooks/exhaustive-deps */,
    subscriberId = (0, _uiApi.useMemo)(() => (context.generateSubscriptionId == null ? void 0 : context.generateSubscriptionId()) || 0, [])
    // context
    /*eslint-enable react-hooks/exhaustive-deps */,
    rerenderComponent = (0, _useRerender.default)(),
    {
      getCanvasContexts,
      subscribe,
      unsubscribe
    } = context,
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
  const _updateMoreProps = (0, _uiApi.useCallback)((newMoreProps, moreProps) => {
    _assign(moreProps, newMoreProps || {});
    updateMoreProps == null || updateMoreProps(newMoreProps, moreProps);
  }, [updateMoreProps]);
  const _getMoreProps = (0, _uiApi.useCallback)(() => {
    const {
        chartConfigs,
        xAccessor,
        displayXAccessor,
        width,
        height,
        fullData
      } = context,
      otherMoreProps = getMoreProps == null ? void 0 : getMoreProps(moreProps.current);
    return {
      displayXAccessor,
      width,
      height,
      ...moreProps.current,
      fullData,
      chartConfigs,
      xAccessor,
      ...otherMoreProps,
      chartConfig: (0, _ChartFn.findChartConfig)(chartConfigs, chartId)
    };
  }, [context, getMoreProps, chartId]);
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    getMoreProps: _getMoreProps
  }), [_getMoreProps]);
  const _isHover = (0, _uiApi.useCallback)(e => isHover === undefined ? false : isHover(_getMoreProps(), e), [isHover, _getMoreProps]),
    _preCanvasDraw = (0, _uiApi.useCallback)((ctx, moreProps) => {
      preCanvasDraw == null || preCanvasDraw(ctx, moreProps);
    }, [preCanvasDraw]),
    _postCanvasDraw = (0, _uiApi.useCallback)((ctx, moreProps) => {
      postCanvasDraw == null || postCanvasDraw(ctx, moreProps);
    }, [postCanvasDraw]);
  const evaluateType = (0, _useEventCallback.default)((type, e) => {
    const newType = aliases[type] || type,
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
          const {
            onClick,
            onClickOutside,
            onClickWhenHover
          } = props;
          const moreProps = _getMoreProps();
          if (moreProps.hovering && onClickWhenHover !== undefined) {
            onClickWhenHover(e, moreProps);
          } else if (onClickOutside !== undefined) {
            onClickOutside(e, moreProps);
          }
          if (onClick !== undefined) {
            onClick(e, moreProps);
          }
          break;
        }
      case "mousemove":
        {
          const prevHover = moreProps.current.hovering;
          moreProps.current.hovering = _isHover(e);
          const {
            amIOnTop,
            setCursorClass
          } = context;
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
          const morePropsSub = _getMoreProps();
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
          const morePropsSub = _getMoreProps();
          if (props.onDoubleClick) {
            props.onDoubleClick(e, morePropsSub);
          }
          if (moreProps.current.hovering && props.onDoubleClickWhenHover) {
            props.onDoubleClickWhenHover(e, morePropsSub);
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
            const {
              amIOnTop
            } = context;
            if (amIOnTop(subscriberId)) {
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
            const {
              setCursorClass
            } = context;
            setCursorClass(null);
          }
          break;
        }
      default:
        return;
    }
  });
  const listener = (0, _useEventCallback.default)((type, newMoreProps, state, e) => {
    if (newMoreProps) {
      _updateMoreProps(newMoreProps, moreProps.current);
    }
    evaluationInProgressRef.current = true;
    evaluateType(type, e);
    evaluationInProgressRef.current = false;
  });
  const drawOnCanvas = (0, _uiApi.useCallback)(() => {
    if (canvasDraw === void 0 || canvasToDraw === void 0) {
      return;
    }
    const moreProps = _getMoreProps(),
      contexts = getCanvasContexts == null ? void 0 : getCanvasContexts();
    if (contexts === void 0) {
      return;
    }
    const ctx = canvasToDraw(contexts);
    if (ctx !== void 0) {
      _preCanvasDraw(ctx, moreProps);
      canvasDraw(ctx, moreProps);
      _postCanvasDraw(ctx, moreProps);
    }
  }, [canvasToDraw, canvasDraw, getCanvasContexts, _preCanvasDraw, _postCanvasDraw, _getMoreProps]);
  const draw = (0, _useEventCallback.default)(_ref => {
    let {
      trigger,
      force = false
    } = _ref;
    const type = aliases[trigger] || trigger,
      proceed = props.drawOn.indexOf(type) > -1;
    if (proceed || props.selected /* this is to draw as soon as you select */ || force) {
      if (canvasDraw === undefined) {
        rerenderComponent();
      } else {
        drawOnCanvas();
      }
    }
  });
  const getPanConditions = (0, _useEventCallback.default)(() => {
    const draggable = moreProps.current.hovering && (props.selected || props.enableDragOnHover);
    return {
      draggable: !!draggable,
      panEnabled: !props.disablePan
    };
  });

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    const {
      setCursorClass
    } = context;
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

  (0, _uiApi.useEffect)(() => {
    if (canvasDraw !== void 0 && !evaluationInProgressRef.current) {
      _updateMoreProps(void 0, moreProps.current);
      drawOnCanvas();
    }
  });

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    subscribe(subscriberId, {
      chartId,
      clip,
      edgeClip,
      listener,
      draw,
      getPanConditions
    });
    return () => {
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
});
const getAxisCanvas = contexts => {
  return contexts.axes;
};
exports.getAxisCanvas = getAxisCanvas;
const getMouseCanvas = contexts => {
  return contexts.mouseCoord;
};
exports.getMouseCanvas = getMouseCanvas;
//# sourceMappingURL=GenericComponent.js.map