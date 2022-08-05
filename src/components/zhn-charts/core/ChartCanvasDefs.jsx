import ClipPathRestStack from './ClipPathRestStack';

const CLIP_PATH_ID = 'chart-area-clip'

const ChartCanvasDefs = ({
  dimensions,
  chartConfig
}) => (
  <defs>
    <clipPath id={CLIP_PATH_ID}>
      <rect
        x="0" y="0"
        width={dimensions.width}
        height={dimensions.height}
      />
    </clipPath>
    <ClipPathRestStack configs={chartConfig} />
  </defs>
);

export default ChartCanvasDefs
