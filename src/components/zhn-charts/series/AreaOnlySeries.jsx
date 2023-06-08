//import PropTypes from "prop-types";
import { d3Area } from '../d3Shape';

import GenericChartComponent from '../core/GenericChartComponent';
import { getAxisCanvas } from '../core/contextFn';

import {
  hexToRGBA,
  first,
  functor
} from '../utils';

import {
  CL_LINE,
  CL_LINE_STROKE
} from '../CL';

const mathRound = Math.round;

const _crAreaSeries = (
  base,
  defined,
  xAccessor,
  yAccessor,
  xScale,
  yScale,
  moreProps
) => d3Area()
  .defined(d => defined(yAccessor(d)))
  .x(d => mathRound(xScale(xAccessor(d))))
  .y0(d => functor(base)(yScale, d, moreProps))
  .y1(d => mathRound(yScale(yAccessor(d))));

const DRAW_ON = ['pan'];

const AreaOnlySeries = (props) => {
  const {
    yAccessor,
    defined,
    base,
    style,

    className,
    stroke,
    fill,
    opacity,
    interpolation,

    canvasGradient,
    canvasClip
  } = props
  , _renderSVG = (moreProps) => {
		const {
      plotData,
      xScale,
      xAccessor,
      chartConfig: { yScale }
    } = moreProps
    , areaSeries = _crAreaSeries(
      base,
      defined,
      xAccessor,
      yAccessor,
      xScale,
      yScale,
      moreProps
    );

		if (interpolation != null) {
			areaSeries.curve(interpolation);
		}

		const d = areaSeries(plotData)
		, newClassName = className
       .concat(stroke != null ? '' : ` ${CL_LINE_STROKE}`);

		return (
			<path
        className={newClassName}
				style={style}
				stroke={stroke}
				fill={hexToRGBA(fill, opacity)}
        d={d}
			/>
		);
	}
  , _drawOnCanvas = (ctx, moreProps) => {
		const {
      xScale,
      plotData,
      xAccessor,
      chartConfig: { yScale }
    } = moreProps;

		if (canvasClip) {
			ctx.save();
			canvasClip(ctx, moreProps);
		}

    ctx.fillStyle = canvasGradient != null
      ? canvasGradient(moreProps, ctx)
      : hexToRGBA(fill, opacity);
		ctx.strokeStyle = stroke;

		ctx.beginPath();
    const areaSeries = _crAreaSeries(
      base,
      defined,
      xAccessor,
      yAccessor,
      xScale,
      yScale,
      moreProps
    ).context(ctx);

		if (interpolation != null) {
			areaSeries.curve(interpolation);
		}
		areaSeries(plotData);
		ctx.fill();

		if (canvasClip) {
			ctx.restore();
		}
	};
  return (
    <GenericChartComponent
      svgDraw={_renderSVG}
      canvasDraw={_drawOnCanvas}
      canvasToDraw={getAxisCanvas}
      drawOn={DRAW_ON}
    />
  );
};

/*
AreaOnlySeries.propTypes = {
	className: PropTypes.string,
	yAccessor: PropTypes.func.isRequired,
	stroke: PropTypes.string,
	fill: PropTypes.string,
	opacity: PropTypes.number,
	defined: PropTypes.func,
	base: PropTypes.oneOfType([
		PropTypes.func, PropTypes.number
	]),
	interpolation: PropTypes.func,
	canvasClip: PropTypes.func,
	style: PropTypes.object,
	canvasGradient: PropTypes.func
};
*/

const DF_DEFINED = d => !isNaN(d)
, DF_BASE = (yScale) => first(yScale.range());

AreaOnlySeries.defaultProps = {
	className: CL_LINE,
	fill: 'none',
	opacity: 1,
	defined: DF_DEFINED,
	base: DF_BASE
};

export default AreaOnlySeries;
