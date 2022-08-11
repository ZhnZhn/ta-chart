import PropTypes from 'prop-types';
import {
  useCallback
} from '../../uiApi';
import { GenericComponent } from './GenericComponent';
import { isDefined } from './utils';

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
}

const GenericChartComponent = (
  props,
  context
) => {
  const {
    refComp,
    ...restProps
  } = props
  , {
    clip,
    edgeClip,
    disablePan
  } = restProps
  , {
    chartId,
    ratio,
    margin: {left, right, top}
  } = context
  , _preCanvasDraw = useCallback((ctx, moreProps) => {
      ctx.save();

      const {
        chartConfig: {width, height, origin}
      } = moreProps
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
  }, [left, right, top, ratio, clip, edgeClip])
  , _postCanvasDraw = useCallback((ctx, moreProps) => {
      ctx.restore();
  }, [])
  , _updateMoreProps = useCallback((fromMoreProps, toMoreProps) => {
      const {
        chartConfig
      } = fromMoreProps;
      if (chartConfig && _isArr(chartConfig)) {
        toMoreProps.chartConfig = chartConfig
          .find(each => each.id === chartId);
      }
      if (isDefined(toMoreProps.chartConfig)) {
        const {
          origin: [ox, oy]
        } = toMoreProps.chartConfig
        , {
          mouseXY,
          startPos
        } = fromMoreProps;
        if (isDefined(mouseXY)) {
          const [x, y] = mouseXY;
          toMoreProps.mouseXY = [x - ox, y - oy];
        }
        if (isDefined(startPos)) {
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
    if (isDefined(currentCharts)
       && ALWAYS_TRUE_TYPES.indexOf(type) === -1) {
      return currentCharts.indexOf(chartId) > -1;
    }
    return true;
  }, [disablePan, chartId]);

  return (
    <GenericComponent
       {...restProps}
       ref={refComp}
       preCanvasDraw={_preCanvasDraw}
       postCanvasDraw={_postCanvasDraw}
       updateMoreProps={_updateMoreProps}
       shouldTypeProceed={_shouldTypeProceed}
    />
  );
}

const DF_DRAW_ON = [];

GenericChartComponent.defaultProps = {
  drawOn: DF_DRAW_ON
}

GenericChartComponent.contextTypes = {
  chartId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ratio: PropTypes.number.isRequired,
  margin: PropTypes.object.isRequired
}

export default GenericChartComponent
