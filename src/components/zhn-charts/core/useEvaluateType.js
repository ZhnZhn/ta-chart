import { useRef, useCallback } from 'react';

import { identity } from "../utils";

const ALIASES = {
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

const _getRefValue = ref => ref.current
const _setRefValue = (ref, value) => ref.current = value

const _shouldTypeProceed = (type, moreProps) => true

const useEvaluateType = (
  _refProps,
  _refContext,
  _refMoreProps,
  _refSubsriberId,
  _refISetTheCursorClass
) => {
  const _refDragInProgress = useRef(false)

  /*eslint-disable react-hooks/exhaustive-deps */
  const _getMoreProps = useCallback(() => {
    const context = _getRefValue(_refContext)

    const {
      xScale,
      plotData,
      chartConfig,
      morePropsDecorator,
      xAccessor,
      displayXAccessor,
      width,
      height,

      chartId,
      fullData
    } = context;

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
        ..._getRefValue(_refMoreProps),
    };

    return (morePropsDecorator || identity)(moreProps);
  }, [])
  // _refContext, _refMoreProps
  /*eslint-enable react-hooks/exhaustive-deps */


  /*eslint-disable react-hooks/exhaustive-deps */
  , _evaluateType = useCallback((type, e) => {
      const props = _getRefValue(_refProps)
      const context = _getRefValue(_refContext)

      const newType = ALIASES[type] || type;
      const proceed = props.drawOn.indexOf(newType) > -1;
      if (!proceed) {
          return;
      }

      //this.preEvaluate(type, this.moreProps, e);

      if (!_shouldTypeProceed(type, _getRefValue(_refMoreProps))) {
        return;
      }

      const _moreProps = _getRefValue(_refMoreProps)
      switch (type) {
          case "zoom": case "mouseenter":
              // DO NOT DRAW FOR THESE EVENTS
              break;
          case "mouseleave": {
              _moreProps.hovering = false
              //this.moreProps.hovering = false;

              if (props.onUnHover) {
                props.onUnHover(e, _getMoreProps());
              }
              break;
          }
          case "contextmenu": {
              if (props.onContextMenu) {
                props.onContextMenu(e, _getMoreProps());
              }
              if (_moreProps.hovering && props.onContextMenuWhenHover) {
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
              const {
                onClick,
                onClickOutside,
                onClickWhenHover
              } = props
              , moreProps = _getMoreProps();
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
              const prevHover = _moreProps.hovering;
              _moreProps.hovering = props.isHover === undefined
                 ? false
                 : props.isHover(_getMoreProps(), e);

              const { amIOnTop, setCursorClass } = context;

              if (
                  _moreProps.hovering &&
                  !props.selected &&
                  // && !prevHover
                  amIOnTop(_getRefValue(_refSubsriberId)) &&
                  props.onHover !== undefined
              ) {
                  setCursorClass("react-financial-charts-pointer-cursor");
                  _setRefValue(_refISetTheCursorClass, true)
              } else if (_moreProps.hovering && props.selected && amIOnTop(_getRefValue(_refSubsriberId))) {
                  setCursorClass(props.interactiveCursorClass);
                  _setRefValue(_refISetTheCursorClass, true)
              } else if (prevHover && !_moreProps.hovering && _getRefValue(_refISetTheCursorClass)) {
                  _setRefValue(_refISetTheCursorClass, false)
                  setCursorClass(null);
              }
              const moreProps = _getMoreProps();

              if (_moreProps.hovering && !prevHover) {
                  if (props.onHover) {
                      props.onHover(e, moreProps);
                  }
              }
              if (prevHover && !_moreProps.hovering) {
                  if (props.onUnHover) {
                      props.onUnHover(e, moreProps);
                  }
              }

              if (props.onMouseMove) {
                  props.onMouseMove(e, moreProps);
              }
              break;
          }
          case "dblclick": {
              const moreProps = _getMoreProps();

              if (props.onDoubleClick) {
                  props.onDoubleClick(e, moreProps);
              }
              if (_moreProps.hovering && props.onDoubleClickWhenHover) {
                  props.onDoubleClickWhenHover(e, moreProps);
              }
              break;
          }
          case "pan": {
              _moreProps.hovering = false;
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
              if (this.getPanConditions().draggable) {
                  const { amIOnTop } = context;
                  if (amIOnTop(_getRefValue(_refSubsriberId))) {
                      _setRefValue(_refDragInProgress, true)
                      if (props.onDragStart !== undefined) {
                          props.onDragStart(e, _getMoreProps());
                      }
                  }
              }
              break;
          }
          case "drag": {
              if (_getRefValue(_refDragInProgress) && props.onDrag) {
                  this.props.onDrag(e, _getMoreProps());
              }
              break;
          }
          case "dragend": {
              if (_getRefValue(_refDragInProgress) && props.onDragComplete) {
                  props.onDragComplete(e, _getMoreProps());
              }
              _setRefValue(_refDragInProgress, false)
              break;
          }
          case "dragcancel": {
              if (_getRefValue(_refDragInProgress) || _getRefValue(_refISetTheCursorClass)) {
                  const { setCursorClass } = context;
                  setCursorClass(null);
              }
              break;
          }
          default: break;
      }}, [])
      // _getMoreProps,
      // _refContext, _refISetTheCursorClass, _refMoreProps
      // _refProps, _refSubsriberId
      /*eslint-enable react-hooks/exhaustive-deps */

      return [_evaluateType, _getMoreProps];
};

export default useEvaluateType
