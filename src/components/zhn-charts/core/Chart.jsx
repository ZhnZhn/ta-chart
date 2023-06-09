import {
  createContext,
  memo,
  useContext,
  useCallback,
  useMemo,
  useEffect
} from '../../uiApi'
import {
  scaleLinear
} from 'd3-scale';

import {
  crCssTranslate
} from '../utils';

import {
  ChartCanvasContext
} from './ChartCanvas';
import {
  crSubscribeId,
  findChartConfig
} from './ChartFn';
import {
  dfChartCanvasContextValue
} from './dfChartCanvasContextValue';

export const ChartContext = createContext({
  ...dfChartCanvasContextValue,
  chartConfig: {},
  chartId: 0
})

export const Chart = memo(({
   id=0,
   onContextMenu,
   onDoubleClick,
   children
}) => {
  const chartCanvasContextValue = useContext(ChartCanvasContext)
  , {
    subscribe,
    unsubscribe,
    chartConfigs
  } = chartCanvasContextValue
  , listener = useCallback((type, moreProps, _, e) => {
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
  }, [onContextMenu, onDoubleClick, id])
  , chartConfig = findChartConfig(chartConfigs, id)
  , chartContextValue = useMemo(() => ({
     ...chartCanvasContextValue,
     chartId: id,
     chartConfig
  }), [chartCanvasContextValue, id, chartConfig])
  , _transform = crCssTranslate(chartConfig.origin);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    subscribe(crSubscribeId(id), {
      listener
    })
    return () => {
      unsubscribe(crSubscribeId(id))
    }
  }, [])
  /*eslint-enable react-hooks/exhaustive-deps */

  return (
    <ChartContext.Provider value={chartContextValue}>
     <g transform={_transform}>
       {children}
     </g>
    </ChartContext.Provider>
  );

});

export const ChartDefaultConfig = {
  id: 0,
  flipYScale: false,
  origin: [0, 0],
  padding: 0,
  yPan: true,
  yPanEnabled: false,
  yScale: scaleLinear()
};
