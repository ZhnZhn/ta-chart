import { useContext } from '../../uiApi';

import useEventCallback from '../../hooks/useEventCallback';

import { ChartCanvasContext } from '../core/ChartCanvas'
import { GenericComponent } from '../core/GenericComponent';
import { getMouseCanvas } from '../core/contextFn';

import { CL_CHARTS_CROSSHAIR } from '../CL';

import {
  hexToRGBA,
  isDefined,
  isNotDefined,
  getStrokeDasharray
} from '../utils';

const _customX = (props, moreProps) => {
	const {
    xScale,
    xAccessor,
    currentItem,
    mouseXY
  } = moreProps
	, { snapX } = props;
	return snapX
		? Math.round(xScale(xAccessor(currentItem)))
		: mouseXY[0];
}

const _crLines = (props, moreProps) => {
	const {
		mouseXY,
    currentItem,
    show,
    height,
    width
	} = moreProps
	, {
    customX,
    stroke,
    opacity,
    strokeDasharray
  } = props;

	if (!show || isNotDefined(currentItem)) {
    return null;
  }

	const line1 = {
		x1: 0,
		x2: width,
		y1: mouseXY[1],
		y2: mouseXY[1],
		stroke,
    strokeDasharray,
    opacity
	}
	, x = customX(props, moreProps)
	, line2 = {
		x1: x,
		x2: x,
		y1: 0,
		y2: height,
		stroke,
    strokeDasharray,
    opacity
	};

	return [line1, line2];
}

const CrossHairCursor = (props) => {
  const context = useContext(ChartCanvasContext)
  , _drawOnCanvas = useEventCallback((ctx, moreProps) => {
		const lines = _crLines(props, moreProps);
		if (isDefined(lines)) {
			const {
        margin,
        ratio
      } = context
			, originX = 0.5 * ratio + margin.left
			, originY = 0.5 * ratio + margin.top;

			ctx.save();
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(ratio, ratio);
			ctx.translate(originX, originY);

			lines.forEach(line => {
				const dashArray = getStrokeDasharray(line.strokeDasharray).split(",").map(d => +d);

				ctx.strokeStyle = hexToRGBA(line.stroke, line.opacity);
				ctx.setLineDash(dashArray);
				ctx.beginPath();
				ctx.moveTo(line.x1, line.y1);
				ctx.lineTo(line.x2, line.y2);
				ctx.stroke();
			});

			ctx.restore();
		}
  })
  , _renderSvg = useEventCallback(moreProps => {
		const { className } = props
		, lines = _crLines(props, moreProps);
		return isNotDefined(lines) ? null : (
			<g className={`${CL_CHARTS_CROSSHAIR} ${className}`}>
				{lines.map(({ strokeDasharray, ...restProps }, index) =>
					(<line
						 key={index}
						 strokeDasharray={getStrokeDasharray(strokeDasharray)}
						 {...restProps} />
          ))}
			</g>
		);
	});

  return (
    <GenericComponent
      clip={false}
      canvasDraw={_drawOnCanvas}
      canvasToDraw={getMouseCanvas}
      drawOn={["mousemove", "pan", "drag"]}
      svgDraw={_renderSvg}
   />
  );
};

CrossHairCursor.defaultProps = {
  customX: _customX,
  opacity: 0.3,
  snapX: true,
	stroke: "#000000",
	strokeDasharray: "ShortDash"
};

export default CrossHairCursor;
