"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.GenericComponent = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

var _CL = require("../CL");

var _ID = require("./ID");

var _jsxRuntime = require("react/jsx-runtime");

var MOUSE_MOVE = 'mousemove',
    PAN = 'pan',
    DRAG = 'drag',
    ZOOM = 'zoom';
var ALIASES = {
  mouseleave: MOUSE_MOVE,
  panend: PAN,
  pinchzoom: PAN,
  mousedown: MOUSE_MOVE,
  click: MOUSE_MOVE,
  contextmenu: MOUSE_MOVE,
  dblclick: MOUSE_MOVE,
  dragstart: DRAG,
  dragend: DRAG,
  dragcancel: DRAG,
  zoom: ZOOM
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
},
    _getObjetcKeys = Object.keys,
    FN_NOOP = function FN_NOOP() {};

var GenericComponent = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(GenericComponent, _React$Component);

  function GenericComponent(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    _this.moreProps = {};
    _this.dragInProgress = false;
    _this.evaluationInProgress = false;
    _this.iSetTheCursorClass = false;
    _this.suscriberId = void 0;

    _this.listener = function (type, moreProps, state, e) {
      if (moreProps !== undefined) {
        _this.updateMoreProps(moreProps);
      }

      _this.evaluationInProgress = true;

      _this.evaluateType(type, e);

      _this.evaluationInProgress = false;
    };

    _this.drawOnCanvas = _this.drawOnCanvas.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getMoreProps = _this.getMoreProps.bind((0, _assertThisInitialized2["default"])(_this));
    _this.draw = _this.draw.bind((0, _assertThisInitialized2["default"])(_this));
    _this.updateMoreProps = _this.updateMoreProps.bind((0, _assertThisInitialized2["default"])(_this));
    _this.evaluateType = _this.evaluateType.bind((0, _assertThisInitialized2["default"])(_this));
    _this.isHover = _this.isHover.bind((0, _assertThisInitialized2["default"])(_this));
    _this.preCanvasDraw = _this.preCanvasDraw.bind((0, _assertThisInitialized2["default"])(_this));
    _this.postCanvasDraw = _this.postCanvasDraw.bind((0, _assertThisInitialized2["default"])(_this));
    _this.getPanConditions = _this.getPanConditions.bind((0, _assertThisInitialized2["default"])(_this));
    _this.shouldTypeProceed = _this.shouldTypeProceed.bind((0, _assertThisInitialized2["default"])(_this));
    _this.preEvaluate = _this.preEvaluate.bind((0, _assertThisInitialized2["default"])(_this));
    var generateSubscriptionId = context.generateSubscriptionId;
    _this.suscriberId = generateSubscriptionId();
    _this.state = {
      updateCount: 0
    };
    return _this;
  }

  var _proto = GenericComponent.prototype;

  _proto.updateMoreProps = function updateMoreProps(moreProps) {
    var _this2 = this;

    _getObjetcKeys(moreProps).forEach(function (key) {
      _this2.moreProps[key] = moreProps[key];
    });

    this.props.updateMoreProps(moreProps, this.moreProps);
  };

  _proto.shouldTypeProceed = function shouldTypeProceed(type, moreProps) {
    var shouldTypeProceed = this.props.shouldTypeProceed;
    return _isFn(shouldTypeProceed) ? shouldTypeProceed(type, moreProps) : true;
  };

  _proto.preEvaluate = function preEvaluate(type, moreProps, e) {
    /// empty
    this.props.preEvaluate(type, moreProps, e);
  };

  _proto.evaluateType = function evaluateType(type, e) {
    var newType = ALIASES[type] || type,
        proceed = this.props.drawOn.indexOf(newType) > -1;

    if (!proceed) {
      return;
    }

    this.preEvaluate(type, this.moreProps, e);

    if (!this.shouldTypeProceed(type, this.moreProps)) {
      return;
    }

    switch (type) {
      // DO NOT DRAW FOR THESE EVENTS
      case 'zoom':
      case 'mouseenter':
        break;

      case 'mouseleave':
        {
          this.moreProps.hovering = false;

          if (this.props.onUnHover) {
            this.props.onUnHover(e, this.getMoreProps());
          }

          break;
        }

      case 'contextmenu':
        {
          if (this.props.onContextMenu) {
            this.props.onContextMenu(e, this.getMoreProps());
          }

          if (this.moreProps.hovering && this.props.onContextMenuWhenHover) {
            this.props.onContextMenuWhenHover(e, this.getMoreProps());
          }

          break;
        }

      case 'mousedown':
        {
          if (this.props.onMouseDown) {
            this.props.onMouseDown(e, this.getMoreProps());
          }

          break;
        }

      case 'click':
        {
          var _this$props = this.props,
              onClick = _this$props.onClick,
              onClickOutside = _this$props.onClickOutside,
              onClickWhenHover = _this$props.onClickWhenHover;
          var moreProps = this.getMoreProps();

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

      case 'mousemove':
        {
          var prevHover = this.moreProps.hovering;
          this.moreProps.hovering = this.isHover(e);
          var _this$context = this.context,
              amIOnTop = _this$context.amIOnTop,
              setCursorClass = _this$context.setCursorClass;

          if (this.moreProps.hovering && !this.props.selected &&
          /* && !prevHover */
          amIOnTop(this.suscriberId) && this.props.onHover !== undefined) {
            setCursorClass(_CL.CL_POINTER_CURSOR);
            this.iSetTheCursorClass = true;
          } else if (this.moreProps.hovering && this.props.selected && amIOnTop(this.suscriberId)) {
            setCursorClass(this.props.interactiveCursorClass);
            this.iSetTheCursorClass = true;
          } else if (prevHover && !this.moreProps.hovering && this.iSetTheCursorClass) {
            this.iSetTheCursorClass = false;
            setCursorClass(null);
          }

          var _moreProps = this.getMoreProps();

          if (this.moreProps.hovering && !prevHover) {
            if (this.props.onHover) {
              this.props.onHover(e, _moreProps);
            }
          }

          if (prevHover && !this.moreProps.hovering) {
            if (this.props.onUnHover) {
              this.props.onUnHover(e, _moreProps);
            }
          }

          if (this.props.onMouseMove) {
            this.props.onMouseMove(e, _moreProps);
          }

          break;
        }

      case 'dblclick':
        {
          var _moreProps2 = this.getMoreProps();

          if (this.props.onDoubleClick) {
            this.props.onDoubleClick(e, _moreProps2);
          }

          if (this.moreProps.hovering && this.props.onDoubleClickWhenHover) {
            this.props.onDoubleClickWhenHover(e, _moreProps2);
          }

          break;
        }

      case 'pan':
        {
          this.moreProps.hovering = false;

          if (this.props.onPan) {
            this.props.onPan(e, this.getMoreProps());
          }

          break;
        }

      case 'panend':
        {
          if (this.props.onPanEnd) {
            this.props.onPanEnd(e, this.getMoreProps());
          }

          break;
        }

      case 'dragstart':
        {
          if (this.getPanConditions().draggable) {
            var _amIOnTop = this.context.amIOnTop;

            if (_amIOnTop(this.suscriberId)) {
              this.dragInProgress = true;

              if (this.props.onDragStart !== undefined) {
                this.props.onDragStart(e, this.getMoreProps());
              }
            }
          }

          break;
        }

      case 'drag':
        {
          if (this.dragInProgress && this.props.onDrag) {
            this.props.onDrag(e, this.getMoreProps());
          }

          break;
        }

      case 'dragend':
        {
          if (this.dragInProgress && this.props.onDragComplete) {
            this.props.onDragComplete(e, this.getMoreProps());
          }

          this.dragInProgress = false;
          break;
        }

      case 'dragcancel':
        {
          if (this.dragInProgress || this.iSetTheCursorClass) {
            var _setCursorClass = this.context.setCursorClass;

            _setCursorClass(null);
          }

          break;
        }

      default:
        return;
    }
  };

  _proto.isHover = function isHover(e) {
    var isHover = this.props.isHover;

    if (isHover === undefined) {
      return false;
    }

    return isHover(this.getMoreProps(), e);
  };

  _proto.getPanConditions = function getPanConditions() {
    var _this$props2 = this.props,
        selected = _this$props2.selected,
        enableDragOnHover = _this$props2.enableDragOnHover,
        disablePan = _this$props2.disablePan,
        hovering = this.moreProps.hovering;
    return {
      draggable: !!(selected && hovering) || enableDragOnHover && hovering,
      panEnabled: !disablePan
    };
  };

  _proto.draw = function draw(_temp) {
    var _ref = _temp === void 0 ? {
      force: false
    } : _temp,
        trigger = _ref.trigger,
        force = _ref.force;

    var type = ALIASES[trigger] || trigger;
    var proceed = this.props.drawOn.indexOf(type) > -1;

    if (proceed || this.props.selected
    /* this is to draw as soon as you select */
    || force) {
      var canvasDraw = this.props.canvasDraw;

      if (canvasDraw === undefined) {
        var updateCount = this.state.updateCount;
        this.setState({
          updateCount: updateCount + 1
        });
      } else {
        this.drawOnCanvas();
      }
    }
  };

  _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
    var _this$context2 = this.context,
        subscribe = _this$context2.subscribe,
        chartId = _this$context2.chartId;
    var _this$props3 = this.props,
        clip = _this$props3.clip,
        edgeClip = _this$props3.edgeClip;
    subscribe(this.suscriberId, {
      chartId: chartId,
      clip: clip,
      edgeClip: edgeClip,
      listener: this.listener,
      draw: this.draw,
      getPanConditions: this.getPanConditions
    });
    this.UNSAFE_componentWillReceiveProps(this.props, this.context);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var unsubscribe = this.context.unsubscribe;
    unsubscribe(this.suscriberId);

    if (this.iSetTheCursorClass) {
      var setCursorClass = this.context.setCursorClass;
      setCursorClass(null);
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    this.componentDidUpdate(this.props);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props4 = this.props,
        canvasDraw = _this$props4.canvasDraw,
        selected = _this$props4.selected,
        interactiveCursorClass = _this$props4.interactiveCursorClass;

    if (prevProps.selected !== selected) {
      var setCursorClass = this.context.setCursorClass;

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
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    var xScale = nextContext.xScale,
        plotData = nextContext.plotData,
        chartConfig = nextContext.chartConfig,
        getMutableState = nextContext.getMutableState;
    this.moreProps = (0, _extends2["default"])({}, this.moreProps, getMutableState(), {
      /*
      ^ this is so
      mouseXY, currentCharts, currentItem are available to
      newly created components like MouseHoverText which
      is created right after a new interactive object is drawn
      */
      xScale: xScale,
      plotData: plotData,
      chartConfig: chartConfig
    });
  };

  _proto.getMoreProps = function getMoreProps() {
    var _this$context3 = this.context,
        xScale = _this$context3.xScale,
        plotData = _this$context3.plotData,
        chartConfig = _this$context3.chartConfig,
        morePropsDecorator = _this$context3.morePropsDecorator,
        xAccessor = _this$context3.xAccessor,
        displayXAccessor = _this$context3.displayXAccessor,
        width = _this$context3.width,
        height = _this$context3.height;
    var _this$context4 = this.context,
        chartId = _this$context4.chartId,
        fullData = _this$context4.fullData;
    var moreProps = (0, _extends2["default"])({
      xScale: xScale,
      plotData: plotData,
      chartConfig: chartConfig,
      xAccessor: xAccessor,
      displayXAccessor: displayXAccessor,
      width: width,
      height: height,
      chartId: chartId,
      fullData: fullData
    }, this.moreProps);
    return (morePropsDecorator || _utils.identity)(moreProps);
  };

  _proto.preCanvasDraw = function preCanvasDraw(ctx, moreProps) {
    // do nothing
    this.props.preCanvasDraw(ctx, moreProps);
  };

  _proto.postCanvasDraw = function postCanvasDraw(ctx, moreProps) {
    // empty
    this.props.postCanvasDraw(ctx, moreProps);
  };

  _proto.drawOnCanvas = function drawOnCanvas() {
    var _this$props5 = this.props,
        canvasDraw = _this$props5.canvasDraw,
        canvasToDraw = _this$props5.canvasToDraw;

    if (canvasDraw === undefined || canvasToDraw === undefined) {
      return;
    }

    var getCanvasContexts = this.context.getCanvasContexts;
    var moreProps = this.getMoreProps();
    var contexts = getCanvasContexts();
    var ctx = canvasToDraw(contexts);

    if (ctx !== undefined) {
      this.preCanvasDraw(ctx, moreProps);
      canvasDraw(ctx, moreProps);
      this.postCanvasDraw(ctx, moreProps);
    }
  };

  _proto.render = function render() {
    var _this$props6 = this.props,
        canvasDraw = _this$props6.canvasDraw,
        clip = _this$props6.clip,
        svgDraw = _this$props6.svgDraw;

    if (canvasDraw !== undefined || svgDraw === undefined) {
      return null;
    }

    var chartId = this.context.chartId,
        suffix = chartId !== undefined ? '-' + chartId : '',
        style = clip ? {
      clipPath: "url(#" + _ID.CLIP_PATH_ID + suffix + ")"
    } : void 0;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      style: style,
      children: svgDraw(this.getMoreProps())
    });
  };

  return GenericComponent;
}(_react["default"].Component);

exports.GenericComponent = GenericComponent;
GenericComponent.defaultProps = {
  svgDraw: (0, _utils.functor)(null),
  draw: [],
  canvasToDraw: function canvasToDraw(contexts) {
    return contexts.mouseCoord;
  },
  clip: true,
  edgeClip: false,
  selected: false,
  disablePan: false,
  enableDragOnHover: false,
  preCanvasDraw: FN_NOOP,
  postCanvasDraw: FN_NOOP,
  updateMoreProps: FN_NOOP,
  preEvaluate: FN_NOOP
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
//# sourceMappingURL=GenericComponent.js.map