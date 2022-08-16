import PropTypes from 'prop-types';
import { max, min } from 'd3-array';
import React from 'react';

import {
  clearCanvas,
  functor,
  head,
  identity,
  isDefined,
  isNotDefined,
  last,
  shallowEqual
} from "./utils";
import {
  mouseBasedZoomAnchor
} from "./zoom/zoomBehavior";
import {
  getChartConfigWithUpdatedYScales,
  getCurrentCharts,
  getCurrentItem
} from "./utils/ChartDataUtil";
import { EventCapture } from "./EventCapture";
import { CanvasContainer } from "./CanvasContainer";
import ChartCanvasDefs from './ChartCanvasDefs';

import {
  shouldResetChart,
  getCursorStyle,
  getDimensions,
  calculateFullData,
  resetChart,
  updateChart,
  pinchCoordinates,
  isInteractionEnabled
} from './ChartCanvasFn';

import {
  CL_CHARTS,
  CL_AVOID_INTERACTION
} from '../CL';

const _callOnLoadHandlers = (
  fullData,
  xScale,
  xAccessor,
  onLoadAfter,
  onLoadBefore
) => {
  const firstItem = head(fullData)
  , scale_start = head(xScale.domain())
  , data_start = xAccessor(firstItem)
  , lastItem = last(fullData)
  , scale_end = last(xScale.domain())
  , data_end = xAccessor(lastItem);

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
}

const _crZoomDirection = (
  zoomDirection,
  zoomMultiplier
) => zoomDirection > 0
  ? 1 * zoomMultiplier
  : 1 / zoomMultiplier;

const _crNewDomain = (
  initialXScale,
  item,
  c
) => {
const cx = initialXScale(item)
return initialXScale
  .range()
  .map((x) => cx + (x - cx) * c)
  .map((x) => initialXScale.invert(x));
}

const _crPinchZoomNewDomain = (
  initialPinch,
  finalPinch,
  initialPinchXScale
) => {
   const {
     topLeft: iTL,
     bottomRight: iBR
   } = pinchCoordinates(initialPinch)
   , {
     topLeft: fTL,
     bottomRight: fBR
   } = pinchCoordinates(finalPinch)
   , e = initialPinchXScale.range()[1]
   , xDash = Math.round(-(iBR[0] * fTL[0] - iTL[0] * fBR[0]) / (iTL[0] - iBR[0]))
   , yDash = Math.round(e + ((e - iBR[0]) * (e - fTL[0]) - (e - iTL[0]) * (e - fBR[0])) / (e - iTL[0] - (e - iBR[0])))
   , x = Math.round((-xDash * iTL[0]) / (-xDash + fTL[0]))
   , y = Math.round(e - ((yDash - e) * (e - iTL[0])) / (yDash + (e - fTL[0])))
   return [x, y].map(initialPinchXScale.invert);
}

const FN_NOOP = () => {}


class ChartCanvas extends React.Component {
    static defaultProps = {
        clamp: false,
        className: CL_CHARTS,
        defaultFocus: true,
        disablePan: false,
        disableInteraction: false,
        disableZoom: false,
        flipXScale: false,
        maintainPointsPerPixelOnResize: true,
        margin: { top: 0, right: 40, bottom: 40, left: 0 },
        minPointsPerPxThreshold: 1 / 100,
        mouseMoveEvent: true,
        postCalculator: identity,
        padding: 0,
        pointsPerPxThreshold: 2,
        useCrossHairStyleCursor: true,
        xAccessor: identity,
        xExtents: [min, max],
        zIndex: 1,
        zoomAnchor: mouseBasedZoomAnchor,
        zoomMultiplier: 1.1,
        
        onZoom: FN_NOOP
    }

