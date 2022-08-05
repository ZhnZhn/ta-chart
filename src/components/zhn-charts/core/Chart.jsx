import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { PureComponent } from './utils';
import {
  crCssTranslate
} from '../utils';

const _crSubscribeId = id => `chart_${id}`
, _findChartConfig = (
   context,
   chartId
) => context.chartConfig
  .find(({ id }) => id === chartId);

class Chart extends PureComponent {
    static defaultProps = {
      flipYScale: false,
      id: 0,
      origin: [0, 0],
      padding: 0,
      yPan: true,
      yPanEnabled: false,
      yScale: scaleLinear(),
    }

    static contextTypes = {
      chartConfig: PropTypes.array,
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
    }

    static childContextTypes = {
      chartConfig: PropTypes.object.isRequired,
      chartId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }

    listener = (type, moreProps, _, e) => {
      const {
        id,
        onContextMenu,
        onDoubleClick
      } = this.props;
      switch (type) {
        case "contextmenu": {
          if (onContextMenu === undefined) {
            return;
          }
          const { currentCharts } = moreProps;
          if (currentCharts.indexOf(id) > -1) {
            onContextMenu(e, moreProps);
          }
          break;
        }
        case "dblclick": {
          if (onDoubleClick === undefined) {
            return;
          }
          const { currentCharts } = moreProps;
          if (currentCharts.indexOf(id) > -1) {
            onDoubleClick(e, moreProps);
          }
          break;
        }
        default: return;
      }
    }

    componentDidMount() {
      const { id } = this.props
      , { subscribe } = this.context;
      subscribe(_crSubscribeId(id), {
        listener: this.listener,
      });
    }

    componentWillUnmount() {
      const { id } = this.props
      , { unsubscribe } = this.context;
      unsubscribe(_crSubscribeId(id));
    }

    getChildContext() {
      const { id } = this.props;
      return {
        chartId: id,
        chartConfig: _findChartConfig(this.context, id)
      };
    }

    render() {
      const {
        id,
        children
      } = this.props
      , {
        origin
      } = _findChartConfig(this.context, id)
      , _transform = crCssTranslate(origin);

      return (
        <g transform={_transform}>
          {children}
        </g>
      );
    }
}

export default Chart
