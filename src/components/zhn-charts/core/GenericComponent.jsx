import {
    memo,
    forwardRef,
    useContext,
    useRef,
    useCallback,
    useMemo,
    useEffect,
    useImperativeHandle
} from '../../uiApi';

import useRerender from '../../hooks/useRerender';
import useEventCallback from '../../hooks/useEventCallback';
import { ChartCanvasContext } from './ChartCanvas';
import { ChartContext } from './Chart';
import { findChartConfig } from './ChartFn';

const _assign = Object.assign;

const aliases = {
    mouseleave: "mousemove", // to draw interactive after mouse exit
    panend: "pan",
    pinchzoom: "pan",
    mousedown: "mousemove",
    click: "mousemove",
    contextmenu: "mousemove",
    dblclick: "mousemove",
    dragstart: "drag",
    dragend: "drag",
    dragcancel: "drag",
    zoom: "zoom",
};

const DF_CANVAS_TO_DRAW = (
  contexts
) => contexts.mouseCoord;

const _crStyle = (
  chartId,
  clip
) => {
  const _suffix = chartId !== void 0
     ? "-" + chartId
     : ""
  return clip
    ? { clipPath: `url(#chart-area-clip${_suffix})` }
    : void 0;
};

export const GenericComponent = memo(forwardRef((props, ref) => {
       const {
          isHover,
          clip=true,
          edgeClip=false,

          canvasToDraw=DF_CANVAS_TO_DRAW,
          canvasDraw,
          svgDraw,

          preCanvasDraw,
          postCanvasDraw,
          updateMoreProps,
          getMoreProps
        } = props
        , context = useContext(ChartCanvasContext)
        , { chartId } = useContext(ChartContext)

        /*eslint-disable react-hooks/exhaustive-deps */
        , subscriberId = useMemo(
           () => context.generateSubscriptionId?.() || 0,
           []
        )
        // context
        /*eslint-enable react-hooks/exhaustive-deps */
        , rerenderComponent = useRerender()
        , {
          getCanvasContexts,
          subscribe,
          unsubscribe
        } = context
        , moreProps = useRef({
            chartId: context.chartId,
            hovering: false,
            currentCharts: [],
            chartConfigs: context.chartConfigs,
            fullData: context.fullData,
            plotData: context.plotData,
            xScale: context.xScale,
            xAccessor: context.xAccessor,
        })
        , dragInProgressRef = useRef(false)
        , evaluationInProgressRef = useRef(false)
        , iSetTheCursorClassRef = useRef(false);

        const _updateMoreProps = useCallback((newMoreProps, moreProps) => {
             _assign(moreProps, newMoreProps || {});
             updateMoreProps?.(newMoreProps, moreProps);
          },
          [updateMoreProps]
        );

        const _getMoreProps = useCallback(() => {
           const {
             chartConfigs,
             xAccessor,
             displayXAccessor,
             width,
             height,
             fullData
           } = context
           , otherMoreProps = getMoreProps
               ?.(moreProps.current);

           return {
              displayXAccessor,
              width,
              height,
              ...moreProps.current,
              fullData,
              chartConfigs,
              xAccessor,
              ...otherMoreProps,
              chartConfig: findChartConfig(chartConfigs, chartId)
           };
        }, [context, getMoreProps, chartId]);

        useImperativeHandle(ref, () => ({
             getMoreProps: _getMoreProps
          }),
          [_getMoreProps]
        );

        const _isHover = useCallback(
          (e) => isHover === undefined
             ? false
             : isHover(_getMoreProps(), e)
          , [isHover, _getMoreProps]
        )
        , _preCanvasDraw = useCallback(
            (ctx, moreProps) => {
              preCanvasDraw?.(ctx, moreProps);
            },
            [preCanvasDraw]
        )
        , _postCanvasDraw = useCallback(
            (ctx, moreProps) => {
                postCanvasDraw?.(ctx, moreProps);
            },
            [postCanvasDraw]
        );

        const evaluateType = useEventCallback((type, e) => {
            const newType = aliases[type] || type
            , proceed = props.drawOn.includes(newType);
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
                case "mouseleave": {
                    moreProps.current.hovering = false;

                    if (props.onUnHover) {
                        props.onUnHover(e, _getMoreProps());
                    }
                    break;
                }
                case "contextmenu": {
                    if (props.onContextMenu) {
                        props.onContextMenu(e, _getMoreProps());
                    }
                    if (moreProps.current.hovering && props.onContextMenuWhenHover) {
                        props.onContextMenuWhenHover(e, _getMoreProps());
                    }
                    break;
                }
                case "mousedown": {
                    if (props.onMouseDown) {
                        props.onMouseDown(e, _getMoreProps());
                    }
                    break;
                }
                case "click": {
                    const { onClick, onClickOutside, onClickWhenHover } = props;
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
                case "mousemove": {
                    const prevHover = moreProps.current.hovering;
                    moreProps.current.hovering = _isHover(e);

                    const { amIOnTop, setCursorClass } = context;

                    if (
                        moreProps.current.hovering &&
                        !props.selected &&
                        /* && !prevHover */
                        amIOnTop(subscriberId) &&
                        props.onHover !== undefined
                    ) {
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
                case "dblclick": {
                    const morePropsSub = _getMoreProps();

                    if (props.onDoubleClick) {
                        props.onDoubleClick(e, morePropsSub);
                    }
                    if (moreProps.current.hovering && props.onDoubleClickWhenHover) {
                        props.onDoubleClickWhenHover(e, morePropsSub);
                    }
                    break;
                }
                case "pan": {
                    moreProps.current.hovering = false;
                    if (props.onPan) {
                        props.onPan(e, _getMoreProps());
                    }
                    break;
                }
                case "panend": {
                    if (props.onPanEnd) {
                        props.onPanEnd(e, _getMoreProps());
                    }
                    break;
                }
                case "dragstart": {
                    if (getPanConditions().draggable) {
                        const { amIOnTop } = context;
                        if (amIOnTop(subscriberId)) {
                            dragInProgressRef.current = true;
                            if (props.onDragStart !== undefined) {
                                props.onDragStart(e, _getMoreProps());
                            }
                        }
                    }
                    break;
                }
                case "drag": {
                    if (dragInProgressRef.current && props.onDrag) {
                        props.onDrag(e, _getMoreProps());
                    }
                    break;
                }
                case "dragend": {
                    if (dragInProgressRef.current && props.onDragComplete) {
                        props.onDragComplete(e, _getMoreProps());
                    }
                    dragInProgressRef.current = false;
                    break;
                }
                case "dragcancel": {
                    if (dragInProgressRef.current || iSetTheCursorClassRef.current) {
                        const { setCursorClass } = context;
                        setCursorClass(null);
                    }
                    break;
                }
                default: return;
            }
        });

        const listener = useEventCallback((type, newMoreProps, state, e) => {
           if (newMoreProps) {
              _updateMoreProps(newMoreProps, moreProps.current);
           }
           evaluationInProgressRef.current = true;
           evaluateType(type, e);
           evaluationInProgressRef.current = false;
        });

        const drawOnCanvas = useCallback(() => {
            if (canvasDraw === void 0 || canvasToDraw === void 0) {
               return;
            }

            const moreProps = _getMoreProps()
            , contexts = getCanvasContexts?.();
            if (contexts === void 0) {
               return;
            }

            const ctx = canvasToDraw(contexts);
            if (ctx !== void 0) {
               _preCanvasDraw(ctx, moreProps);
               canvasDraw(ctx, moreProps);
               _postCanvasDraw(ctx, moreProps);
            }
        }, [
             canvasToDraw,
             canvasDraw,
             getCanvasContexts,
             _preCanvasDraw,
             _postCanvasDraw,
             _getMoreProps
        ]);

        const draw = useEventCallback(({ trigger, force = false }) => {
           const type = aliases[trigger] || trigger
           , proceed = props.drawOn.indexOf(type) > -1;

           if (proceed || props.selected /* this is to draw as soon as you select */ || force) {
              if (canvasDraw === undefined) {
                rerenderComponent()
              } else {
                drawOnCanvas();
              }
           }
        });

        const getPanConditions = useEventCallback(() => {
           const draggable = moreProps.current.hovering
             && (props.selected || props.enableDragOnHover)

           return {
              draggable: !!draggable,
              panEnabled: !props.disablePan,
           };
        });

        /*eslint-disable react-hooks/exhaustive-deps */
        useEffect(() => {
            const { setCursorClass } = context;
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

        useEffect(() => {
           if (canvasDraw !== void 0 && !evaluationInProgressRef.current) {
              _updateMoreProps(void 0, moreProps.current);
              drawOnCanvas();
           }
        });

        /*eslint-disable react-hooks/exhaustive-deps */
        useEffect(() => {
            subscribe(subscriberId, {
               chartId,
               clip,
               edgeClip,
               listener,
               draw,
               getPanConditions,
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

        return canvasDraw !== void 0 || svgDraw === void 0
          ? null : (
          <g style={_crStyle(chartId, clip)}>
             {svgDraw(_getMoreProps())}
          </g>
        );
    })
);

export const getAxisCanvas = (contexts) => {
    return contexts.axes;
};

export const getMouseCanvas = (contexts) => {
    return contexts.mouseCoord;
};
