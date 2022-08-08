//import PropTypes from "prop-types";
import { Component } from 'react';
import { area as d3Area } from 'd3-shape';

import {
  GenericChartComponent
} from '../core/GenericChartComponent';
import {
  getAxisCanvas
} from '../core/contextFn';

import {
  hexToRGBA,
  isDefined,
  first,
  functor
} from '../utils';

import {
  CL_LINE,
  CL_LINE_STROKE
} from '../CL';

const _crAreaSeries = (
  base,
  defined,
  xAccessor,
  yAccessor,
  xScale,
  yScale,
  moreProps
) => {
  const newBase = functor(base);
  return d3Area()
    .defined(d => defined(yAccessor(d)))
    .x((d) => Math.round(xScale(xAccessor(d))))
    .y0((d) => newBase(yScale, d, moreProps))
    .y1((d) => Math.round(yScale(yAccessor(d))));
};

class AreaOnlySeries extends Component {

	drawOnCanvas = (ctx, moreProps) => {
		const {
      yAccessor,
      defined,
      base,
      canvasGradient,

      fill,
      stroke,
      opacity,
      interpolation,
      canvasClip
    } = this.props
		, {
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

		if (isDefined(interpolation)) {
			areaSeries.curve(interpolation);
		}
		areaSeries(plotData);
		ctx.fill();

		if (canvasClip) {
			ctx.restore();
		}
	}

	renderSVG = (moreProps) => {
		const {
      yAccessor,
      defined,
      base,
      style,

      className,
      stroke,
      fill,
      opacity,
      interpolation
    } = this.props
		, {
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

		if (isDefined(interpolation)) {
			areaSeries.curve(interpolation);
		}

		const d = areaSeries(plotData)
		, newClassName = className
        .concat(isDefined(stroke)
           ? ''
           : ` ${CL_LINE_STROKE}`
         );

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

	render() {
		return (
			<GenericChartComponent
				svgDraw={this.renderSVG}
				canvasDraw={this.drawOnCanvas}
				canvasToDraw={getAxisCanvas}
				drawOn={['pan']}
			/>
		);
	}
}

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

AreaOnlySeries.defaultProps = {
	className: CL_LINE,
	fill: 'none',
	opacity: 1,
	defined: d => !isNaN(d),
	base: (yScale /* , d, moreProps */) => first(yScale.range()),
};

export default AreaOnlySeries;
