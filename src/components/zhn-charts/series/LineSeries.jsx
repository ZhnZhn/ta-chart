//import PropTypes from "prop-types";
import { d3Line } from '../d3Shape';

import GenericChartComponent from '../core/GenericChartComponent';
import {
  getAxisCanvas,
  getMouseCanvas
} from '../core/contextFn';

import {
	isDefined,
	getClosestItemIndexes,
	getStrokeDasharray
} from '../core/utils';

import {
  hexToRGBA,
} from '../utils';

import {
  CL_LINE,
  CL_LINE_STROKE
} from '../CL';

const FN_NOOP = () => {}
, mathRound = Math.round
, mathPow = Math.pow;

const LineSeries = (props) => {
  const {
    yAccessor,
    hoverTolerance,
    highlightOnHover,

    stroke,
    strokeOpacity,
    strokeWidth,
    strokeDasharray,
    hoverStrokeWidth,
    defined,
    connectNulls,
    interpolation,
    style,
    fill,
    className,

    canvasClip,

    onClick,
    onDoubleClick,
    onContextMenu,
    onHover,
    onUnHover
  } = props
  , _isHover = (moreProps) => {
		if (!highlightOnHover) {
      return false;
    }

		const {
      mouseXY,
      currentItem,
      xScale,
      xAccessor,
      plotData,
      chartConfig: { yScale, origin }
    } = moreProps
		, [x, y] = mouseXY
		, radius = hoverTolerance
		, {
      left,
      right
    } = getClosestItemIndexes(
      plotData,
      xScale.invert(x),
      xAccessor
    );

		if (left === right) {
			const cy = yScale(yAccessor(currentItem)) + origin[1]
			, cx = xScale(xAccessor(currentItem)) + origin[0]

			return mathPow(x - cx, 2) + mathPow(y - cy, 2) < mathPow(radius, 2);
		} else {
			const l = plotData[left]
			, r = plotData[right]
			, x1 = xScale(xAccessor(l)) + origin[0]
			, y1 = yScale(yAccessor(l)) + origin[1]
			, x2 = xScale(xAccessor(r)) + origin[0]
			, y2 = yScale(yAccessor(r)) + origin[1]
			// y = m * x + b
			, m = (y2 - y1) / (x2 - x1)
			, b = -1 * m * x1 + y1
			, desiredY = mathRound(m * x + b);

			return y >= desiredY - radius && y <= desiredY + radius;
		}
	}
  , _renderSVG = (moreProps) => {
		const {
      xAccessor,
      xScale,
      plotData,
      hovering,
      chartConfig
    } = moreProps
		, { yScale } = chartConfig
		, dataSeries = d3Line()
			.x(d => mathRound(xScale(xAccessor(d))))
			.y(d => mathRound(yScale(yAccessor(d))));

		if (isDefined(interpolation)) {
			dataSeries.curve(interpolation);
		}
		if (!connectNulls) {
			dataSeries.defined(d => defined(yAccessor(d)));
		}

		return (
			<path
				style={style}
				className={`${className} ${stroke ? '' : CL_LINE_STROKE}`}
				d={dataSeries(plotData)}
				stroke={stroke}
				strokeOpacity={strokeOpacity}
				strokeWidth={hovering ? hoverStrokeWidth : strokeWidth}
				strokeDasharray={getStrokeDasharray(strokeDasharray)}
				fill={fill}
			/>
		);
	}
  , _drawOnCanvas = (ctx, moreProps) => {
		const {
      hovering,
      xScale,
      xAccessor,
      plotData,
      chartConfig: { yScale }
    } = moreProps;

		if (canvasClip) {
			ctx.save();
			canvasClip(ctx, moreProps);
		}

		ctx.lineWidth = hovering
      ? hoverStrokeWidth
      : strokeWidth;
		ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);
		ctx.setLineDash(getStrokeDasharray(strokeDasharray).split(","));

		const dataSeries = d3Line()
			.x(d => mathRound(xScale(xAccessor(d))))
			.y(d => mathRound(yScale(yAccessor(d))));

		if (isDefined(interpolation)) {
			dataSeries.curve(interpolation);
		}
		if (!connectNulls) {
			dataSeries.defined(d => defined(yAccessor(d)));
		}

		ctx.beginPath();
		dataSeries.context(ctx)(plotData);
		ctx.stroke();

		if (canvasClip) {
			ctx.restore();
		}
	}
  , _hoverProps = highlightOnHover || onHover || onUnHover
    ? {
      isHover: _isHover,
      drawOn: ['mousemove', 'pan'],
      canvasToDraw: getMouseCanvas
    }
    : {
      drawOn: ['pan'],
      canvasToDraw: getAxisCanvas
    };

  return (
    <GenericChartComponent
      svgDraw={_renderSVG}
      canvasDraw={_drawOnCanvas}
      onClickWhenHover={onClick}
      onDoubleClickWhenHover={onDoubleClick}
      onContextMenuWhenHover={onContextMenu}
      onHover={onHover}
      onUnHover={onUnHover}
      {..._hoverProps}
    />
  );
};

const DF_DEFINED = d => !isNaN(d);
LineSeries.defaultProps = {
	className: CL_LINE,
	strokeWidth: 1,
	strokeOpacity: 1,
	hoverStrokeWidth: 4,
	fill: 'none',
	stroke: '#4682b4',
	strokeDasharray: 'Solid',
	defined: DF_DEFINED,
	hoverTolerance: 6,
	highlightOnHover: false,
	connectNulls: false,
	onClick: FN_NOOP,
	onDoubleClick: FN_NOOP,
	onContextMenu: FN_NOOP
};

export default LineSeries
