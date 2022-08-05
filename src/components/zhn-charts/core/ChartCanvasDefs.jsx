import ClipPathRestStack from './ClipPathRestStack';
import {
  CLIP_PATH_ID
} from './ID';

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
