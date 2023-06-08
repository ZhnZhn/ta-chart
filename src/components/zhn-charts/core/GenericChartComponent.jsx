import {
  useContext,
  useCallback
} from '../../uiApi';

import { GenericComponent } from './GenericComponent';
import { ChartContext } from './Chart';
import { findChartConfig } from './ChartFn';

const _isArr = Array.isArray
, ALWAYS_TRUE_TYPES = ['drag', 'dragend'];

const _drawRectClip = (
  ctx,
  x1,
  y1,
  x2,
  y2
) => {
  ctx.beginPath();
  ctx.rect(x1, y1, x2, y2);
  ctx.clip();
};

const DF_DRAW_ON = [];

const GenericChartComponent = ({
  refComp,
  drawOn=DF_DRAW_ON,
  ...restProps
}) => {
   const chartContexValue = useContext(ChartContext)
   , {
     clip,
     edgeClip,
     disablePan
   } = restProps
   , {
     chartId,
     ratio,
     margin: { left, right, top }
   } = chartContexValue
   , _preCanvasDraw = useCallback((ctx, moreProps) => {
       const chartConfig = findChartConfig(
         moreProps.chartConfigs,
         chartId
       );
       if (!chartConfig) {
         return;
       }

       ctx.save();
       const {
         width,
         height,
         origin
       } = chartConfig
       , _ratio = 0.5 * ratio
       , canvasOriginX = _ratio + origin[0] + left
       , canvasOriginY = _ratio + origin[1] + top;

       ctx.setTransform(1, 0, 0, 1, 0, 0);
       ctx.scale(ratio, ratio);
       if (edgeClip) {
         _drawRectClip(ctx,
            -1, canvasOriginY - 10, width + left + right + 1, height + 20
         )
       }
       ctx.translate(canvasOriginX, canvasOriginY);
       if (clip) {
          _drawRectClip(ctx,
            -1, -1, width + 1, height + 1
          )
       }
   }, [left, right, top, ratio, clip, edgeClip, chartId])

   , _postCanvasDraw = useCallback((ctx, moreProps) => {
       ctx.restore();
   }, [])
   , _updateMoreProps = useCallback((fromMoreProps, toMoreProps) => {
       const {
         chartConfig
       } = fromMoreProps || toMoreProps;
       if (chartConfig && _isArr(chartConfig)) {
         toMoreProps.chartConfig = chartConfig
           .find(each => each.id === chartId);
       }
       if (toMoreProps.chartConfig) {
         const {
           origin: [ox, oy]
         } = toMoreProps.chartConfig
         , {
           mouseXY,
           startPos
         } = fromMoreProps;
         if (mouseXY) {
           const [x, y] = mouseXY;
           toMoreProps.mouseXY = [x - ox, y - oy];
         }
         if (startPos) {
           const [x, y] = startPos;
           toMoreProps.startPos = [x - ox, y - oy];
         }
     }
   }, [chartId])
   , _shouldTypeProceed = useCallback((type, moreProps) => {
     if (disablePan
        && (type === 'mousemove' || type === 'click')) {
       return true;
     }
     const { currentCharts } = moreProps || {};
     if (currentCharts
        && ALWAYS_TRUE_TYPES.indexOf(type) === -1) {
       return currentCharts.indexOf(chartId) > -1;
     }
     return true;
   }, [disablePan, chartId]);

   return (
     <GenericComponent
        {...restProps}
        ref={refComp}
        drawOn={drawOn}
        preCanvasDraw={_preCanvasDraw}
        postCanvasDraw={_postCanvasDraw}
        updateMoreProps={_updateMoreProps}
        shouldTypeProceed={_shouldTypeProceed}
     />
   );
};

export default GenericChartComponent
