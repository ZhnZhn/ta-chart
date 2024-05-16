"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ChartCanvasContext = exports.ChartCanvas = void 0;
var _uiApi = require("../../uiApi");
var _d3Array = require("../d3Array");
var _utils = require("./utils");
var _zoomBehavior = require("./zoom/zoomBehavior");
var _ChartDataUtil = require("./utils/ChartDataUtil");
var _EventCapture = require("./EventCapture");
var _CanvasContainer = require("./CanvasContainer");
var _ChartCanvasDefs = _interopRequireDefault(require("./ChartCanvasDefs"));
var _dfChartCanvasContextValue = require("./dfChartCanvasContextValue");
var _ChartCanvasFn = require("./ChartCanvasFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types';

const _callOnLoadHandlers = (fullData, xScale, xAccessor, onLoadAfter, onLoadBefore) => {
  const firstItem = (0, _utils.head)(fullData),
    scale_start = (0, _utils.head)(xScale.domain()),
    data_start = xAccessor(firstItem),
    lastItem = (0, _utils.last)(fullData),
    scale_end = (0, _utils.last)(xScale.domain()),
    data_end = xAccessor(lastItem);
  if (scale_start < data_start) {
    if (onLoadBefore !== undefined) {
      onLoadBefore(scale_start, data_start);
    }
  }
  if (data_end < scale_end) {
    if (onLoadAfter !== undefined) {
      onLoadAfter(data_end, scale_end);
    }
  }
};
const _crZoomDirection = (zoomDirection, zoomMultiplier) => zoomDirection > 0 ? 1 * zoomMultiplier : 1 / zoomMultiplier;
const _crNewDomain = (initialXScale, item, c) => {
  const cx = initialXScale(item);
  return initialXScale.range().map(x => cx + (x - cx) * c).map(x => initialXScale.invert(x));
};
const _crPinchZoomNewDomain = (initialPinch, finalPinch, initialPinchXScale) => {
  const {
      topLeft: iTL,
      bottomRight: iBR
    } = (0, _ChartCanvasFn.pinchCoordinates)(initialPinch),
    {
      topLeft: fTL,
      bottomRight: fBR
    } = (0, _ChartCanvasFn.pinchCoordinates)(finalPinch),
    e = initialPinchXScale.range()[1],
    xDash = Math.round(-(iBR[0] * fTL[0] - iTL[0] * fBR[0]) / (iTL[0] - iBR[0])),
    yDash = Math.round(e + ((e - iBR[0]) * (e - fTL[0]) - (e - iTL[0]) * (e - fBR[0])) / (e - iTL[0] - (e - iBR[0]))),
    x = Math.round(-xDash * iTL[0] / (-xDash + fTL[0])),
    y = Math.round(e - (yDash - e) * (e - iTL[0]) / (yDash + (e - fTL[0])));
  return [x, y].map(initialPinchXScale.invert);
};
const FN_NOOP = () => {};
const ChartCanvasContext = exports.ChartCanvasContext = (0, _uiApi.createContext)(_dfChartCanvasContextValue.dfChartCanvasContextValue);
const _crYAxisZoomChartConfigs = (chartConfigs, chartId, newDomain) => chartConfigs.map(each => each.id === chartId ? {
  ...each,
  yScale: each.yScale.copy().domain(newDomain),
  yPanEnabled: true
} : each);
class ChartCanvas extends _uiApi.Component {
  constructor(_props) {
    super(_props);
    this.canvasContainerRef = (0, _uiApi.createRef)();
    this.eventCaptureRef = (0, _uiApi.createRef)();
    this.finalPinch = void 0;
    this.lastSubscriptionId = 0;
    this.mutableState = {};
    this.panInProgress = false;
    this.prevMouseXY = void 0;
    this._isDidUpdateRedraw = false;
    this._asyncRedrawId = void 0;
    this.subscriptions = [];
    this.waitingForPinchZoomAnimationFrame = void 0;
    this.waitingForPanAnimationFrame = void 0;
    this.waitingForMouseMoveAnimationFrame = void 0;
    this.hackyWayToStopPanBeyondBounds__plotData = void 0;
    this.hackyWayToStopPanBeyondBounds__domain = void 0;
    this.getMutableState = () => {
      return this.mutableState;
    };
    this.getCanvasContexts = () => {
      var _this$canvasContainer;
      return (_this$canvasContainer = this.canvasContainerRef.current) == null ? void 0 : _this$canvasContainer.getCanvasContexts();
    };
    this.generateSubscriptionId = () => {
      this.lastSubscriptionId++;
      return this.lastSubscriptionId;
    };
    this.subscribe = (id, rest) => {
      const {
        getPanConditions = (0, _utils.functor)({
          draggable: false,
          panEnabled: true
        })
      } = rest;
      this.subscriptions = this.subscriptions.concat({
        id,
        ...rest,
        getPanConditions
      });
    };
    this.unsubscribe = id => {
      this.subscriptions = this.subscriptions.filter(subscriber => subscriber.id !== id);
    };
    this.getAllPanConditions = () => {
      return this.subscriptions.map(subscriber => subscriber.getPanConditions());
    };
    this.setCursorClass = className => {
      var _this$eventCaptureRef;
      (_this$eventCaptureRef = this.eventCaptureRef.current) == null || _this$eventCaptureRef.setCursorClass(className);
    };
    this.amIOnTop = id => {
      const dragableComponents = this.subscriptions.filter(subscriber => subscriber.getPanConditions().draggable);
      return dragableComponents.length > 0 && (0, _utils.last)(dragableComponents).id === id;
    };
    this.handleContextMenu = (mouseXY, e) => {
      const {
          xAccessor,
          chartConfigs,
          plotData,
          xScale
        } = this.state,
        currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfigs, mouseXY),
        currentItem = (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData);
      this.triggerEvent("contextmenu", {
        mouseXY,
        currentItem,
        currentCharts
      }, e);
    };
    this.calculateStateForDomain = newDomain => {
      const {
          fullData,
          xAccessor,
          displayXAccessor,
          xScale: initialXScale,
          chartConfigs: initialChartConfig,
          plotData: initialPlotData,
          filterData
        } = this.state,
        {
          postCalculator
        } = this.props,
        {
          plotData: beforePlotData,
          domain
        } = filterData(fullData, newDomain, xAccessor, initialXScale, {
          currentPlotData: initialPlotData,
          currentDomain: initialXScale.domain()
        }),
        plotData = postCalculator(beforePlotData),
        updatedScale = initialXScale.copy().domain(domain),
        chartConfigs = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)(initialChartConfig, {
          plotData,
          xAccessor,
          displayXAccessor,
          fullData
        }, updatedScale.domain());
      return {
        xScale: updatedScale,
        plotData,
        chartConfigs
      };
    };
    this.pinchZoomHelper = (initialPinch, finalPinch) => {
      const {
          xScale: initialPinchXScale
        } = initialPinch,
        {
          fullData,
          xScale: initialXScale,
          chartConfigs: initialChartConfig,
          plotData: initialPlotData,
          xAccessor,
          displayXAccessor,
          filterData
        } = this.state,
        {
          postCalculator
        } = this.props,
        newDomain = _crPinchZoomNewDomain(initialPinch, finalPinch, initialPinchXScale),
        {
          plotData: beforePlotData,
          domain
        } = filterData(fullData, newDomain, xAccessor, initialPinchXScale, {
          currentPlotData: initialPlotData,
          currentDomain: initialXScale.domain()
        }),
        plotData = postCalculator(beforePlotData),
        updatedScale = initialXScale.copy().domain(domain),
        mouseXY = finalPinch.touch1Pos,
        chartConfigs = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)(initialChartConfig, {
          plotData,
          xAccessor,
          displayXAccessor,
          fullData
        }, updatedScale.domain()),
        currentItem = (0, _ChartDataUtil.getCurrentItem)(updatedScale, xAccessor, mouseXY, plotData);
      return {
        chartConfigs,
        xScale: updatedScale,
        plotData,
        mouseXY,
        currentItem
      };
    };
    this.handlePinchZoom = (initialPinch, finalPinch, e) => {
      if (!this.waitingForPinchZoomAnimationFrame) {
        this.waitingForPinchZoomAnimationFrame = true;
        const state = this.pinchZoomHelper(initialPinch, finalPinch);
        this.triggerEvent("pinchzoom", state, e);
        this.finalPinch = finalPinch;
        requestAnimationFrame(() => {
          this.clearBothCanvas();
          this.draw({
            trigger: "pinchzoom"
          });
          this.waitingForPinchZoomAnimationFrame = false;
        });
      }
    };
    this.handlePinchZoomEnd = (initialPinch, e) => {
      const {
        fullData,
        xAccessor = ChartCanvas.defaultProps.xAccessor
      } = this.state;
      if (this.finalPinch) {
        const state = this.pinchZoomHelper(initialPinch, this.finalPinch),
          {
            xScale
          } = state,
          {
            onLoadAfter,
            onLoadBefore
          } = this.props;
        this.triggerEvent("pinchzoom", state, e);
        this.finalPinch = void 0;
        this.clearThreeCanvas();
        this.setState(state, () => _callOnLoadHandlers(fullData, xScale, xAccessor, onLoadAfter, onLoadBefore));
      }
    };
    this._zoomXImpl = (plotData, chartConfigs, xScale, evtTriggerOptions, evt) => {
      this.triggerEvent("zoom", {
        xScale,
        plotData,
        chartConfigs,
        ...evtTriggerOptions,
        show: true
      }, evt);
      const {
          fullData,
          xAccessor
        } = this.state,
        {
          onZoom,
          onLoadAfter,
          onLoadBefore
        } = this.props;
      //this.clearThreeCanvas();

      onZoom((plotData || []).length);
      this._isDidUpdateRedraw = true;
      this.setState({
        xScale,
        plotData,
        chartConfigs
      }, () => _callOnLoadHandlers(fullData, xScale, xAccessor, onLoadAfter, onLoadBefore));
    };
    this.handleZoom = (zoomDirection, mouseXY, evt) => {
      if (this.panInProgress) {
        return;
      }
      const {
          xAccessor,
          xScale: initialXScale,
          plotData: initialPlotData
        } = this.state,
        {
          zoomMultiplier,
          zoomAnchor
        } = this.props,
        item = zoomAnchor({
          xScale: initialXScale,
          xAccessor: xAccessor,
          mouseXY,
          plotData: initialPlotData
        }),
        c = _crZoomDirection(zoomDirection, zoomMultiplier),
        newDomain = _crNewDomain(initialXScale, item, c),
        {
          xScale,
          plotData,
          chartConfigs
        } = this.calculateStateForDomain(newDomain);
      this.mutableState = {
        mouseXY,
        currentItem: (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData),
        currentCharts: (0, _ChartDataUtil.getCurrentCharts)(chartConfigs, mouseXY)
      };
      this._zoomXImpl(plotData, chartConfigs, xScale, this.mutableState, evt);
    };
    this.xAxisZoom = newDomain => {
      const {
        xScale,
        plotData,
        chartConfigs
      } = this.calculateStateForDomain(newDomain);
      this._zoomXImpl(plotData, chartConfigs, xScale);
    };
    this.yAxisZoom = (chartId, newDomain) => {
      //this.clearThreeCanvas();
      this._isDidUpdateRedraw = true;
      this.setState({
        chartConfigs: _crYAxisZoomChartConfigs(this.state.chartConfigs, chartId, newDomain)
      });
    };
    this.draw = props => {
      this.subscriptions.forEach(subscriber => {
        if (subscriber.draw) {
          subscriber.draw(props);
        }
      });
    };
    this.redraw = () => {
      this.clearThreeCanvas();
      this.draw({
        force: true
      });
    };
    this.panHelper = (mouseXY, initialXScale, _ref, chartsToPan) => {
      let {
        dx,
        dy
      } = _ref;
      const {
          fullData,
          xAccessor,
          displayXAccessor,
          chartConfigs: initialChartConfig,
          filterData
        } = this.state,
        {
          postCalculator
        } = this.props,
        newDomain = initialXScale.range().map(x => x - dx).map(x => initialXScale.invert(x)),
        {
          plotData: beforePlotData,
          domain
        } = filterData(fullData, newDomain, xAccessor, initialXScale, {
          currentPlotData: this.hackyWayToStopPanBeyondBounds__plotData,
          currentDomain: this.hackyWayToStopPanBeyondBounds__domain,
          ignoreThresholds: true
        }),
        updatedScale = initialXScale.copy().domain(domain),
        plotData = postCalculator(beforePlotData),
        currentItem = (0, _ChartDataUtil.getCurrentItem)(updatedScale, xAccessor, mouseXY, plotData),
        chartConfigs = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)(initialChartConfig, {
          plotData,
          xAccessor,
          displayXAccessor,
          fullData
        }, updatedScale.domain(), dy, chartsToPan),
        currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfigs, mouseXY);
      return {
        xScale: updatedScale,
        plotData,
        chartConfigs,
        mouseXY,
        currentCharts,
        currentItem
      };
    };
    this.handlePan = (mousePosition, panStartXScale, dxdy, chartsToPan, e) => {
      if (!this.waitingForPanAnimationFrame) {
        var _this$hackyWayToStopP, _this$hackyWayToStopP2;
        this.waitingForPanAnimationFrame = true;
        this.hackyWayToStopPanBeyondBounds__plotData = (_this$hackyWayToStopP = this.hackyWayToStopPanBeyondBounds__plotData) != null ? _this$hackyWayToStopP : this.state.plotData;
        this.hackyWayToStopPanBeyondBounds__domain = (_this$hackyWayToStopP2 = this.hackyWayToStopPanBeyondBounds__domain) != null ? _this$hackyWayToStopP2 : this.state.xScale.domain();
        const newState = this.panHelper(mousePosition, panStartXScale, dxdy, chartsToPan);
        this.hackyWayToStopPanBeyondBounds__plotData = newState.plotData;
        this.hackyWayToStopPanBeyondBounds__domain = newState.xScale.domain();
        this.panInProgress = true;
        this.triggerEvent("pan", newState, e);
        this.mutableState = {
          mouseXY: newState.mouseXY,
          currentItem: newState.currentItem,
          currentCharts: newState.currentCharts
        };
        requestAnimationFrame(() => {
          this.waitingForPanAnimationFrame = false;
          this.clearBothCanvas();
          this.draw({
            trigger: "pan"
          });
        });
      }
    };
    this.handlePanEnd = (mousePosition, panStartXScale, dxdy, chartsToPan, e) => {
      const state = this.panHelper(mousePosition, panStartXScale, dxdy, chartsToPan),
        {
          xScale,
          plotData,
          chartConfigs
        } = state;
      this.hackyWayToStopPanBeyondBounds__plotData = null;
      this.hackyWayToStopPanBeyondBounds__domain = null;
      this.panInProgress = false;
      this.triggerEvent("panend", state, e);
      requestAnimationFrame(() => {
        const {
            fullData,
            xAccessor
          } = this.state,
          {
            onLoadAfter,
            onLoadBefore
          } = this.props;

        //this.clearThreeCanvas();
        this._isDidUpdateRedraw = true;
        this.setState({
          xScale,
          plotData,
          chartConfigs
        }, () => _callOnLoadHandlers(fullData, xScale, xAccessor, onLoadAfter, onLoadBefore));
      });
    };
    this.handleMouseDown = (_, __, e) => {
      this.triggerEvent("mousedown", this.mutableState, e);
    };
    this.handleMouseEnter = e => {
      this.triggerEvent("mouseenter", {
        show: true
      }, e);
    };
    this.handleMouseMove = (mouseXY, _, e) => {
      if (!this.waitingForMouseMoveAnimationFrame) {
        this.waitingForMouseMoveAnimationFrame = true;
        const {
          chartConfigs,
          plotData,
          xScale,
          xAccessor
        } = this.state;
        const currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfigs, mouseXY);
        const currentItem = (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData);
        this.triggerEvent("mousemove", {
          show: true,
          mouseXY,
          // prevMouseXY is used in interactive components
          prevMouseXY: this.prevMouseXY,
          currentItem,
          currentCharts
        }, e);
        this.prevMouseXY = mouseXY;
        this.mutableState = {
          mouseXY,
          currentItem,
          currentCharts
        };
        requestAnimationFrame(() => {
          this.clearMouseCanvas();
          this.draw({
            trigger: "mousemove"
          });
          this.waitingForMouseMoveAnimationFrame = false;
        });
      }
    };
    this.handleMouseLeave = e => {
      this.triggerEvent("mouseleave", {
        show: false
      }, e);
      this.clearMouseCanvas();
      this.draw({
        trigger: "mouseleave"
      });
    };
    this.handleDragStart = (_ref2, e) => {
      let {
        startPos
      } = _ref2;
      this.triggerEvent("dragstart", {
        startPos
      }, e);
    };
    this.handleDrag = (_ref3, e) => {
      let {
        startPos,
        mouseXY
      } = _ref3;
      const {
        chartConfigs,
        plotData,
        xScale,
        xAccessor
      } = this.state;
      const currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfigs, mouseXY);
      const currentItem = (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData);
      this.triggerEvent("drag", {
        startPos,
        mouseXY,
        currentItem,
        currentCharts
      }, e);
      this.mutableState = {
        mouseXY,
        currentItem,
        currentCharts
      };
      requestAnimationFrame(() => {
        this.clearMouseCanvas();
        this.draw({
          trigger: "drag"
        });
      });
    };
    this.handleDragEnd = (_ref4, e) => {
      let {
        mouseXY
      } = _ref4;
      this.triggerEvent("dragend", {
        mouseXY
      }, e);
      requestAnimationFrame(() => {
        this.clearMouseCanvas();
        this.draw({
          trigger: "dragend"
        });
      });
    };
    this.handleClick = (_, e) => {
      this.triggerEvent("click", this.mutableState, e);
      requestAnimationFrame(() => {
        this.clearMouseCanvas();
        this.draw({
          trigger: "click"
        });
      });
    };
    this.handleDoubleClick = (_, e) => {
      this.triggerEvent("dblclick", {}, e);
    };
    this.resetYDomain = chartId => {
      const {
        chartConfigs
      } = this.state;
      let changed = false;
      const newChartConfig = chartConfigs.map(each => {
        if ((chartId == null || each.id === chartId) && !(0, _utils.shallowEqual)(each.yScale.domain(), each.realYDomain)) {
          changed = true;
          return {
            ...each,
            yScale: each.yScale.domain(each.realYDomain),
            yPanEnabled: false
          };
        }
        return each;
      });
      if (changed) {
        this.clearThreeCanvas();
        this.setState({
          chartConfigs: newChartConfig
        });
      }
    };
    this.state = (0, _ChartCanvasFn.resetChart)(_props);
  }
  clearBothCanvas() {
    const {
      axes,
      mouseCoord
    } = this.getCanvasContexts() || {};
    if (axes && mouseCoord) {
      (0, _utils.clearCanvas)([axes, mouseCoord], this.props.ratio);
    }
  }
  clearMouseCanvas() {
    const {
      mouseCoord
    } = this.getCanvasContexts() || {};
    if (mouseCoord) {
      (0, _utils.clearCanvas)([mouseCoord], this.props.ratio);
    }
  }
  clearThreeCanvas() {
    const {
      axes,
      mouseCoord,
      bg
    } = this.getCanvasContexts() || {};
    if (axes && mouseCoord && bg) {
      (0, _utils.clearCanvas)([axes, mouseCoord, bg], this.props.ratio);
    }
  }
  cancelDrag() {
    var _this$eventCaptureRef2;
    (_this$eventCaptureRef2 = this.eventCaptureRef.current) == null || _this$eventCaptureRef2.cancelDrag();
    this.triggerEvent("dragcancel");
  }
  triggerEvent(type, props, e) {
    this.subscriptions.forEach(subscriber => {
      const state = {
        ...this.state,
        subscriptions: this.subscriptions
      };
      subscriber.listener(type, props, state, e);
    });
  }
  getContextValues() {
    const {
        margin,
        ratio
      } = this.props,
      {
        fullData,
        plotData,
        chartConfigs,
        xScale,
        xAccessor,
        displayXAccessor
      } = this.state,
      {
        width,
        height
      } = (0, _ChartCanvasFn.getDimensions)(this.props);
    return {
      chartId: -1,
      margin,
      ratio,
      plotData,
      chartConfigs,
      xScale,
      xAccessor,
      displayXAccessor,
      width,
      height,
      fullData: fullData || [],
      xAxisZoom: this.xAxisZoom,
      yAxisZoom: this.yAxisZoom,
      getCanvasContexts: this.getCanvasContexts,
      redraw: this.redraw,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
      generateSubscriptionId: this.generateSubscriptionId,
      getMutableState: this.getMutableState,
      amIOnTop: this.amIOnTop,
      setCursorClass: this.setCursorClass
    };
  }
  static getDerivedStateFromProps(nextProps, currentState) {
    const {
        recentProps = {},
        chartConfigs: initialChartConfig,
        plotData,
        xAccessor,
        xScale
      } = currentState,
      reset = (0, _ChartCanvasFn.shouldResetChart)(recentProps, nextProps),
      interaction = (0, _ChartCanvasFn.isInteractionEnabled)(xScale, xAccessor, plotData);
    let newState;
    if (!interaction || reset || !(0, _utils.shallowEqual)(recentProps.xExtents, nextProps.xExtents)) {
      // do reset
      newState = (0, _ChartCanvasFn.resetChart)(nextProps);
    } else {
      const [start, end] = xScale.domain(),
        prevLastItem = (0, _utils.last)(currentState.fullData),
        calculatedState = (0, _ChartCanvasFn.calculateFullData)(nextProps),
        {
          xAccessor
        } = calculatedState,
        previousX = xAccessor(prevLastItem),
        lastItemWasVisible = previousX <= end && previousX >= start;
      newState = (0, _ChartCanvasFn.updateChart)(calculatedState, xScale, nextProps, lastItemWasVisible, initialChartConfig);
    }
    return {
      ...newState,
      recentProps: nextProps
    };
  }
  componentDidUpdate(prevProps) {
    if (this._isDidUpdateRedraw) {
      this._isDidUpdateRedraw = false;
      this.redraw();
    } else if (prevProps !== this.props && !this.panInProgress) {
      clearTimeout(this._asyncRedrawId);
      this._asyncRedrawId = setTimeout(() => {
        this.redraw();
      }, 0);
    }
    if (prevProps.data !== this.props.data) {
      this.triggerEvent("dataupdated", {
        chartConfigs: this.state.chartConfigs,
        xScale: this.state.xScale,
        plotData: this.state.plotData
      });
    }
  }
  shouldComponentUpdate() {
    return !this.panInProgress;
  }
  render() {
    const {
        disableInteraction,
        disablePan,
        disableZoom,
        useCrossHairStyleCursor,
        height,
        width,
        margin,
        className,
        zIndex,
        defaultFocus,
        ratio,
        mouseMoveEvent,
        onClick,
        onDoubleClick,
        children
      } = this.props,
      {
        plotData,
        xScale,
        xAccessor,
        chartConfigs
      } = this.state,
      dimensions = (0, _ChartCanvasFn.getDimensions)(this.props),
      interaction = (0, _ChartCanvasFn.isInteractionEnabled)(xScale, xAccessor, plotData),
      cursorStyle = useCrossHairStyleCursor && interaction;

    /*eslint-disable jsx-a11y/click-events-have-key-events*/
    /*eslint-disable jsx-a11y/no-static-element-interactions*/
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ChartCanvasContext.Provider, {
      value: this.getContextValues(),
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: className,
        style: {
          position: "relative",
          width,
          height
        },
        onClick: onClick,
        onDoubleClick: onDoubleClick,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CanvasContainer.CanvasContainer, {
          refEl: this.canvasContainerRef,
          ratio: ratio,
          width: width,
          height: height,
          style: {
            height,
            zIndex,
            width
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
          className: className,
          width: width,
          height: height,
          style: {
            position: "absolute",
            zIndex: zIndex + 5
          },
          children: [(0, _ChartCanvasFn.getCursorStyle)(), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartCanvasDefs.default, {
            dimensions: dimensions,
            chartConfig: chartConfigs
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("g", {
            transform: "translate(" + (margin.left + 0.5) + ", " + (margin.top + 0.5) + ")",
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_EventCapture.EventCapture, {
              ref: this.eventCaptureRef,
              useCrossHairStyleCursor: cursorStyle,
              mouseMove: mouseMoveEvent && interaction,
              zoom: !disableZoom && interaction,
              pan: !disablePan && interaction,
              width: dimensions.width,
              height: dimensions.height,
              chartConfig: chartConfigs,
              xScale: xScale,
              xAccessor: xAccessor,
              focus: defaultFocus,
              disableInteraction: disableInteraction,
              getAllPanConditions: this.getAllPanConditions,
              onContextMenu: this.handleContextMenu,
              onClick: this.handleClick,
              onDoubleClick: this.handleDoubleClick,
              onMouseDown: this.handleMouseDown,
              onMouseMove: this.handleMouseMove,
              onMouseEnter: this.handleMouseEnter,
              onMouseLeave: this.handleMouseLeave,
              onDragStart: this.handleDragStart,
              onDrag: this.handleDrag,
              onDragComplete: this.handleDragEnd,
              onZoom: this.handleZoom,
              onPinchZoom: this.handlePinchZoom,
              onPinchZoomEnd: this.handlePinchZoomEnd,
              onPan: this.handlePan,
              onPanEnd: this.handlePanEnd
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
              className: _CL.CL_AVOID_INTERACTION,
              children: children
            })]
          })]
        })]
      })
    });
    /*eslint-enable jsx-a11y/no-static-element-interactions*/
    /*eslint-enable jsx-a11y/click-events-have-key-events */
  }
}
exports.ChartCanvas = ChartCanvas;
ChartCanvas.defaultProps = {
  clamp: false,
  className: _CL.CL_CHARTS,
  defaultFocus: true,
  disablePan: false,
  disableInteraction: false,
  disableZoom: false,
  flipXScale: false,
  maintainPointsPerPixelOnResize: true,
  margin: {
    top: 0,
    right: 40,
    bottom: 40,
    left: 0
  },
  minPointsPerPxThreshold: 1 / 100,
  mouseMoveEvent: true,
  postCalculator: _utils.identity,
  padding: 0,
  pointsPerPxThreshold: 2,
  useCrossHairStyleCursor: true,
  xAccessor: _utils.identity,
  xExtents: [_d3Array.min, _d3Array.max],
  zIndex: 1,
  zoomAnchor: _zoomBehavior.mouseBasedZoomAnchor,
  zoomMultiplier: 1.1,
  onZoom: FN_NOOP
};
//# sourceMappingURL=ChartCanvas.js.map