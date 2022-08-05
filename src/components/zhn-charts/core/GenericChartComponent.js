import PropTypes from 'prop-types';
import { GenericComponent } from './GenericComponent';
import { isDefined } from './utils';

const ALWAYS_TRUE_TYPES = ["drag", "dragend"];

export class GenericChartComponent extends GenericComponent {
    static defaultProps = GenericComponent.defaultProps

    static contextTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        margin: PropTypes.object.isRequired,
        chartId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        getCanvasContexts: PropTypes.func,
        xScale: PropTypes.func.isRequired,
        xAccessor: PropTypes.func.isRequired,
        displayXAccessor: PropTypes.func.isRequired,
        plotData: PropTypes.array.isRequired,
        fullData: PropTypes.array.isRequired,
        chartConfig: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
        morePropsDecorator: PropTypes.func,
        generateSubscriptionId: PropTypes.func,
        getMutableState: PropTypes.func.isRequired,
        amIOnTop: PropTypes.func.isRequired,
        subscribe: PropTypes.func.isRequired,
        unsubscribe: PropTypes.func.isRequired,
        setCursorClass: PropTypes.func.isRequired,
        canvasOriginX: PropTypes.number,
        canvasOriginY: PropTypes.number,
        ratio: PropTypes.number.isRequired,
    }        

    preCanvasDraw = (ctx, moreProps) => {
        super.preCanvasDraw(ctx, moreProps);
        ctx.save();

        const {
          margin,
          ratio
        } = this.context
        , {
          chartConfig: { width, height, origin }
        } = moreProps
        , canvasOriginX = 0.5 * ratio + origin[0] + margin.left
        , canvasOriginY = 0.5 * ratio + origin[1] + margin.top
        , {
          clip,
          edgeClip
        } = this.props;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);
        if (edgeClip) {
           ctx.beginPath();
           ctx.rect(-1, canvasOriginY - 10, width + margin.left + margin.right + 1, height + 20);
           ctx.clip();
        }
        ctx.translate(canvasOriginX, canvasOriginY);
        if (clip) {
           ctx.beginPath();
           ctx.rect(-1, -1, width + 1, height + 1);
           ctx.clip();
        }
    }

    postCanvasDraw = (ctx, moreProps) => {
        super.postCanvasDraw(ctx, moreProps);
        ctx.restore();
    }

    updateMoreProps = (moreProps) => {
      super.updateMoreProps(moreProps);
      const {
        chartConfig: chartConfigList
      } = moreProps;
      if (chartConfigList && Array.isArray(chartConfigList)) {
        const {
          chartId
        } = this.context
        , chartConfig = chartConfigList.find((each) => each.id === chartId);
        this.moreProps.chartConfig = chartConfig;
      }
      if (isDefined(this.moreProps.chartConfig)) {
        const { origin: [ox, oy], } = this.moreProps.chartConfig;
        if (isDefined(moreProps.mouseXY)) {
          const {
            mouseXY: [x, y]
          } = moreProps;
          this.moreProps.mouseXY = [x - ox, y - oy];
        }
        if (isDefined(moreProps.startPos)) {
          const {
            startPos: [x, y]
          } = moreProps;
          this.moreProps.startPos = [x - ox, y - oy];
        }
      }
    }
    preEvaluate = ( /* type, moreProps */) => {
        ///
    }

    shouldTypeProceed = (type, moreProps) => {
      if ((type === "mousemove" || type === "click") && this.props.disablePan) {
        return true;
      }
      if (ALWAYS_TRUE_TYPES.indexOf(type) === -1 && isDefined(moreProps) && isDefined(moreProps.currentCharts)) {
        return moreProps.currentCharts.indexOf(this.context.chartId) > -1;
      }
      return true;
    }
}
