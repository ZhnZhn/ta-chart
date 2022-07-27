"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

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

var DF_CANVAS_TO_DRAW = function DF_CANVAS_TO_DRAW(contexts) {
  return contexts.mouseCoord;
};

var _getRefValue = function _getRefValue(ref) {
  return ref.current;
};

var useDraw = function useDraw(_refProps, _refContext, _getMoreProps, setUpdateCount) {
  /*eslint-disable react-hooks/exhaustive-deps */
  var _drawOnCanvas = (0, _react.useCallback)(function () {
    var props = _getRefValue(_refProps),
        context = _getRefValue(_refContext);

    var canvasDraw = props.canvasDraw,
        _props$canvasToDraw = props.canvasToDraw,
        canvasToDraw = _props$canvasToDraw === void 0 ? DF_CANVAS_TO_DRAW : _props$canvasToDraw;

    if (canvasDraw === undefined || canvasToDraw === undefined) {
      return;
    }

    var getCanvasContexts = context.getCanvasContexts,
        contexts = getCanvasContexts(),
        moreProps = _getMoreProps(),
        ctx = canvasToDraw(contexts);

    if (ctx !== undefined) {
      //this.preCanvasDraw(ctx, moreProps);
      canvasDraw(ctx, moreProps); //this.postCanvasDraw(ctx, moreProps);
    }
  }, []); // _getMoreProps, _refContext, _refProps

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */


  var _draw = (0, _react.useCallback)(function (_temp) {
    var _ref = _temp === void 0 ? {
      force: false
    } : _temp,
        trigger = _ref.trigger,
        force = _ref.force;

    var props = _getRefValue(_refProps);

    var type = ALIASES[trigger] || trigger;
    var proceed = props.drawOn.indexOf(type) > -1; // this is to draw as soon as you select

    if (proceed || props.selected || force) {
      var canvasDraw = props.canvasDraw;

      if (canvasDraw === undefined) {
        setUpdateCount(function (v) {
          return v + 1;
        });
      } else {
        _drawOnCanvas();
      }
    }
  }, []); // _drawOnCanvas, _refProps, setUpdateCount

  /*eslint-enable react-hooks/exhaustive-deps */


  return [_draw, _drawOnCanvas];
};

var _default = useDraw;
exports["default"] = _default;
//# sourceMappingURL=useDraw.js.map