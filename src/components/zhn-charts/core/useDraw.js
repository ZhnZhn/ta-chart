import { useCallback } from "react";

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


const DF_CANVAS_TO_DRAW = contexts => contexts.mouseCoord

const _getRefValue = ref => ref.current;

const useDraw = (
  _refProps,
  _refContext,
  _getMoreProps,
  setUpdateCount
) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _drawOnCanvas = useCallback(() => {
    const props = _getRefValue(_refProps)
    , context = _getRefValue(_refContext)

    const { canvasDraw, canvasToDraw=DF_CANVAS_TO_DRAW } = props;
    if (canvasDraw === undefined || canvasToDraw === undefined) {
        return;
    }

    const { getCanvasContexts } = context
    , contexts = getCanvasContexts()
    , moreProps = _getMoreProps()
    , ctx = canvasToDraw(contexts);
    if (ctx !== undefined) {
        //this.preCanvasDraw(ctx, moreProps);
        canvasDraw(ctx, moreProps);
        //this.postCanvasDraw(ctx, moreProps);
    }
  }, [])
  // _getMoreProps, _refContext, _refProps
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  const _draw = useCallback(({ trigger, force } = { force: false })=>{
    const props = _getRefValue(_refProps)

    const type = ALIASES[trigger] || trigger;
    const proceed = props.drawOn.indexOf(type) > -1;

    // this is to draw as soon as you select
    if (proceed || props.selected || force) {
        const { canvasDraw } = props;
        if (canvasDraw === undefined) {
            setUpdateCount(v => v + 1)
        } else {
           _drawOnCanvas();
        }
    }
  }, [])
  // _drawOnCanvas, _refProps, setUpdateCount
  /*eslint-enable react-hooks/exhaustive-deps */


  return [_draw, _drawOnCanvas];
};

export default useDraw
