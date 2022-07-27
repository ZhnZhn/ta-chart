"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = require("react");

var _utils = require("../utils");

var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));

var _useRefPropsContext2 = _interopRequireDefault(require("./useRefPropsContext"));

var _useEvaluateType2 = _interopRequireDefault(require("./useEvaluateType"));

var _useDraw2 = _interopRequireDefault(require("./useDraw"));

var _jsxRuntime = require("react/jsx-runtime");

//import { ICanvasContexts } from "./CanvasContainer";

/*
interface GenericComponentProps {
    readonly svgDraw?: (moreProps: any) => React.ReactNode;
    readonly canvasDraw?: (ctx: CanvasRenderingContext2D, moreProps: any) => void;
    readonly canvasToDraw?: (contexts: ICanvasContexts) => CanvasRenderingContext2D | undefined;
    readonly clip?: boolean;
    readonly disablePan?: boolean;
    readonly drawOn: string[];
    readonly edgeClip?: boolean;
    readonly enableDragOnHover?: boolean;
    readonly interactiveCursorClass?: string;
    readonly isHover?: (moreProps: any, e: React.MouseEvent) => boolean;
    readonly onClick?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onClickWhenHover?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onClickOutside?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onPan?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onPanEnd?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onDragStart?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onDrag?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onDragComplete?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onDoubleClick?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onDoubleClickWhenHover?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onContextMenu?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onContextMenuWhenHover?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onMouseMove?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onMouseDown?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onHover?: (e: React.MouseEvent, moreProps: any) => void;
    readonly onUnHover?: (e: React.MouseEvent, moreProps: any) => void;
    readonly selected?: boolean;
}
*/

/*
interface GenericComponentState {
    updateCount: number;
}
*/

/*
public static contextTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.object.isRequired,
    chartId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    getCanvasContexts: PropTypes.func,
    xScale: PropTypes.func.isRequired,
    xAccessor: PropTypes.func.isRequired,
    displayXAccessor: PropTypes.func.isRequired,
    plotData: PropTypes.array.isRequired,
    fullData: PropTypes.array.isRequired,
    chartConfig: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    morePropsDecorator: PropTypes.func,
    generateSubscriptionId: PropTypes.func,
    getMutableState: PropTypes.func.isRequired,
    amIOnTop: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    setCursorClass: PropTypes.func.isRequired,
};
*/
var DF_SVG_DRAW = (0, _utils.functor)(null); //, DF_DRAW = []
//, DF_CANVAS_TO_DRAW = contexts => contexts.mouseCoord

var _getRefValue = function _getRefValue(ref) {
  return ref.current;
};

var _setRefValue = function _setRefValue(ref, value) {
  return ref.current = value;
};

var _updateMoreProps = function _updateMoreProps(ref, moreProps) {
  var _moreProps = _getRefValue(ref); //console.log(_moreProps, moreProps)


  Object.keys(moreProps).forEach(function (key) {
    _moreProps[key] = moreProps[key];
  });
};

var _crStyle = function _crStyle(chartId, clip) {
  var suffix = chartId !== undefined ? "-" + chartId : "";
  return clip ? {
    clipPath: "url(#chart-area-clip" + suffix + ")"
  } : void 0;
};

