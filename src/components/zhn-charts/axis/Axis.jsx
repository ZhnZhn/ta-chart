import {
  useRef,
  useCallback,
  getRefValue
} from '../../uiApi';

import useEventCallback from '../../hooks/useEventCallback';

import GenericChartComponent from '../core/GenericChartComponent';
import AxisZoomCapture from './AxisZoomCapture';

import {
  getAxisCanvas
} from '../core/contextFn';
import {
  crCssTranslate
} from '../utils';

import {
  tickHelper,
  drawTicks,
  drawGridLines,
  drawTickLabels,
  drawAxisLine
} from './AxisFn';

const DRAW_ON = ['pan']

const Axis = (props) => {
  const {
    getScale,

    edgeClip,
    zoomEnabled,
    zoomCursorClassName,

    bg,
    className,
    inverted,
    transform,
    getMouseDelta,
    axisZoomCallback,
    onContextMenu,
    onDoubleClick
  } = props
  , _refChart = useRef()
  , _getAxisScale = useCallback(
      () => getScale(getRefValue(_refChart).getMoreProps())
  , [getScale])
  , _drawOnCanvas = useEventCallback((ctx, moreProps) => {
      const { transform } = props;

      ctx.save();
      ctx.translate(transform[0], transform[1]);

      const tickProps = tickHelper(
        props,
        getScale(moreProps)
      );

      if (props.showTicks) {
        drawTicks(ctx, tickProps);
      }
      if (props.showGridLines) {
        drawGridLines(ctx, tickProps, moreProps);
      }
      if (props.showTickLabel) {
        drawTickLabels(ctx, tickProps);
      }
      if (props.showDomain) {
        drawAxisLine(ctx, props);
      }

      ctx.restore();
  });

  return (
    <g transform={crCssTranslate(transform)}>
        {zoomEnabled ? (<AxisZoomCapture
           className={className}
           zoomCursorClassName={zoomCursorClassName}
           inverted={inverted}
           bg={bg}
           axisZoomCallback={axisZoomCallback}
           getScale={_getAxisScale}
           getMouseDelta={getMouseDelta}
           onContextMenu={onContextMenu}
           onDoubleClick={onDoubleClick}
         />) : null
        }
        <GenericChartComponent
           refComp={_refChart}
           clip={false}
           edgeClip={edgeClip}
           canvasToDraw={getAxisCanvas}
           canvasDraw={_drawOnCanvas}
           drawOn={DRAW_ON}
        />
    </g>
  );
};

export default Axis
