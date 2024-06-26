import {
  getProps,
  useContext
} from '../../uiApi';
import crCn from '../../zhn-utils/crCn';

import { ChartCanvasContext } from '../core/ChartCanvas'
import { GenericComponent } from '../core/GenericComponent';
import { getMouseCanvas } from '../core/contextFn';

import { CL_CHARTS_CROSSHAIR } from '../CL';

import {
  hexToRGBA,
  getStrokeDasharray
} from '../utils';

const _isArr = Array.isArray
, mathRound = Math.round;

const _customX = (
  props, {
    xScale,
    xAccessor,
    currentItem,
    mouseXY
}) => props.snapX
	? mathRound(xScale(xAccessor(currentItem)))
	: mouseXY[0];

const _crLines = (
  props,
  moreProps
) => {
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

	if (!show || currentItem == null) {
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

const DF_PROPS = {
  customX: _customX,
  opacity: 0.3,
  snapX: true,
	stroke: "#000000",
	strokeDasharray: "ShortDash"
}

export const CrossHairCursor = (props) => {
  const _props = getProps(props, DF_PROPS)
  , context = useContext(ChartCanvasContext)
  , _drawOnCanvas = (ctx, moreProps) => {
		const lines = _crLines(_props, moreProps);
		if (_isArr(lines)) {
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
				const dashArray = getStrokeDasharray(line.strokeDasharray)
          .split(",")
          .map(d => +d);

				ctx.strokeStyle = hexToRGBA(
          line.stroke,
          line.opacity
        );
				ctx.setLineDash(dashArray);
				ctx.beginPath();
				ctx.moveTo(line.x1, line.y1);
				ctx.lineTo(line.x2, line.y2);
				ctx.stroke();
			});

			ctx.restore();
		}
  }
  , _renderSvg = (moreProps) => {
		  const lines = _crLines(_props, moreProps);
		  return _isArr(lines) ? (
		    <g className={crCn(CL_CHARTS_CROSSHAIR, props.className)}>
		      {lines.map(({ strokeDasharray, ...restProps }, index) =>
		        (<line
		           key={index}
		           strokeDasharray={getStrokeDasharray(strokeDasharray)}
		           {...restProps}
            />))}
		    </g>
		  ) : null;
	};

  return (
    <GenericComponent
      clip={false}
      canvasDraw={_drawOnCanvas}
      canvasToDraw={getMouseCanvas}
      drawOn={["mousemove", "pan", "drag"]}
      svgDraw={_renderSvg}
   />
  );
}