var GenericComponent = function GenericComponent(props, context) {
  var _props$svgDraw = props.svgDraw,
      svgDraw = _props$svgDraw === void 0 ? DF_SVG_DRAW : _props$svgDraw,
      canvasDraw = props.canvasDraw,
      _props$clip = props.clip,
      clip = _props$clip === void 0 ? true : _props$clip,
      _props$edgeClip = props.edgeClip,
      edgeClip = _props$edgeClip === void 0 ? false : _props$edgeClip,
      _props$selected = props.selected,
      selected = _props$selected === void 0 ? false : _props$selected,
      chartId = context.chartId,
      generateSubscriptionId = context.generateSubscriptionId,
      subscribe = context.subscribe,
      _useRefPropsContext = (0, _useRefPropsContext2["default"])(props, context),
      _refProps = _useRefPropsContext[0],
      _refContext = _useRefPropsContext[1];

  var _refSubsriberId = (0, _useRefInit["default"])(generateSubscriptionId),
      setUpdateCount = (0, _react.useState)(0)[1],
      _refMoreProps = (0, _react.useRef)({}),
      _refEvaluationInProgress = (0, _react.useRef)(false),
      _refISetTheCursorClass = (0, _react.useRef)(false),
      _useEvaluateType = (0, _useEvaluateType2["default"])(_refProps, _refContext, _refMoreProps, _refSubsriberId, _refISetTheCursorClass),
      _evaluateType = _useEvaluateType[0],
      _getMoreProps = _useEvaluateType[1],
      _listener = (0, _react.useCallback)(function (type, moreProps, state, e) {
    if (moreProps !== undefined) {
      _updateMoreProps(_refMoreProps, moreProps);
    }

    _setRefValue(_refEvaluationInProgress, true);

    _evaluateType(type, e);

    _setRefValue(_refEvaluationInProgress, false);
  }, [_evaluateType]),
      _useDraw = (0, _useDraw2["default"])(_refProps, _refContext, _getMoreProps, setUpdateCount),
      _draw = _useDraw[0],
      _drawOnCanvas = _useDraw[1];
  /*eslint-disable react-hooks/exhaustive-deps */


  var _getPanConditions = (0, _react.useCallback)(function () {
    var props = _getRefValue(_refProps);

    var _moreProps = _getRefValue(_refMoreProps);

    var draggable = !!(props.selected && _moreProps.hovering) || props.enableDragOnHover && _moreProps.hovering;
    return {
      draggable: draggable,
      panEnabled: !props.disablePan
    };
  }, []); // _refProps

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useLayoutEffect)(function () {
    subscribe(_getRefValue(_refSubsriberId), {
      chartId: chartId,
      clip: clip,
      edgeClip: edgeClip,
      listener: _listener,
      draw: _draw,
      getPanConditions: _getPanConditions
    });
  }, []); // _draw,_getPanConditions, _listener
  // _refSubsriberId, chartId, clip, edgeClip, subscribe

  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    var nextContext = _getRefValue(_refContext),
        xScale = nextContext.xScale,
        plotData = nextContext.plotData,
        chartConfig = nextContext.chartConfig,
        getMutableState = nextContext.getMutableState;

    _setRefValue(_refMoreProps, (0, _extends2["default"])({}, _getRefValue(_refMoreProps), getMutableState(), {
      xScale: xScale,
      plotData: plotData,
      chartConfig: chartConfig
    }));
  });
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    return function () {
      var context = _getRefValue(_refContext),
          unsubscribe = context.unsubscribe,
          setCursorClass = context.setCursorClass;

      unsubscribe(_getRefValue(_refSubsriberId));

      if (_getRefValue(_refISetTheCursorClass)) {
        setCursorClass(null);
      }
    };
  }, []); //_refContext, _refProps

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    var props = _getRefValue(_refProps),
        interactiveCursorClass = props.interactiveCursorClass,
        context = _getRefValue(_refContext),
        setCursorClass = context.setCursorClass;

    if (selected && _getRefValue(_refMoreProps).hovering) {
      _setRefValue(_refISetTheCursorClass, true);

      setCursorClass(interactiveCursorClass);
    } else {
      _setRefValue(_refISetTheCursorClass, false);

      setCursorClass(null);
    }
  }, [selected]); // _refContext, _refProps

  /*eslint-enable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    var canvasDraw = props.canvasDraw;

    if (canvasDraw !== undefined && !_getRefValue(_refEvaluationInProgress)) {
      //_updateMoreProps(_getRefValue(_refMoreProps));
      _drawOnCanvas();
    }
  });

  var style = _crStyle(chartId, clip);

  return svgDraw === undefined || canvasDraw !== undefined ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    style: style,
    children: svgDraw(_getMoreProps())
  });
};

GenericComponent.contextTypes = {
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  margin: _propTypes["default"].object.isRequired,
  chartId: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  getCanvasContexts: _propTypes["default"].func,
  xScale: _propTypes["default"].func.isRequired,
  xAccessor: _propTypes["default"].func.isRequired,
  displayXAccessor: _propTypes["default"].func.isRequired,
  plotData: _propTypes["default"].array.isRequired,
  fullData: _propTypes["default"].array.isRequired,
  chartConfig: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object]).isRequired,
  morePropsDecorator: _propTypes["default"].func,
  generateSubscriptionId: _propTypes["default"].func,
  getMutableState: _propTypes["default"].func.isRequired,
  amIOnTop: _propTypes["default"].func.isRequired,
  subscribe: _propTypes["default"].func.isRequired,
  unsubscribe: _propTypes["default"].func.isRequired,
  setCursorClass: _propTypes["default"].func.isRequired
};
var _default = GenericComponent;
/*
export class GenericComponent extends React.Component {
    static defaultProps = {
        svgDraw: functor(null),
        draw: [],
        canvasToDraw: (contexts) => contexts.mouseCoord,
        clip: true,
        edgeClip: false,
        selected: false,
        disablePan: false,
        enableDragOnHover: false,
    };


    //public moreProps = {};
    moreProps = {};


    //private dragInProgress = false;
    //private evaluationInProgress = false;
    //private iSetTheCursorClass = false;
    //private suscriberId: number;

    dragInProgress = false;
    evaluationInProgress = false;
    iSetTheCursorClass = false;
    suscriberId;

    constructor(props, context) {
        super(props, context);
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
        this.getMoreProps = this.getMoreProps.bind(this);
        this.draw = this.draw.bind(this);
        this.updateMoreProps = this.updateMoreProps.bind(this);
        this.evaluateType = this.evaluateType.bind(this);
        this.isHover = this.isHover.bind(this);
        this.preCanvasDraw = this.preCanvasDraw.bind(this);
        this.postCanvasDraw = this.postCanvasDraw.bind(this);
        this.getPanConditions = this.getPanConditions.bind(this);
        this.shouldTypeProceed = this.shouldTypeProceed.bind(this);
        this.preEvaluate = this.preEvaluate.bind(this);

        const { generateSubscriptionId } = context;

        this.suscriberId = generateSubscriptionId();

        this.state = {
            updateCount: 0,
        };
    }

    updateMoreProps(moreProps) {
        Object.keys(moreProps).forEach((key) => {
            this.moreProps[key] = moreProps[key];
        });
    }

    shouldTypeProceed(type, moreProps) {
        return true;
    }

    preEvaluate(type, moreProps, e) {
        /// empty
    }

    listener = (type, moreProps, state, e) => {
        if (moreProps !== undefined) {
            this.updateMoreProps(moreProps);
        }
        this.evaluationInProgress = true;
        this.evaluateType(type, e);
        this.evaluationInProgress = false;
    };

    evaluateType(type, e) {
        const newType = aliases[type] || type;
        const proceed = this.props.drawOn.indexOf(newType) > -1;
        if (!proceed) {
            return;
        }

        this.preEvaluate(type, this.moreProps, e);

        if (!this.shouldTypeProceed(type, this.moreProps)) {
            return;
        }

        switch (type) {
            case "zoom":
            case "mouseenter":
                // DO NOT DRAW FOR THESE EVENTS
                break;
            case "mouseleave": {
                this.moreProps.hovering = false;

                if (this.props.onUnHover) {
                    this.props.onUnHover(e, this.getMoreProps());
                }
                break;
            }
            case "contextmenu": {
                if (this.props.onContextMenu) {
                    this.props.onContextMenu(e, this.getMoreProps());
                }
                if (this.moreProps.hovering && this.props.onContextMenuWhenHover) {
                    this.props.onContextMenuWhenHover(e, this.getMoreProps());
                }
                break;
            }
            case "mousedown": {
                if (this.props.onMouseDown) {
                    this.props.onMouseDown(e, this.getMoreProps());
                }
                break;
            }
            case "click": {
                const { onClick, onClickOutside, onClickWhenHover } = this.props;
                const moreProps = this.getMoreProps();
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
                const prevHover = this.moreProps.hovering;
                this.moreProps.hovering = this.isHover(e);

                const { amIOnTop, setCursorClass } = this.context;

                if (
                    this.moreProps.hovering &&
                    !this.props.selected &&
                    // && !prevHover
                    amIOnTop(this.suscriberId) &&
                    this.props.onHover !== undefined
                ) {
                    setCursorClass("react-financial-charts-pointer-cursor");
                    this.iSetTheCursorClass = true;
                } else if (this.moreProps.hovering && this.props.selected && amIOnTop(this.suscriberId)) {
                    setCursorClass(this.props.interactiveCursorClass);
                    this.iSetTheCursorClass = true;
                } else if (prevHover && !this.moreProps.hovering && this.iSetTheCursorClass) {
                    this.iSetTheCursorClass = false;
                    setCursorClass(null);
                }
                const moreProps = this.getMoreProps();

                if (this.moreProps.hovering && !prevHover) {
                    if (this.props.onHover) {
                        this.props.onHover(e, moreProps);
                    }
                }
                if (prevHover && !this.moreProps.hovering) {
                    if (this.props.onUnHover) {
                        this.props.onUnHover(e, moreProps);
                    }
                }

                if (this.props.onMouseMove) {
                    this.props.onMouseMove(e, moreProps);
                }
                break;
            }
            case "dblclick": {
                const moreProps = this.getMoreProps();

                if (this.props.onDoubleClick) {
                    this.props.onDoubleClick(e, moreProps);
                }
                if (this.moreProps.hovering && this.props.onDoubleClickWhenHover) {
                    this.props.onDoubleClickWhenHover(e, moreProps);
                }
                break;
            }
            case "pan": {
                this.moreProps.hovering = false;
                if (this.props.onPan) {
                    this.props.onPan(e, this.getMoreProps());
                }
                break;
            }
            case "panend": {
                if (this.props.onPanEnd) {
                    this.props.onPanEnd(e, this.getMoreProps());
                }
                break;
            }
            case "dragstart": {
                if (this.getPanConditions().draggable) {
                    const { amIOnTop } = this.context;
                    if (amIOnTop(this.suscriberId)) {
                        this.dragInProgress = true;
                        if (this.props.onDragStart !== undefined) {
                            this.props.onDragStart(e, this.getMoreProps());
                        }
                    }
                }
                break;
            }
            case "drag": {
                if (this.dragInProgress && this.props.onDrag) {
                    this.props.onDrag(e, this.getMoreProps());
                }
                break;
            }
            case "dragend": {
                if (this.dragInProgress && this.props.onDragComplete) {
                    this.props.onDragComplete(e, this.getMoreProps());
                }
                this.dragInProgress = false;
                break;
            }
            case "dragcancel": {
                if (this.dragInProgress || this.iSetTheCursorClass) {
                    const { setCursorClass } = this.context;
                    setCursorClass(null);
                }
                break;
            }
            default: break;
        }
    }


    //isHover(e: React.MouseEvent) {
    isHover(e) {
        const { isHover } = this.props;
        if (isHover === undefined) {
            return false;
        }

        return isHover(this.getMoreProps(), e);
    }

    getPanConditions() {
        const draggable =
            !!(this.props.selected && this.moreProps.hovering) ||
            (this.props.enableDragOnHover && this.moreProps.hovering);

        return {
            draggable,
            panEnabled: !this.props.disablePan,
        };
    }


    draw({ trigger, force } = { force: false }) {

        const type = aliases[trigger] || trigger;
        const proceed = this.props.drawOn.indexOf(type) > -1;

        // this is to draw as soon as you select
        if (proceed || this.props.selected || force) {
            const { canvasDraw } = this.props;
            if (canvasDraw === undefined) {
                const { updateCount } = this.state;
                this.setState({
                    updateCount: updateCount + 1,
                });
            } else {
                this.drawOnCanvas();
            }
        }
    }

    UNSAFE_componentWillMount() {
        const { subscribe, chartId } = this.context;
        const { clip, edgeClip } = this.props;

        subscribe(this.suscriberId, {
            chartId,
            clip,
            edgeClip,
            listener: this.listener,
            draw: this.draw,
            getPanConditions: this.getPanConditions,
        });

        this.UNSAFE_componentWillReceiveProps(this.props, this.context);
    }

    componentWillUnmount() {
        const { unsubscribe } = this.context;
        unsubscribe(this.suscriberId);
        if (this.iSetTheCursorClass) {
            const { setCursorClass } = this.context;
            setCursorClass(null);
        }
    }

    componentDidMount() {
        this.componentDidUpdate(this.props);
    }

    componentDidUpdate(prevProps) {
        const { canvasDraw, selected, interactiveCursorClass } = this.props;

        if (prevProps.selected !== selected) {
            const { setCursorClass } = this.context;
            if (selected && this.moreProps.hovering) {
                this.iSetTheCursorClass = true;
                setCursorClass(interactiveCursorClass);
            } else {
                this.iSetTheCursorClass = false;
                setCursorClass(null);
            }
        }
        if (canvasDraw !== undefined && !this.evaluationInProgress) {
            this.updateMoreProps(this.moreProps);
            this.drawOnCanvas();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        const { xScale, plotData, chartConfig, getMutableState } = nextContext;

        this.moreProps = {
            ...this.moreProps,
            ...getMutableState(),

			//^ this is so
			//mouseXY, currentCharts, currentItem are available to
			//newly created components like MouseHoverText which
			//is created right after a new interactive object is drawn

            xScale,
            plotData,
            chartConfig,
        };
    }

    getMoreProps() {
        const {
            xScale,
            plotData,
            chartConfig,
            morePropsDecorator,
            xAccessor,
            displayXAccessor,
            width,
            height,
        } = this.context;

        const { chartId, fullData } = this.context;

        const moreProps = {
            xScale,
            plotData,
            chartConfig,
            xAccessor,
            displayXAccessor,
            width,
            height,
            chartId,
            fullData,
            ...this.moreProps,
        };

        return (morePropsDecorator || identity)(moreProps);
    }

    //preCanvasDraw(ctx: CanvasRenderingContext2D, moreProps: any) {
    preCanvasDraw(ctx, moreProps) {
        // do nothing
    }

    postCanvasDraw(ctx, moreProps) {
        // empty
    }

    drawOnCanvas() {
        const { canvasDraw, canvasToDraw } = this.props;
        if (canvasDraw === undefined || canvasToDraw === undefined) {
            return;
        }

        const { getCanvasContexts } = this.context;

        const moreProps = this.getMoreProps();

        const contexts = getCanvasContexts();

        const ctx = canvasToDraw(contexts);
        if (ctx !== undefined) {
            this.preCanvasDraw(ctx, moreProps);
            canvasDraw(ctx, moreProps);
            this.postCanvasDraw(ctx, moreProps);
        }
    }

    render() {
        const { canvasDraw, clip, svgDraw } = this.props;
        if (canvasDraw !== undefined || svgDraw === undefined) {
            return null;
        }

        const { chartId } = this.context;

        const suffix = chartId !== undefined ? "-" + chartId : "";

        const style = clip ? { clipPath: `url(#chart-area-clip${suffix})` } : undefined;

        return <g style={style}>{svgDraw(this.getMoreProps())}</g>;
    }
}
*/

exports["default"] = _default;
//# sourceMappingURL=GenericComponent.js.map