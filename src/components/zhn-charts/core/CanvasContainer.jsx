import {
  memo,
  useRef,
  useImperativeHandle,
  getRefValue
} from '../../uiApi';

const _getCanvasContext = ref =>
  getRefValue(ref)?.getContext('2d') ?? void 0;

export const CanvasContainer = memo(({
  refEl,
  style,
  width,
  height,
  ratio
}) => {
  const _refBg = useRef()
  , _refAxes = useRef()
  , _refMouse = useRef();

  useImperativeHandle(refEl, () => ({
     getCanvasContexts: () => ({
       bg: _getCanvasContext(_refBg),
       axes: _getCanvasContext(_refAxes),
       mouseCoord: _getCanvasContext(_refMouse)
     })
  }))

  const _adjustedWidth = width * ratio
  , _adjustedHeight = height * ratio
  , _canvasStyle = { position: 'absolute', width, height };

  return (
    <div style={{...style, position: 'absolute'}}>
       <canvas
          ref={_refBg}
          width={_adjustedWidth}
          height={_adjustedHeight}
          style={_canvasStyle}
       />
       <canvas
          ref={_refAxes}
          width={_adjustedWidth}
          height={_adjustedHeight}
          style={_canvasStyle}
       />
       <canvas
          ref={_refMouse}
          width={_adjustedWidth}
          height={_adjustedHeight}
          style={_canvasStyle}
       />
    </div>
  );
})
