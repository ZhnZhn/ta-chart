"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = require("react");

var _utils = require("../utils");

var _this = void 0;

var ALIASES = {
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

var _getRefValue = function _getRefValue(ref) {
  return ref.current;
};

var _setRefValue = function _setRefValue(ref, value) {
  return ref.current = value;
};

var _shouldTypeProceed = function _shouldTypeProceed(type, moreProps) {
  return true;
};

var useEvaluateType = function useEvaluateType(_refProps, _refContext, _refMoreProps, _refSubsriberId, _refISetTheCursorClass) {
  var _refDragInProgress = (0, _react.useRef)(false);
  /*eslint-disable react-hooks/exhaustive-deps */


  var _getMoreProps = (0, _react.useCallback)(function () {
    var context = _getRefValue(_refContext);

    var xScale = context.xScale,
        plotData = context.plotData,
        chartConfig = context.chartConfig,
        morePropsDecorator = context.morePropsDecorator,
        xAccessor = context.xAccessor,
        displayXAccessor = context.displayXAccessor,
        width = context.width,
        height = context.height,
        chartId = context.chartId,
        fullData = context.fullData;
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
    }, _getRefValue(_refMoreProps));
    return (morePropsDecorator || _utils.identity)(moreProps);
  }, []) // _refContext, _refMoreProps

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  ,
      _evaluateType = (0, _react.useCallback)(function (type, e) {
    var props = _getRefValue(_refProps);

    var context = _getRefValue(_refContext);

    var newType = ALIASES[type] || type;
    var proceed = props.drawOn.indexOf(newType) > -1;

    if (!proceed) {
      return;
    } //this.preEvaluate(type, this.moreProps, e);


    if (!_shouldTypeProceed(type, _getRefValue(_refMoreProps))) {
      return;
    }

    var _moreProps = _getRefValue(_refMoreProps);

    switch (type) {
      case "zoom":
      case "mouseenter":
        // DO NOT DRAW FOR THESE EVENTS
        break;

      case "mouseleave":
        {
          _moreProps.hovering = false; //this.moreProps.hovering = false;

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

          if (_moreProps.hovering && props.onContextMenuWhenHover) {
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
              onClickWhenHover = props.onClickWhenHover,
              moreProps = _getMoreProps();

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
          var prevHover = _moreProps.hovering;
          _moreProps.hovering = props.isHover === undefined ? false : props.isHover(_getMoreProps(), e);
          var amIOnTop = context.amIOnTop,
              setCursorClass = context.setCursorClass;

          if (_moreProps.hovering && !props.selected && // && !prevHover
          amIOnTop(_getRefValue(_refSubsriberId)) && props.onHover !== undefined) {
            setCursorClass("react-financial-charts-pointer-cursor");

            _setRefValue(_refISetTheCursorClass, true);
          } else if (_moreProps.hovering && props.selected && amIOnTop(_getRefValue(_refSubsriberId))) {
            setCursorClass(props.interactiveCursorClass);

            _setRefValue(_refISetTheCursorClass, true);
          } else if (prevHover && !_moreProps.hovering && _getRefValue(_refISetTheCursorClass)) {
            _setRefValue(_refISetTheCursorClass, false);

            setCursorClass(null);
          }

          var _moreProps2 = _getMoreProps();

          if (_moreProps.hovering && !prevHover) {
            if (props.onHover) {
              props.onHover(e, _moreProps2);
            }
          }

          if (prevHover && !_moreProps.hovering) {
            if (props.onUnHover) {
              props.onUnHover(e, _moreProps2);
            }
          }

          if (props.onMouseMove) {
            props.onMouseMove(e, _moreProps2);
          }

          break;
        }

      case "dblclick":
        {
          var _moreProps3 = _getMoreProps();

          if (props.onDoubleClick) {
            props.onDoubleClick(e, _moreProps3);
          }

          if (_moreProps.hovering && props.onDoubleClickWhenHover) {
            props.onDoubleClickWhenHover(e, _moreProps3);
          }

          break;
        }

      case "pan":
        {
          _moreProps.hovering = false;

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
          if (_this.getPanConditions().draggable) {
            var _amIOnTop = context.amIOnTop;

            if (_amIOnTop(_getRefValue(_refSubsriberId))) {
              _setRefValue(_refDragInProgress, true);

              if (props.onDragStart !== undefined) {
                props.onDragStart(e, _getMoreProps());
              }
            }
          }

          break;
        }

      case "drag":
        {
          if (_getRefValue(_refDragInProgress) && props.onDrag) {
            _this.props.onDrag(e, _getMoreProps());
          }

          break;
        }

      case "dragend":
        {
          if (_getRefValue(_refDragInProgress) && props.onDragComplete) {
            props.onDragComplete(e, _getMoreProps());
          }

          _setRefValue(_refDragInProgress, false);

          break;
        }

      case "dragcancel":
        {
          if (_getRefValue(_refDragInProgress) || _getRefValue(_refISetTheCursorClass)) {
            var _setCursorClass = context.setCursorClass;

            _setCursorClass(null);
          }

          break;
        }

      default:
        break;
    }
  }, []); // _getMoreProps,
  // _refContext, _refISetTheCursorClass, _refMoreProps
  // _refProps, _refSubsriberId

  /*eslint-enable react-hooks/exhaustive-deps */


  return [_evaluateType, _getMoreProps];
};

var _default = useEvaluateType;
exports["default"] = _default;
//# sourceMappingURL=useEvaluateType.js.map