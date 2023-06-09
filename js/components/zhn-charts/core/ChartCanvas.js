"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.dfChartCanvasContextValue = exports.ChartCanvasContext = exports.ChartCanvas = void 0;
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _uiApi = require("../../uiApi");
var _d3Array = require("../d3Array");
var _utils = require("./utils");
var _zoomBehavior = require("./zoom/zoomBehavior");
var _ChartDataUtil = require("./utils/ChartDataUtil");
var _EventCapture = require("./EventCapture");
var _CanvasContainer = require("./CanvasContainer");
var _ChartCanvasDefs = _interopRequireDefault(require("./ChartCanvasDefs"));
var _ChartCanvasFn = require("./ChartCanvasFn");
var _CL = require("../CL");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types';

var _callOnLoadHandlers = function _callOnLoadHandlers(fullData, xScale, xAccessor, onLoadAfter, onLoadBefore) {
  var firstItem = (0, _utils.head)(fullData),
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
var _crZoomDirection = function _crZoomDirection(zoomDirection, zoomMultiplier) {
  return zoomDirection > 0 ? 1 * zoomMultiplier : 1 / zoomMultiplier;
};
var _crNewDomain = function _crNewDomain(initialXScale, item, c) {
  var cx = initialXScale(item);
  return initialXScale.range().map(function (x) {
    return cx + (x - cx) * c;
  }).map(function (x) {
    return initialXScale.invert(x);
  });
};
var _crPinchZoomNewDomain = function _crPinchZoomNewDomain(initialPinch, finalPinch, initialPinchXScale) {
  var _pinchCoordinates = (0, _ChartCanvasFn.pinchCoordinates)(initialPinch),
    iTL = _pinchCoordinates.topLeft,
    iBR = _pinchCoordinates.bottomRight,
    _pinchCoordinates2 = (0, _ChartCanvasFn.pinchCoordinates)(finalPinch),
    fTL = _pinchCoordinates2.topLeft,
    fBR = _pinchCoordinates2.bottomRight,
    e = initialPinchXScale.range()[1],
    xDash = Math.round(-(iBR[0] * fTL[0] - iTL[0] * fBR[0]) / (iTL[0] - iBR[0])),
    yDash = Math.round(e + ((e - iBR[0]) * (e - fTL[0]) - (e - iTL[0]) * (e - fBR[0])) / (e - iTL[0] - (e - iBR[0]))),
    x = Math.round(-xDash * iTL[0] / (-xDash + fTL[0])),
    y = Math.round(e - (yDash - e) * (e - iTL[0]) / (yDash + (e - fTL[0])));
  return [x, y].map(initialPinchXScale.invert);
};
var FN_NOOP = function FN_NOOP() {};
var dfChartCanvasContextValue = {
  amIOnTop: function amIOnTop() {
    return false;
  },
  chartConfigs: [],
  chartId: 0,
  displayXAccessor: function displayXAccessor() {
    return 0;
  },
  fullData: [],
  getMutableState: function getMutableState() {
    return {};
  },
  height: 0,
  margin: {},
  plotData: [],
  setCursorClass: FN_NOOP,
  subscribe: FN_NOOP,
  unsubscribe: FN_NOOP,
  width: 0,
  xAccessor: function xAccessor() {
    return 0;
  },
  xScale: FN_NOOP
};
exports.dfChartCanvasContextValue = dfChartCanvasContextValue;
var ChartCanvasContext = (0, _uiApi.createContext)(dfChartCanvasContextValue);
exports.ChartCanvasContext = ChartCanvasContext;
var _crYAxisZoomChartConfigs = function _crYAxisZoomChartConfigs(chartConfigs, chartId, newDomain) {
  return chartConfigs.map(function (each) {
    return each.id === chartId ? (0, _extends2["default"])({}, each, {
      yScale: each.yScale.copy().domain(newDomain),
      yPanEnabled: true
    }) : each;
  });
};
var ChartCanvas = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ChartCanvas, _Component);
  function ChartCanvas(_props) {
    var _this;
    _this = _Component.call(this, _props) || this;
    _this.canvasContainerRef = (0, _uiApi.createRef)();
    _this.eventCaptureRef = (0, _uiApi.createRef)();
    _this.finalPinch = void 0;
    _this.lastSubscriptionId = 0;
    _this.mutableState = {};
    _this.panInProgress = false;
    _this.prevMouseXY = void 0;
    _this._isDidUpdateRedraw = false;
    _this._asyncRedrawId = void 0;
    _this.subscriptions = [];
    _this.waitingForPinchZoomAnimationFrame = void 0;
    _this.waitingForPanAnimationFrame = void 0;
    _this.waitingForMouseMoveAnimationFrame = void 0;
    _this.hackyWayToStopPanBeyondBounds__plotData = void 0;
    _this.hackyWayToStopPanBeyondBounds__domain = void 0;
    _this.getMutableState = function () {
      return _this.mutableState;
    };
    _this.getCanvasContexts = function () {
      var _this$canvasContainer;
      return (_this$canvasContainer = _this.canvasContainerRef.current) == null ? void 0 : _this$canvasContainer.getCanvasContexts();
    };
    _this.generateSubscriptionId = function () {
      _this.lastSubscriptionId++;
      return _this.lastSubscriptionId;
    };
    _this.subscribe = function (id, rest) {
      var _rest$getPanCondition = rest.getPanConditions,
        getPanConditions = _rest$getPanCondition === void 0 ? (0, _utils.functor)({
          draggable: false,
          panEnabled: true
        }) : _rest$getPanCondition;
      _this.subscriptions = _this.subscriptions.concat((0, _extends2["default"])({
        id: id
      }, rest, {
        getPanConditions: getPanConditions
      }));
    };
    _this.unsubscribe = function (id) {
      _this.subscriptions = _this.subscriptions.filter(function (subscriber) {
        return subscriber.id !== id;
      });
    };
    _this.getAllPanConditions = function () {
      return _this.subscriptions.map(function (subscriber) {
        return subscriber.getPanConditions();
      });
    };
    _this.setCursorClass = function (className) {
      var _this$eventCaptureRef;
      (_this$eventCaptureRef = _this.eventCaptureRef.current) == null ? void 0 : _this$eventCaptureRef.setCursorClass(className);
    };
    _this.amIOnTop = function (id) {
      var dragableComponents = _this.subscriptions.filter(function (subscriber) {
        return subscriber.getPanConditions().draggable;
      });
      return dragableComponents.length > 0 && (0, _utils.last)(dragableComponents).id === id;
    };
    _this.handleContextMenu = function (mouseXY, e) {
      var _this$state = _this.state,
        xAccessor = _this$state.xAccessor,
        chartConfigs = _this$state.chartConfigs,
        plotData = _this$state.plotData,
        xScale = _this$state.xScale,
        currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfigs, mouseXY),
        currentItem = (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData);
      _this.triggerEvent("contextmenu", {
        mouseXY: mouseXY,
        currentItem: currentItem,
        currentCharts: currentCharts
      }, e);
    };
    _this.calculateStateForDomain = function (newDomain) {
      var _this$state2 = _this.state,
        fullData = _this$state2.fullData,
        xAccessor = _this$state2.xAccessor,
        displayXAccessor = _this$state2.displayXAccessor,
        initialXScale = _this$state2.xScale,
        initialChartConfig = _this$state2.chartConfigs,
        initialPlotData = _this$state2.plotData,
        filterData = _this$state2.filterData,
        postCalculator = _this.props.postCalculator,
        _filterData = filterData(fullData, newDomain, xAccessor, initialXScale, {
          currentPlotData: initialPlotData,
          currentDomain: initialXScale.domain()
        }),
        beforePlotData = _filterData.plotData,
        domain = _filterData.domain,
        plotData = postCalculator(beforePlotData),
        updatedScale = initialXScale.copy().domain(domain),
        chartConfigs = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)(initialChartConfig, {
          plotData: plotData,
          xAccessor: xAccessor,
          displayXAccessor: displayXAccessor,
          fullData: fullData
        }, updatedScale.domain());
      return {
        xScale: updatedScale,
        plotData: plotData,
        chartConfigs: chartConfigs
      };
    };
    _this.pinchZoomHelper = function (initialPinch, finalPinch) {
      var initialPinchXScale = initialPinch.xScale,
        _this$state3 = _this.state,
        fullData = _this$state3.fullData,
        initialXScale = _this$state3.xScale,
        initialChartConfig = _this$state3.chartConfigs,
        initialPlotData = _this$state3.plotData,
        xAccessor = _this$state3.xAccessor,
        displayXAccessor = _this$state3.displayXAccessor,
        filterData = _this$state3.filterData,
        postCalculator = _this.props.postCalculator,
        newDomain = _crPinchZoomNewDomain(initialPinch, finalPinch, initialPinchXScale),
        _filterData2 = filterData(fullData, newDomain, xAccessor, initialPinchXScale, {
          currentPlotData: initialPlotData,
          currentDomain: initialXScale.domain()
        }),
        beforePlotData = _filterData2.plotData,
        domain = _filterData2.domain,
        plotData = postCalculator(beforePlotData),
        updatedScale = initialXScale.copy().domain(domain),
        mouseXY = finalPinch.touch1Pos,
        chartConfigs = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)(initialChartConfig, {
          plotData: plotData,
          xAccessor: xAccessor,
          displayXAccessor: displayXAccessor,
          fullData: fullData
        }, updatedScale.domain()),
        currentItem = (0, _ChartDataUtil.getCurrentItem)(updatedScale, xAccessor, mouseXY, plotData);
      return {
        chartConfigs: chartConfigs,
        xScale: updatedScale,
        plotData: plotData,
        mouseXY: mouseXY,
        currentItem: currentItem
      };
    };
    _this.handlePinchZoom = function (initialPinch, finalPinch, e) {
      if (!_this.waitingForPinchZoomAnimationFrame) {
        _this.waitingForPinchZoomAnimationFrame = true;
        var state = _this.pinchZoomHelper(initialPinch, finalPinch);
        _this.triggerEvent("pinchzoom", state, e);
        _this.finalPinch = finalPinch;
        requestAnimationFrame(function () {
          _this.clearBothCanvas();
          _this.draw({
            trigger: "pinchzoom"
          });
          _this.waitingForPinchZoomAnimationFrame = false;
        });
      }
    };
    _this.handlePinchZoomEnd = function (initialPinch, e) {
      var _this$state4 = _this.state,
        fullData = _this$state4.fullData,
        _this$state4$xAccesso = _this$state4.xAccessor,
        xAccessor = _this$state4$xAccesso === void 0 ? ChartCanvas.defaultProps.xAccessor : _this$state4$xAccesso;
      if (_this.finalPinch) {
        var state = _this.pinchZoomHelper(initialPinch, _this.finalPinch),
          xScale = state.xScale,
          _this$props = _this.props,
          onLoadAfter = _this$props.onLoadAfter,
          onLoadBefore = _this$props.onLoadBefore;
        _this.triggerEvent("pinchzoom", state, e);
        _this.finalPinch = void 0;
        _this.clearThreeCanvas();
        _this.setState(state, function () {
          return _callOnLoadHandlers(fullData, xScale, xAccessor, onLoadAfter, onLoadBefore);
        });
      }
    };
    _this._zoomXImpl = function (plotData, chartConfigs, xScale, evtTriggerOptions, evt) {
      _this.triggerEvent("zoom", (0, _extends2["default"])({
        xScale: xScale,
        plotData: plotData,
        chartConfigs: chartConfigs
      }, evtTriggerOptions, {
        show: true
      }), evt);
      var _this$state5 = _this.state,
        fullData = _this$state5.fullData,
        xAccessor = _this$state5.xAccessor,
        _this$props2 = _this.props,
        onZoom = _this$props2.onZoom,
        onLoadAfter = _this$props2.onLoadAfter,
        onLoadBefore = _this$props2.onLoadBefore;
      //this.clearThreeCanvas();

      onZoom((plotData || []).length);
      _this._isDidUpdateRedraw = true;
      _this.setState({
        xScale: xScale,
        plotData: plotData,
        chartConfigs: chartConfigs
      }, function () {
        return _callOnLoadHandlers(fullData, xScale, xAccessor, onLoadAfter, onLoadBefore);
      });
    };
    _this.handleZoom = function (zoomDirection, mouseXY, evt) {
      if (_this.panInProgress) {
        return;
      }
      var _this$state6 = _this.state,
        xAccessor = _this$state6.xAccessor,
        initialXScale = _this$state6.xScale,
        initialPlotData = _this$state6.plotData,
        _this$props3 = _this.props,
        zoomMultiplier = _this$props3.zoomMultiplier,
        zoomAnchor = _this$props3.zoomAnchor,
        item = zoomAnchor({
          xScale: initialXScale,
          xAccessor: xAccessor,
          mouseXY: mouseXY,
          plotData: initialPlotData
        }),
        c = _crZoomDirection(zoomDirection, zoomMultiplier),
        newDomain = _crNewDomain(initialXScale, item, c),
        _this$calculateStateF = _this.calculateStateForDomain(newDomain),
        xScale = _this$calculateStateF.xScale,
        plotData = _this$calculateStateF.plotData,
        chartConfigs = _this$calculateStateF.chartConfigs;
      _this.mutableState = {
        mouseXY: mouseXY,
        currentItem: (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData),
        currentCharts: (0, _ChartDataUtil.getCurrentCharts)(chartConfigs, mouseXY)
      };
      _this._zoomXImpl(plotData, chartConfigs, xScale, _this.mutableState, evt);
    };
    _this.xAxisZoom = function (newDomain) {
      var _this$calculateStateF2 = _this.calculateStateForDomain(newDomain),
        xScale = _this$calculateStateF2.xScale,
        plotData = _this$calculateStateF2.plotData,
        chartConfigs = _this$calculateStateF2.chartConfigs;
      _this._zoomXImpl(plotData, chartConfigs, xScale);
    };
    _this.yAxisZoom = function (chartId, newDomain) {
      //this.clearThreeCanvas();
      _this._isDidUpdateRedraw = true;
      _this.setState({
        chartConfigs: _crYAxisZoomChartConfigs(_this.state.chartConfigs, chartId, newDomain)
      });
    };
    _this.draw = function (props) {
      _this.subscriptions.forEach(function (subscriber) {
        if (subscriber.draw) {
          subscriber.draw(props);
        }
      });
    };
    _this.redraw = function () {
      _this.clearThreeCanvas();
      _this.draw({
        force: true
      });
    };
    _this.panHelper = function (mouseXY, initialXScale, _ref, chartsToPan) {
      var dx = _ref.dx,
        dy = _ref.dy;
      var _this$state7 = _this.state,
        fullData = _this$state7.fullData,
        xAccessor = _this$state7.xAccessor,
        displayXAccessor = _this$state7.displayXAccessor,
        initialChartConfig = _this$state7.chartConfigs,
        filterData = _this$state7.filterData,
        postCalculator = _this.props.postCalculator,
        newDomain = initialXScale.range().map(function (x) {
          return x - dx;
        }).map(function (x) {
          return initialXScale.invert(x);
        }),
        _filterData3 = filterData(fullData, newDomain, xAccessor, initialXScale, {
          currentPlotData: _this.hackyWayToStopPanBeyondBounds__plotData,
          currentDomain: _this.hackyWayToStopPanBeyondBounds__domain,
          ignoreThresholds: true
        }),
        beforePlotData = _filterData3.plotData,
        domain = _filterData3.domain,
        updatedScale = initialXScale.copy().domain(domain),
        plotData = postCalculator(beforePlotData),
        currentItem = (0, _ChartDataUtil.getCurrentItem)(updatedScale, xAccessor, mouseXY, plotData),
        chartConfigs = (0, _ChartDataUtil.getChartConfigWithUpdatedYScales)(initialChartConfig, {
          plotData: plotData,
          xAccessor: xAccessor,
          displayXAccessor: displayXAccessor,
          fullData: fullData
        }, updatedScale.domain(), dy, chartsToPan),
        currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfigs, mouseXY);
      return {
        xScale: updatedScale,
        plotData: plotData,
        chartConfigs: chartConfigs,
        mouseXY: mouseXY,
        currentCharts: currentCharts,
        currentItem: currentItem
      };
    };
    _this.handlePan = function (mousePosition, panStartXScale, dxdy, chartsToPan, e) {
      if (!_this.waitingForPanAnimationFrame) {
        var _this$hackyWayToStopP, _this$hackyWayToStopP2;
        _this.waitingForPanAnimationFrame = true;
        _this.hackyWayToStopPanBeyondBounds__plotData = (_this$hackyWayToStopP = _this.hackyWayToStopPanBeyondBounds__plotData) != null ? _this$hackyWayToStopP : _this.state.plotData;
        _this.hackyWayToStopPanBeyondBounds__domain = (_this$hackyWayToStopP2 = _this.hackyWayToStopPanBeyondBounds__domain) != null ? _this$hackyWayToStopP2 : _this.state.xScale.domain();
        var newState = _this.panHelper(mousePosition, panStartXScale, dxdy, chartsToPan);
        _this.hackyWayToStopPanBeyondBounds__plotData = newState.plotData;
        _this.hackyWayToStopPanBeyondBounds__domain = newState.xScale.domain();
        _this.panInProgress = true;
        _this.triggerEvent("pan", newState, e);
        _this.mutableState = {
          mouseXY: newState.mouseXY,
          currentItem: newState.currentItem,
          currentCharts: newState.currentCharts
        };
        requestAnimationFrame(function () {
          _this.waitingForPanAnimationFrame = false;
          _this.clearBothCanvas();
          _this.draw({
            trigger: "pan"
          });
        });
      }
    };
    _this.handlePanEnd = function (mousePosition, panStartXScale, dxdy, chartsToPan, e) {
      var state = _this.panHelper(mousePosition, panStartXScale, dxdy, chartsToPan),
        xScale = state.xScale,
        plotData = state.plotData,
        chartConfigs = state.chartConfigs;
      _this.hackyWayToStopPanBeyondBounds__plotData = null;
      _this.hackyWayToStopPanBeyondBounds__domain = null;
      _this.panInProgress = false;
      _this.triggerEvent("panend", state, e);
      requestAnimationFrame(function () {
        var _this$state8 = _this.state,
          fullData = _this$state8.fullData,
          xAccessor = _this$state8.xAccessor,
          _this$props4 = _this.props,
          onLoadAfter = _this$props4.onLoadAfter,
          onLoadBefore = _this$props4.onLoadBefore;

        //this.clearThreeCanvas();
        _this._isDidUpdateRedraw = true;
        _this.setState({
          xScale: xScale,
          plotData: plotData,
          chartConfigs: chartConfigs
        }, function () {
          return _callOnLoadHandlers(fullData, xScale, xAccessor, onLoadAfter, onLoadBefore);
        });
      });
    };
    _this.handleMouseDown = function (_, __, e) {
      _this.triggerEvent("mousedown", _this.mutableState, e);
    };
    _this.handleMouseEnter = function (e) {
      _this.triggerEvent("mouseenter", {
        show: true
      }, e);
    };
    _this.handleMouseMove = function (mouseXY, _, e) {
      if (!_this.waitingForMouseMoveAnimationFrame) {
        _this.waitingForMouseMoveAnimationFrame = true;
        var _this$state9 = _this.state,
          chartConfigs = _this$state9.chartConfigs,
          plotData = _this$state9.plotData,
          xScale = _this$state9.xScale,
          xAccessor = _this$state9.xAccessor;
        var currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfigs, mouseXY);
        var currentItem = (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData);
        _this.triggerEvent("mousemove", {
          show: true,
          mouseXY: mouseXY,
          // prevMouseXY is used in interactive components
          prevMouseXY: _this.prevMouseXY,
          currentItem: currentItem,
          currentCharts: currentCharts
        }, e);
        _this.prevMouseXY = mouseXY;
        _this.mutableState = {
          mouseXY: mouseXY,
          currentItem: currentItem,
          currentCharts: currentCharts
        };
        requestAnimationFrame(function () {
          _this.clearMouseCanvas();
          _this.draw({
            trigger: "mousemove"
          });
          _this.waitingForMouseMoveAnimationFrame = false;
        });
      }
    };
    _this.handleMouseLeave = function (e) {
      _this.triggerEvent("mouseleave", {
        show: false
      }, e);
      _this.clearMouseCanvas();
      _this.draw({
        trigger: "mouseleave"
      });
    };
    _this.handleDragStart = function (_ref2, e) {
      var startPos = _ref2.startPos;
      _this.triggerEvent("dragstart", {
        startPos: startPos
      }, e);
    };
    _this.handleDrag = function (_ref3, e) {
      var startPos = _ref3.startPos,
        mouseXY = _ref3.mouseXY;
      var _this$state10 = _this.state,
        chartConfigs = _this$state10.chartConfigs,
        plotData = _this$state10.plotData,
        xScale = _this$state10.xScale,
        xAccessor = _this$state10.xAccessor;
      var currentCharts = (0, _ChartDataUtil.getCurrentCharts)(chartConfigs, mouseXY);
      var currentItem = (0, _ChartDataUtil.getCurrentItem)(xScale, xAccessor, mouseXY, plotData);
      _this.triggerEvent("drag", {
        startPos: startPos,
        mouseXY: mouseXY,
        currentItem: currentItem,
        currentCharts: currentCharts
      }, e);
      _this.mutableState = {
        mouseXY: mouseXY,
        currentItem: currentItem,
        currentCharts: currentCharts
      };
      requestAnimationFrame(function () {
        _this.clearMouseCanvas();
        _this.draw({
          trigger: "drag"
        });
      });
    };
    _this.handleDragEnd = function (_ref4, e) {
      var mouseXY = _ref4.mouseXY;
      _this.triggerEvent("dragend", {
        mouseXY: mouseXY
      }, e);
      requestAnimationFrame(function () {
        _this.clearMouseCanvas();
        _this.draw({
          trigger: "dragend"
        });
      });
    };
    _this.handleClick = function (_, e) {
      _this.triggerEvent("click", _this.mutableState, e);
      requestAnimationFrame(function () {
        _this.clearMouseCanvas();
        _this.draw({
          trigger: "click"
        });
      });
    };
    _this.handleDoubleClick = function (_, e) {
      _this.triggerEvent("dblclick", {}, e);
    };
    _this.resetYDomain = function (chartId) {
      var chartConfigs = _this.state.chartConfigs;
      var changed = false;
      var newChartConfig = chartConfigs.map(function (each) {
        if ((chartId == null || each.id === chartId) && !(0, _utils.shallowEqual)(each.yScale.domain(), each.realYDomain)) {
          changed = true;
          return (0, _extends2["default"])({}, each, {
            yScale: each.yScale.domain(each.realYDomain),
            yPanEnabled: false
          });
        }
        return each;
      });
      if (changed) {
        _this.clearThreeCanvas();
        _this.setState({
          chartConfigs: newChartConfig
        });
      }
    };
    _this.state = (0, _ChartCanvasFn.resetChart)(_props);
    return _this;
  }
  var _proto = ChartCanvas.prototype;
  _proto.clearBothCanvas = function clearBothCanvas() {
    var _ref5 = this.getCanvasContexts() || {},
      axes = _ref5.axes,
      mouseCoord = _ref5.mouseCoord;
    if (axes && mouseCoord) {
      (0, _utils.clearCanvas)([axes, mouseCoord], this.props.ratio);
    }
  };
  _proto.clearMouseCanvas = function clearMouseCanvas() {
    var _ref6 = this.getCanvasContexts() || {},
      mouseCoord = _ref6.mouseCoord;
    if (mouseCoord) {
      (0, _utils.clearCanvas)([mouseCoord], this.props.ratio);
    }
  };
  _proto.clearThreeCanvas = function clearThreeCanvas() {
    var _ref7 = this.getCanvasContexts() || {},
      axes = _ref7.axes,
      mouseCoord = _ref7.mouseCoord,
      bg = _ref7.bg;
    if (axes && mouseCoord && bg) {
      (0, _utils.clearCanvas)([axes, mouseCoord, bg], this.props.ratio);
    }
  };
  _proto.cancelDrag = function cancelDrag() {
    var _this$eventCaptureRef2;
    (_this$eventCaptureRef2 = this.eventCaptureRef.current) == null ? void 0 : _this$eventCaptureRef2.cancelDrag();
    this.triggerEvent("dragcancel");
  };
  _proto.triggerEvent = function triggerEvent(type, props, e) {
    var _this2 = this;
    this.subscriptions.forEach(function (subscriber) {
      var state = (0, _extends2["default"])({}, _this2.state, {
        subscriptions: _this2.subscriptions
      });
      subscriber.listener(type, props, state, e);
    });
  };
  _proto.getContextValues = function getContextValues() {
    var _this$props5 = this.props,
      margin = _this$props5.margin,
      ratio = _this$props5.ratio,
      _this$state11 = this.state,
      fullData = _this$state11.fullData,
      plotData = _this$state11.plotData,
      chartConfigs = _this$state11.chartConfigs,
      xScale = _this$state11.xScale,
      xAccessor = _this$state11.xAccessor,
      displayXAccessor = _this$state11.displayXAccessor,
      _getDimensions = (0, _ChartCanvasFn.getDimensions)(this.props),
      width = _getDimensions.width,
      height = _getDimensions.height;
    return {
      chartId: -1,
      margin: margin,
      ratio: ratio,
      plotData: plotData,
      chartConfigs: chartConfigs,
      xScale: xScale,
      xAccessor: xAccessor,
      displayXAccessor: displayXAccessor,
      width: width,
      height: height,
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
  };
  ChartCanvas.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, currentState) {
    var _currentState$recentP = currentState.recentProps,
      recentProps = _currentState$recentP === void 0 ? {} : _currentState$recentP,
      initialChartConfig = currentState.chartConfigs,
      plotData = currentState.plotData,
      xAccessor = currentState.xAccessor,
      xScale = currentState.xScale,
      reset = (0, _ChartCanvasFn.shouldResetChart)(recentProps, nextProps),
      interaction = (0, _ChartCanvasFn.isInteractionEnabled)(xScale, xAccessor, plotData);
    var newState;
    if (!interaction || reset || !(0, _utils.shallowEqual)(recentProps.xExtents, nextProps.xExtents)) {
      // do reset
      newState = (0, _ChartCanvasFn.resetChart)(nextProps);
    } else {
      var _xScale$domain = xScale.domain(),
        start = _xScale$domain[0],
        end = _xScale$domain[1],
        prevLastItem = (0, _utils.last)(currentState.fullData),
        calculatedState = (0, _ChartCanvasFn.calculateFullData)(nextProps),
        _xAccessor = calculatedState.xAccessor,
        previousX = _xAccessor(prevLastItem),
        lastItemWasVisible = previousX <= end && previousX >= start;
      newState = (0, _ChartCanvasFn.updateChart)(calculatedState, xScale, nextProps, lastItemWasVisible, initialChartConfig);
    }
    return (0, _extends2["default"])({}, newState, {
      recentProps: nextProps
    });
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this3 = this;
    if (this._isDidUpdateRedraw) {
      this._isDidUpdateRedraw = false;
      this.redraw();
    } else if (prevProps !== this.props && !this.panInProgress) {
      clearTimeout(this._asyncRedrawId);
      this._asyncRedrawId = setTimeout(function () {
        _this3.redraw();
      }, 0);
    }
    if (prevProps.data !== this.props.data) {
      this.triggerEvent("dataupdated", {
        chartConfigs: this.state.chartConfigs,
        xScale: this.state.xScale,
        plotData: this.state.plotData
      });
    }
  };
  _proto.shouldComponentUpdate = function shouldComponentUpdate() {
    return !this.panInProgress;
  };
  _proto.render = function render() {
    var _this$props6 = this.props,
      disableInteraction = _this$props6.disableInteraction,
      disablePan = _this$props6.disablePan,
      disableZoom = _this$props6.disableZoom,
      useCrossHairStyleCursor = _this$props6.useCrossHairStyleCursor,
      height = _this$props6.height,
      width = _this$props6.width,
      margin = _this$props6.margin,
      className = _this$props6.className,
      zIndex = _this$props6.zIndex,
      defaultFocus = _this$props6.defaultFocus,
      ratio = _this$props6.ratio,
      mouseMoveEvent = _this$props6.mouseMoveEvent,
      onClick = _this$props6.onClick,
      onDoubleClick = _this$props6.onDoubleClick,
      children = _this$props6.children,
      _this$state12 = this.state,
      plotData = _this$state12.plotData,
      xScale = _this$state12.xScale,
      xAccessor = _this$state12.xAccessor,
      chartConfigs = _this$state12.chartConfigs,
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
          width: width,
          height: height
        },
        onClick: onClick,
        onDoubleClick: onDoubleClick,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CanvasContainer.CanvasContainer, {
          ref: this.canvasContainerRef,
          ratio: ratio,
          width: width,
          height: height,
          style: {
            height: height,
            zIndex: zIndex,
            width: width
          }
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
          className: className,
          width: width,
          height: height,
          style: {
            position: "absolute",
            zIndex: zIndex + 5
          },
          children: [(0, _ChartCanvasFn.getCursorStyle)(), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartCanvasDefs["default"], {
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
  };
  return ChartCanvas;
}(_uiApi.Component);
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