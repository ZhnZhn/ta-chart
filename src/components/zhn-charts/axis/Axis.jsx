import {
  Component,
  createRef,
  getRefValue
} from '../../uiApi';

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

class Axis extends Component {

    chartRef = createRef();

    getAxisScale = () => {
      const allProps = getRefValue(this.chartRef)
         .getMoreProps();
      return this.props.getScale(allProps);
    }

    drawOnCanvas = (ctx, moreProps) => {
        const {
          showDomain,
          showGridLines,
          showTickLabel,
          showTicks,
          transform,
          range,
          getScale,
          tickLabelFill
        } = this.props;

        ctx.save();
        ctx.translate(transform[0], transform[1]);

        const scale = getScale(moreProps)
        , tickProps = tickHelper(this.props, scale);

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
           drawAxisLine(ctx, this.props, range);
        }
        ctx.restore();
    }

    render() {
        const {
          bg,
          className,
          zoomCursorClassName,
          zoomEnabled,
          inverted,
          edgeClip,
          transform,
          getMouseDelta,
          axisZoomCallback,
          onContextMenu,
          onDoubleClick
        } = this.props;

        return (
          <g transform={crCssTranslate(transform)}>
              {zoomEnabled ? (<AxisZoomCapture
                 className={className}
                 zoomCursorClassName={zoomCursorClassName}
                 inverted={inverted}
                 bg={bg}
                 getScale={this.getAxisScale}
                 getMouseDelta={getMouseDelta}
                 axisZoomCallback={axisZoomCallback}
                 onContextMenu={onContextMenu}
                 onDoubleClick={onDoubleClick}
               />) : null
              }
              <GenericChartComponent
                 refComp={this.chartRef}
                 clip={false}
                 edgeClip={edgeClip}
                 canvasToDraw={getAxisCanvas}
                 canvasDraw={this.drawOnCanvas}
                 drawOn={['pan']}
              />
          </g>
        );
    }
}

Axis.defaultProps = {
   edgeClip: false,
   zoomEnabled: false,
   zoomCursorClassName: ''
}

export default Axis
