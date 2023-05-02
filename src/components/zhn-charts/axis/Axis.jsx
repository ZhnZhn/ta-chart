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
  drawGridLine,
  drawEachTickLabel,
  drawAxisLine
} from './AxisFn';

const _crFont = ({
  fontWeight,
  fontSize,
  fontFamily
}) => `${fontWeight} ${fontSize}px ${fontFamily}`;

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
      const {
        showDomain,
        showGridLines,
        showTickLabel,
        showTicks,
        transform,
        range,
        tickLabelFill
      } = props;

      ctx.save();
      ctx.translate(transform[0], transform[1]);

      const scale = getScale(moreProps)
      , tickProps = tickHelper(props, scale);

      if (showTicks) {
        drawTicks(ctx, tickProps);
      }

      if (showGridLines) {
        tickProps.ticks.forEach((tick) => {
          drawGridLine(ctx, tick, tickProps, moreProps);
        });
      }

      if (showTickLabel) {
        const {
         textAnchor
        } = tickProps;

        ctx.font = _crFont(tickProps);
        if (tickLabelFill !== undefined) {
         ctx.fillStyle = tickLabelFill;
        }
        ctx.textAlign = textAnchor === 'middle'
         ? 'center'
         : textAnchor;

        tickProps.ticks.forEach(tick => {
         drawEachTickLabel(ctx, tick, tickProps);
        });
      }

      if (showDomain) {
        drawAxisLine(ctx, props, range);
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
