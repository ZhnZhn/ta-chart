
export const crSubscribeId = id => `chart_${id}`;

export const findChartConfig = (
   chartConfig,
   chartId
) => (chartConfig || [])
  .find(({ id }) => id === chartId);