    static childContextTypes = {
        plotData: PropTypes.array,
        fullData: PropTypes.array,
        chartConfig: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            origin: PropTypes.arrayOf(PropTypes.number).isRequired,
            padding: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.shape({
                    top: PropTypes.number,
                    bottom: PropTypes.number,
                }),
            ]),
            yExtents: PropTypes.arrayOf(PropTypes.func),
            yExtentsProvider: PropTypes.func,
            yScale: PropTypes.func.isRequired,
            mouseCoordinates: PropTypes.shape({
                at: PropTypes.string,
                format: PropTypes.func,
            }),
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        })).isRequired,
        xScale: PropTypes.func.isRequired,
        xAccessor: PropTypes.func.isRequired,
        displayXAccessor: PropTypes.func.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: PropTypes.object.isRequired,
        ratio: PropTypes.number.isRequired,
        getCanvasContexts: PropTypes.func,
        xAxisZoom: PropTypes.func,
        yAxisZoom: PropTypes.func,
        amIOnTop: PropTypes.func,
        redraw: PropTypes.func,
        subscribe: PropTypes.func,
        unsubscribe: PropTypes.func,
        setCursorClass: PropTypes.func,
        generateSubscriptionId: PropTypes.func,
        getMutableState: PropTypes.func,
    }

    canvasContainerRef = React.createRef();
    eventCaptureRef = React.createRef();

    finalPinch;
    fullData;
    lastSubscriptionId = 0;
    mutableState = {};
    panInProgress = false;
    prevMouseXY;
    subscriptions = [];
    waitingForPinchZoomAnimationFrame;
    waitingForPanAnimationFrame;
    waitingForMouseMoveAnimationFrame;
    hackyWayToStopPanBeyondBounds__plotData;
    hackyWayToStopPanBeyondBounds__domain;

    constructor(props) {
      super(props);
      const { fullData, ...state } = resetChart(props);
      this.state = state;
      this.fullData = fullData;
    }

    getMutableState = () => {
      return this.mutableState;
    }

    getDataInfo = () => {
      return {
        ...this.state,
        fullData: this.fullData,
      };
    }

    getCanvasContexts = () => {
      return this.canvasContainerRef.current?.getCanvasContexts();
    }

    generateSubscriptionId = () => {
      this.lastSubscriptionId++;
      return this.lastSubscriptionId;
    }

    clearBothCanvas() {
      const {
        axes,
        mouseCoord
      } = this.getCanvasContexts() || {};
      if (axes && mouseCoord) {
        clearCanvas([axes, mouseCoord], this.props.ratio);
      }
    }

    clearMouseCanvas() {
      const {
        mouseCoord
      } = this.getCanvasContexts() || {};
      if (mouseCoord) {
        clearCanvas([mouseCoord], this.props.ratio);
      }
    }

    clearThreeCanvas() {
      const {
        axes,
        mouseCoord,
        bg
      } = this.getCanvasContexts() || {};
      if (axes && mouseCoord && bg) {
          clearCanvas([axes, mouseCoord, bg], this.props.ratio);
      }
    }

    subscribe = (id, rest) => {
        const {
          getPanConditions = functor({
            draggable: false,
            panEnabled: true
          })
        } = rest;
        this.subscriptions = this.subscriptions.concat({
          id,
          ...rest,
          getPanConditions
        });
    }

    unsubscribe = (id) => {
      this.subscriptions = this.subscriptions
        .filter(subscriber => subscriber.id !== id);
    }

    getAllPanConditions = () => {
      return this.subscriptions
        .map(subscriber => subscriber.getPanConditions());
    }

    setCursorClass = (className) => {
        this.eventCaptureRef.current?.setCursorClass(className);
    }

    amIOnTop = (id) => {
        const dragableComponents = this.subscriptions
          .filter(subscriber => subscriber.getPanConditions().draggable);
        return dragableComponents.length > 0 && last(dragableComponents).id === id;
    }

    handleContextMenu = (mouseXY, e) => {
        const {
          xAccessor,
          chartConfig,
          plotData,
          xScale
        } = this.state
        , currentCharts = getCurrentCharts(chartConfig, mouseXY)
        , currentItem = getCurrentItem(xScale, xAccessor, mouseXY, plotData);

        this.triggerEvent("contextmenu", {
          mouseXY,
          currentItem,
          currentCharts
        }, e);
    }

    calculateStateForDomain = (newDomain) => {
        const {
          xAccessor,
          displayXAccessor,
          xScale: initialXScale,
          chartConfig: initialChartConfig,
          plotData: initialPlotData,
          filterData
        } = this.state
        , {
          postCalculator
        } = this.props
        , {
          fullData
        } = this
        , {
          plotData: beforePlotData,
          domain
        } = filterData(
          fullData,
          newDomain,
          xAccessor,
          initialXScale, {
           currentPlotData: initialPlotData,
           currentDomain: initialXScale.domain()
        })
        , plotData = postCalculator(beforePlotData)
        , updatedScale = initialXScale
            .copy()
            .domain(domain)
        , chartConfig = getChartConfigWithUpdatedYScales(initialChartConfig, { plotData, xAccessor, displayXAccessor, fullData }, updatedScale.domain());

        return {
          xScale: updatedScale,
          plotData,
          chartConfig
        };
    }

    pinchZoomHelper = (initialPinch, finalPinch) => {
        const {
          xScale: initialPinchXScale
        } = initialPinch
        , {
          xScale: initialXScale,
          chartConfig: initialChartConfig,
          plotData: initialPlotData,
          xAccessor,
          displayXAccessor,
          filterData
        } = this.state
        , {
          postCalculator
        } = this.props
        , {
          fullData
        } = this
        , newDomain = _crPinchZoomNewDomain(
           initialPinch,
           finalPinch,
           initialPinchXScale
          )
        , {
          plotData: beforePlotData,
          domain
        } = filterData(
          fullData,
          newDomain,
          xAccessor,
          initialPinchXScale, {
            currentPlotData: initialPlotData,
            currentDomain: initialXScale.domain()
        })
        , plotData = postCalculator(beforePlotData)
        , updatedScale = initialXScale
           .copy()
           .domain(domain)
        , mouseXY = finalPinch.touch1Pos
        , chartConfig = getChartConfigWithUpdatedYScales(
            initialChartConfig, {
              plotData,
              xAccessor,
              displayXAccessor,
              fullData
            },
            updatedScale.domain()
          )
        , currentItem = getCurrentItem(updatedScale, xAccessor, mouseXY, plotData);

        return {
          chartConfig,
          xScale: updatedScale,
          plotData,
          mouseXY,
          currentItem
        };
    }

    cancelDrag() {
        this.eventCaptureRef.current?.cancelDrag();
        this.triggerEvent("dragcancel");
    }

    handlePinchZoom = (initialPinch, finalPinch, e) => {
        if (!this.waitingForPinchZoomAnimationFrame) {
            this.waitingForPinchZoomAnimationFrame = true;
            const state = this.pinchZoomHelper(initialPinch, finalPinch);
            this.triggerEvent("pinchzoom", state, e);
            this.finalPinch = finalPinch;
            requestAnimationFrame(() => {
                this.clearBothCanvas();
                this.draw({ trigger: "pinchzoom" });
                this.waitingForPinchZoomAnimationFrame = false;
            });
        }
    };

    handlePinchZoomEnd = (initialPinch, e) => {
        const {
          xAccessor = ChartCanvas.defaultProps.xAccessor
        } = this.state;
        if (this.finalPinch) {
            const state = this.pinchZoomHelper(initialPinch, this.finalPinch)
            , {
              xScale
            } = state
            , {
              onLoadAfter,
              onLoadBefore
            } = this.props;

            this.triggerEvent("pinchzoom", state, e);
            this.finalPinch = void 0;
            this.clearThreeCanvas();

            this.setState(state, () => _callOnLoadHandlers(
              this.fullData,
              xScale,
              xAccessor,
              onLoadAfter,
              onLoadBefore
            ))
        }
    }

    _zoomXImpl = (plotData, chartConfig, xScale) => {
      const {
        xAccessor
      } = this.state
      , {
        onZoom,
        onLoadAfter,
        onLoadBefore
      } = this.props;
      this.clearThreeCanvas();
      onZoom((plotData || []).length)
      this.setState({
        xScale,
        plotData,
        chartConfig,
      }, () => _callOnLoadHandlers(
        this.fullData,
        xScale,
        xAccessor,
        onLoadAfter,
        onLoadBefore
      ))
    }

    handleZoom = (zoomDirection, mouseXY, e) => {
        if (this.panInProgress) {
            return;
        }

        const {
          xAccessor,
          xScale: initialXScale,
          plotData: initialPlotData
        } = this.state
        , {
          zoomMultiplier,
          zoomAnchor
         } = this.props
        , item = zoomAnchor({
           xScale: initialXScale,
           xAccessor: xAccessor,
           mouseXY,
           plotData: initialPlotData,
        })
        , c = _crZoomDirection(zoomDirection, zoomMultiplier)
        , newDomain = _crNewDomain(initialXScale, item, c)
        , {
          xScale,
          plotData,
          chartConfig
        } = this.calculateStateForDomain(newDomain)
        , currentItem = getCurrentItem(xScale, xAccessor, mouseXY, plotData)
        , currentCharts = getCurrentCharts(chartConfig, mouseXY)


        this.mutableState = {
          mouseXY,
          currentItem,
          currentCharts,
        };
        this.triggerEvent("zoom", {
          xScale,
          plotData,
          chartConfig,
          mouseXY,
          currentCharts,
          currentItem,
          show: true,
        }, e);

        this._zoomXImpl(plotData, chartConfig, xScale)
    }

    xAxisZoom = (newDomain) => {
        const {
          xScale,
          plotData,
          chartConfig
        } = this.calculateStateForDomain(newDomain);

        this._zoomXImpl(plotData, chartConfig, xScale)
    }

    yAxisZoom = (chartId, newDomain) => {
        this.clearThreeCanvas();
        const {
          chartConfig: initialChartConfig
        } = this.state
        , chartConfig = initialChartConfig.map((each) => {
            if (each.id === chartId) {
              const { yScale } = each;
              return {
                ...each,
                yScale: yScale.copy().domain(newDomain),
                yPanEnabled: true,
              };
            } else {
              return each;
            }
        });
        this.setState({
          chartConfig
        });
    };

    triggerEvent(type, props, e) {
      this.subscriptions.forEach(subscriber => {
        const state = {
            ...this.state,
            fullData: this.fullData,
            subscriptions: this.subscriptions,
        };
        subscriber.listener(type, props, state, e);
      });
    }

    draw = (props) => {
      this.subscriptions.forEach(subscriber => {
        if (isDefined(subscriber.draw)) {
          subscriber.draw(props);
        }
      });
    }

    redraw = () => {
      this.clearThreeCanvas();
      this.draw({ force: true });
    }

    panHelper = (mouseXY, initialXScale, { dx, dy }, chartsToPan) => {
        const {
          xAccessor,
          displayXAccessor,
          chartConfig: initialChartConfig,
          filterData
        } = this.state
        , {
          postCalculator
        } = this.props
        , {
          fullData
        } = this
        , newDomain = initialXScale
            .range()
            .map((x) => x - dx)
            .map((x) => initialXScale.invert(x))
        , {
          plotData: beforePlotData,
          domain
        } = filterData(
          fullData,
          newDomain,
          xAccessor,
          initialXScale, {
            currentPlotData: this.hackyWayToStopPanBeyondBounds__plotData,
            currentDomain: this.hackyWayToStopPanBeyondBounds__domain,
            ignoreThresholds: true,
        })
        , updatedScale = initialXScale
            .copy()
            .domain(domain)
        , plotData = postCalculator(beforePlotData)
        , currentItem = getCurrentItem(updatedScale, xAccessor, mouseXY, plotData)
        , chartConfig = getChartConfigWithUpdatedYScales(initialChartConfig, { plotData, xAccessor, displayXAccessor, fullData }, updatedScale.domain(), dy, chartsToPan)
        , currentCharts = getCurrentCharts(chartConfig, mouseXY);

        return {
           xScale: updatedScale,
           plotData,
           chartConfig,
           mouseXY,
           currentCharts,
           currentItem
        };
    }

    handlePan = (mousePosition, panStartXScale, dxdy, chartsToPan, e) => {
        if (!this.waitingForPanAnimationFrame) {
            this.waitingForPanAnimationFrame = true;
            this.hackyWayToStopPanBeyondBounds__plotData =
                this.hackyWayToStopPanBeyondBounds__plotData ?? this.state.plotData;
            this.hackyWayToStopPanBeyondBounds__domain =
                this.hackyWayToStopPanBeyondBounds__domain ?? this.state.xScale.domain();
            const newState = this.panHelper(mousePosition, panStartXScale, dxdy, chartsToPan);
            this.hackyWayToStopPanBeyondBounds__plotData = newState.plotData;
            this.hackyWayToStopPanBeyondBounds__domain = newState.xScale.domain();
            this.panInProgress = true;
            this.triggerEvent("pan", newState, e);
            this.mutableState = {
                mouseXY: newState.mouseXY,
                currentItem: newState.currentItem,
                currentCharts: newState.currentCharts,
            };
            requestAnimationFrame(() => {
                this.waitingForPanAnimationFrame = false;
                this.clearBothCanvas();
                this.draw({ trigger: "pan" });
            });
        }
    }

    handlePanEnd = (mousePosition, panStartXScale, dxdy, chartsToPan, e) => {
        const state = this.panHelper(
          mousePosition,
          panStartXScale,
          dxdy,
          chartsToPan
        )
        , {
          xScale,
          plotData,
          chartConfig
        } = state;

        this.hackyWayToStopPanBeyondBounds__plotData = null;
        this.hackyWayToStopPanBeyondBounds__domain = null;
        this.panInProgress = false;

        this.triggerEvent("panend", state, e);
        requestAnimationFrame(() => {
          const {
            xAccessor
          } = this.state
          , {
            onLoadAfter,
            onLoadBefore
          } = this.props;

          this.clearThreeCanvas();
          this.setState({
            xScale,
            plotData,
            chartConfig,
          }, () => _callOnLoadHandlers(
            this.fullData,
            xScale,
            xAccessor,
            onLoadAfter,
            onLoadBefore
          ));
        });
    }

    handleMouseDown = (_, __, e) => {
      this.triggerEvent("mousedown", this.mutableState, e);
    }

    handleMouseEnter = (e) => {
      this.triggerEvent("mouseenter", {
        show: true,
      }, e);
    }

    handleMouseMove = (mouseXY, _, e) => {
        if (!this.waitingForMouseMoveAnimationFrame) {
            this.waitingForMouseMoveAnimationFrame = true;
            const { chartConfig, plotData, xScale, xAccessor } = this.state;
            const currentCharts = getCurrentCharts(chartConfig, mouseXY);
            const currentItem = getCurrentItem(xScale, xAccessor, mouseXY, plotData);
            this.triggerEvent("mousemove", {
                show: true,
                mouseXY,
                // prevMouseXY is used in interactive components
                prevMouseXY: this.prevMouseXY,
                currentItem,
                currentCharts,
            }, e);
            this.prevMouseXY = mouseXY;
            this.mutableState = {
                mouseXY,
                currentItem,
                currentCharts,
            };
            requestAnimationFrame(() => {
                this.clearMouseCanvas();
                this.draw({ trigger: "mousemove" });
                this.waitingForMouseMoveAnimationFrame = false;
            });
        }
    };
    handleMouseLeave = (e) => {
        this.triggerEvent("mouseleave", { show: false }, e);
        this.clearMouseCanvas();
        this.draw({ trigger: "mouseleave" });
    };
    handleDragStart = ({ startPos }, e) => {
        this.triggerEvent("dragstart", { startPos }, e);
    };
    handleDrag = ({ startPos, mouseXY }, e) => {
        const { chartConfig, plotData, xScale, xAccessor } = this.state;
        const currentCharts = getCurrentCharts(chartConfig, mouseXY);
        const currentItem = getCurrentItem(xScale, xAccessor, mouseXY, plotData);
        this.triggerEvent("drag", {
            startPos,
            mouseXY,
            currentItem,
            currentCharts,
        }, e);
        this.mutableState = {
            mouseXY,
            currentItem,
            currentCharts,
        };
        requestAnimationFrame(() => {
            this.clearMouseCanvas();
            this.draw({ trigger: "drag" });
        });
    };
    handleDragEnd = ({ mouseXY }, e) => {
        this.triggerEvent("dragend", { mouseXY }, e);
        requestAnimationFrame(() => {
            this.clearMouseCanvas();
            this.draw({ trigger: "dragend" });
        });
    };
    handleClick = (_, e) => {
        this.triggerEvent("click", this.mutableState, e);
        requestAnimationFrame(() => {
            this.clearMouseCanvas();
            this.draw({ trigger: "click" });
        });
    };
    handleDoubleClick = (_, e) => {
        this.triggerEvent("dblclick", {}, e);
    };

    getChildContext() {
        const {
          margin,
          ratio
        } = this.props
        , {
          plotData,
          chartConfig,
          xScale,
          xAccessor,
          displayXAccessor
        } = this.state
        , {
          width,
          height
        } = getDimensions(this.props);

        return {
            margin,
            ratio,

            plotData,
            chartConfig,
            xScale,
            xAccessor,
            displayXAccessor,

            width,
            height,

            fullData: this.fullData,
            xAxisZoom: this.xAxisZoom,
            yAxisZoom: this.yAxisZoom,
            getCanvasContexts: this.getCanvasContexts,
            redraw: this.redraw,
            subscribe: this.subscribe,
            unsubscribe: this.unsubscribe,
            generateSubscriptionId: this.generateSubscriptionId,
            getMutableState: this.getMutableState,
            amIOnTop: this.amIOnTop,
            setCursorClass: this.setCursorClass,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const reset = shouldResetChart(this.props, nextProps);
        const { chartConfig: initialChartConfig, plotData, xAccessor, xScale } = this.state;
        const interaction = isInteractionEnabled(xScale, xAccessor, plotData);
        let newState;
        if (!interaction || reset || !shallowEqual(this.props.xExtents, nextProps.xExtents)) {
            // do reset
            newState = resetChart(nextProps);
            this.mutableState = {};
        }
        else {
            const [start, end] = xScale.domain();
            const prevLastItem = last(this.fullData);
            const calculatedState = calculateFullData(nextProps);
            const { xAccessor } = calculatedState;
            const previousX = xAccessor(prevLastItem);
            const lastItemWasVisible = previousX <= end && previousX >= start;
            newState = updateChart(calculatedState, xScale, nextProps, lastItemWasVisible, initialChartConfig);
        }
        const { fullData, ...state } = newState;
        if (!this.panInProgress) {
            this.clearThreeCanvas();
            this.setState(state);
        }
        this.fullData = fullData;
    }
    resetYDomain = (chartId) => {
        const { chartConfig } = this.state;
        let changed = false;
        const newChartConfig = chartConfig.map((each) => {
            if ((isNotDefined(chartId) || each.id === chartId) &&
                !shallowEqual(each.yScale.domain(), each.realYDomain)) {
                changed = true;
                return {
                    ...each,
                    yScale: each.yScale.domain(each.realYDomain),
                    yPanEnabled: false,
                };
            }
            return each;
        });
        if (changed) {
            this.clearThreeCanvas();
            this.setState({
                chartConfig: newChartConfig,
            });
        }
    };

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
        } = this.props
        , {
          plotData,
          xScale,
          xAccessor,
          chartConfig
        } = this.state
        , dimensions = getDimensions(this.props)
        , interaction = isInteractionEnabled(xScale, xAccessor, plotData)
        , cursorStyle = useCrossHairStyleCursor && interaction;

        /*eslint-disable jsx-a11y/click-events-have-key-events*/
        /*eslint-disable jsx-a11y/no-static-element-interactions*/
        return (
          <div
             className={className}
             style={{position: "relative", width, height}}
             onClick={onClick}
             onDoubleClick={onDoubleClick}
          >
              <CanvasContainer
                 ref={this.canvasContainerRef}
                 ratio={ratio}
                 width={width}
                 height={height}
                 style={{ height, zIndex, width }}
              />
              <svg
                 className={className}
                 width={width}
                 height={height}
                 style={{position: "absolute", zIndex: zIndex + 5}}
              >
                  {getCursorStyle()}
                  <ChartCanvasDefs
                    dimensions={dimensions}
                    chartConfig={chartConfig}
                  />
                  <g transform={`translate(${margin.left + 0.5}, ${margin.top + 0.5})`}>
                      <EventCapture
                         ref={this.eventCaptureRef}
                         useCrossHairStyleCursor={cursorStyle}
                         mouseMove={mouseMoveEvent && interaction}
                         zoom={!disableZoom && interaction}
                         pan={!disablePan && interaction}
                         width={dimensions.width}
                         height={dimensions.height}
                         chartConfig={chartConfig}
                         xScale={xScale}
                         xAccessor={xAccessor}
                         focus={defaultFocus}
                         disableInteraction={disableInteraction}
                         getAllPanConditions={this.getAllPanConditions}
                         onContextMenu={this.handleContextMenu}
                         onClick={this.handleClick}
                         onDoubleClick={this.handleDoubleClick}
                         onMouseDown={this.handleMouseDown}
                         onMouseMove={this.handleMouseMove}
                         onMouseEnter={this.handleMouseEnter}
                         onMouseLeave={this.handleMouseLeave}
                         onDragStart={this.handleDragStart}
                         onDrag={this.handleDrag}
                         onDragComplete={this.handleDragEnd}
                         onZoom={this.handleZoom}
                         onPinchZoom={this.handlePinchZoom}
                         onPinchZoomEnd={this.handlePinchZoomEnd}
                         onPan={this.handlePan}
                         onPanEnd={this.handlePanEnd}
                      />
                      <g className={CL_AVOID_INTERACTION}>
                         {children}
                      </g>
                  </g>
              </svg>
          </div>
        );
        /*eslint-enable jsx-a11y/no-static-element-interactions*/
        /*eslint-enable jsx-a11y/click-events-have-key-events */
    }
}

export default ChartCanvas
